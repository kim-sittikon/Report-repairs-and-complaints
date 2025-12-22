import React, { useState } from 'react';
import { Search, ChevronDown, Calendar, User, Bell, ChevronLeft, ChevronRight, Filter, CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

import { Link, router } from '@inertiajs/react';
import LayoutReport from '@/Layouts/LayoutReport';

import { mockReports } from '@/data/mockReports';

const ListReport = () => {
  // State for Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedReports, setSelectedReports] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock Data
  const reports = mockReports;

  const toggleSelection = (id) => {
    setSelectedReports(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };



  const handleCreateJob = () => {
    router.get('/report/create-job', { selectedReports });
  };

  const handleChangeStatus = () => {
    router.get('/report/change-status', { selectedReports });
  };

  // Helper for Status Style
  const getStatusBadge = (status) => {
    switch(status) {
      case 'receive': 
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> รับเรื่อง
            </span>
        );
      case 'completed': 
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                <CheckCircle2 size={12} className="text-green-600"/> ดำเนินการเสร็จสิ้น
            </span>
        );
      case 'refused': 
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                <XCircle size={12} className="text-red-600"/> ปฏิเสธ
            </span>
        );
      default:
        return <span className="text-gray-500 text-xs">● {status}</span>;
    }
  };

  // Helper for Priority Style
  const getPriorityBadge = (priority) => {
     if (priority === 'เร่งด่วน') {
         return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-200 shadow-sm">
                <AlertCircle size={12} className="fill-red-100" /> เร่งด่วน
            </span>
         )
     }
     return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            ปกติ
        </span>
     )
  };

        // Helper: Parse Thai Date String to Date Object
  const parseThaiDate = (dateString) => {
      // Format: "15 ม.ค. 2025 16.11"
      const thaiMonths = {
          'ม.ค.': 0, 'ก.พ.': 1, 'มี.ค.': 2, 'เม.ย.': 3, 'พ.ค.': 4, 'มิ.ย.': 5,
          'ก.ค.': 6, 'ส.ค.': 7, 'ก.ย.': 8, 'ต.ค.': 9, 'พ.ย.': 10, 'ธ.ค.': 11
      };
      
      try {
        const parts = dateString.split(' ');
        if (parts.length < 3) return null;

        const day = parseInt(parts[0]);
        const month = thaiMonths[parts[1]];
        let year = parseInt(parts[2]);
        
        // Handle Buddhist Era (BE) vs Christian Era (AD)
        if (year > 2400) {
            year -= 543;
        }

        if (month === undefined) return null;
        
        // Return Date at midnight for comparison
        return new Date(year, month, day);
      } catch (e) {
          return null;
      }
  };

  // Filter Logic
  const filteredReports = reports.filter(item => {
      // 1. Search Query
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        item.id.toLowerCase().includes(query) || 
        item.problem.toLowerCase().includes(query) || 
        item.reporter.toLowerCase().includes(query);

      // 2. Status Filter
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      // 3. Priority Filter
      const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;

      // 4. Date Range
      let matchesDate = true;
      if (startDate || endDate) {
          const itemDate = parseThaiDate(item.date);
          if (itemDate) {
              if (startDate) {
                  const start = new Date(startDate);
                  start.setHours(0,0,0,0);
                  if (itemDate < start) matchesDate = false;
              }
              if (endDate) {
                  const end = new Date(endDate);
                  end.setHours(23,59,59,999);
                  if (itemDate > end) matchesDate = false;
              }
          }
      }

      return matchesSearch && matchesStatus && matchesPriority && matchesDate;
  });



  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ... (previous filter logic) ...

  const activeFiltersCount = [
    statusFilter !== 'all',
    priorityFilter !== 'all',
    startDate,
    endDate
  ].filter(Boolean).length;

  // Pagination Logic
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
        if (e.target.checked) {
            const currentPageIds = currentReports.map(item => item.id);
            setSelectedReports(prev => {
                const newSelection = new Set([...prev, ...currentPageIds]);
                return Array.from(newSelection);
            });
        } else {
            const currentPageIds = currentReports.map(item => item.id);
            setSelectedReports(prev => prev.filter(id => !currentPageIds.includes(id)));
        }
    };

    const isAllSelected = currentReports.length > 0 && currentReports.every(item => selectedReports.includes(item.id));
    const isIndeterminate = currentReports.some(item => selectedReports.includes(item.id)) && !isAllSelected;

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, priorityFilter, startDate, endDate]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 py-6">
      
      {/* Header & Breadcrumb */}
      <div className="mb-6">
         <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
            <Link href="/report" className="hover:text-orange-500 hover:underline transition-colors">รายการ</Link> 
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">รายการแจ้งซ่อมทั้งหมด</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
             <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">รายการแจ้งซ่อม</h1>
                <p className="text-gray-500 mt-1">จัดการและติดตามสถานะการแจ้งซ่อมทั้งหมด</p>
             </div>
        </div>
      </div>

      {/* Modern Toolbar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
        <div className="p-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            
            {/* Actions */}
            <div className="flex gap-3 w-full lg:w-auto">
                <Button 
                    onClick={handleCreateJob}
                    disabled={selectedReports.length === 0}
                    className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
                >
                    <span className="mr-2 text-lg">+</span> สร้างใบงาน {selectedReports.length > 0 && `(${selectedReports.length})`}
                </Button>
                <Button 
                    variant="outline" 
                    onClick={handleChangeStatus}
                    disabled={selectedReports.length === 0}
                    className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                     เปลี่ยนสถานะ
                </Button>
            </div>

            {/* Search & Filter Toggle */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 sm:w-[320px] group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-orange-500 transition-colors" />
                    <Input 
                        className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-orange-200 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-xl" 
                        placeholder="ค้นหา..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button 
                    variant={showFilters ? "secondary" : "outline"}
                    onClick={() => setShowFilters(!showFilters)}
                    className={`border-gray-200 ${showFilters ? 'bg-orange-50 text-orange-600 border-orange-200' : 'text-gray-600'}`}
                >
                    <Filter size={16} className="mr-2" />
                    ตัวกรอง
                    {activeFiltersCount > 0 && (
                        <span className="ml-2 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                            {activeFiltersCount}
                        </span>
                    )}
                </Button>
            </div>
        </div>

        {/* Collapsible Filter Panel */}
        {showFilters && (
            <div className="bg-gray-50/50 border-t border-gray-100 p-4 animate-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Date Range */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 ml-1">ช่วงวันที่</label>
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200 focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
                            <Calendar size={14} className="text-gray-400 shrink-0" />
                            <input 
                                type="date" 
                                className="bg-transparent border-none p-0 text-sm focus:ring-0 text-gray-700 w-full min-w-0"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <span className="text-gray-300">-</span>
                            <input 
                                type="date" 
                                className="bg-transparent border-none p-0 text-sm focus:ring-0 text-gray-700 w-full min-w-0"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 ml-1">สถานะการดำเนินการ</label>
                        <div className="relative">
                            <select 
                                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-2.5 pr-10 cursor-pointer"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">ทั้งหมด</option>
                                <option value="receive">รับเรื่อง</option>
                                <option value="completed">ดำเนินการเสร็จสิ้น</option>
                                <option value="refused">ปฏิเสธ</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Priority Filter */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 ml-1">ความเร่งด่วน</label>
                         <div className="relative">
                            <select 
                                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-2.5 pr-10 cursor-pointer"
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                            >
                                <option value="all">ทั้งหมด</option>
                                <option value="เร่งด่วน">เร่งด่วน</option>
                                <option value="ปกติ">ปกติ</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Reset Button */}
                    <div className="flex items-end">
                        <Button 
                            variant="outline" 
                            onClick={() => {
                                setStartDate('');
                                setEndDate('');
                                setStatusFilter('all');
                                setPriorityFilter('all');
                                setSearchQuery('');
                            }}
                            className="w-full border-dashed border-gray-300 text-gray-500 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-50 transition-all"
                            disabled={activeFiltersCount === 0 && !searchQuery}
                        >
                            <RotateCcw size={16} className="mr-2" />
                            ล้างตัวกรอง
                        </Button>
                    </div>
                </div>
                
                 <div className="mt-3 text-right text-xs text-gray-400">
                    พบข้อมูล {filteredReports.length} รายการ
                </div>
            </div>
        )}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/40 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold whitespace-nowrap">
                        <th className="px-4 py-3 w-[50px] text-center">
                            <div className="flex items-center justify-center">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 w-4 h-4 cursor-pointer text-orange-500 focus:ring-orange-500"
                                    checked={isAllSelected}
                                    ref={input => {
                                        if (input) input.indeterminate = isIndeterminate;
                                    }}
                                    onChange={handleSelectAll}
                                />
                            </div>
                        </th>
                        <th className="px-4 py-3">เลขที่แจ้ง</th>
                        <th className="px-4 py-3 w-1/3">ปัญหาที่แจ้ง</th>
                        <th className="px-4 py-3">ผู้แจ้ง</th>
                        <th className="px-4 py-3">ความเร่งด่วน</th>
                        <th className="px-4 py-3">สถานะ</th>
                        <th className="px-4 py-3">วัน-เวลา</th>
                        <th className="px-4 py-3 text-center">เครดิต</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {currentReports.map((item, index) => (
                        <tr 
                            key={index} 
                            className={`group transition-all duration-200 cursor-pointer whitespace-nowrap ${
                                selectedReports.includes(item.id) ? 'bg-orange-50/60' : 'hover:bg-gray-50/80'
                            }`}
                            onClick={() => toggleSelection(item.id)}
                        >

                            <td className="px-4 py-3 text-center relative">
                                {selectedReports.includes(item.id) && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r-full"></div>
                                )}
                                <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 w-4 h-4 cursor-pointer text-orange-500 focus:ring-orange-500"
                                    checked={selectedReports.includes(item.id)}
                                    onChange={() => toggleSelection(item.id)}
                                    onClick={(e) => e.stopPropagation()} 
                                />
                            </td>
                            <td className="px-4 py-3">
                                <span className="font-mono font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-md text-sm">
                                    {item.id}
                                </span>
                            </td>
                            <td className="px-4 py-3 max-w-[300px]">
                                <span className="text-gray-800 font-medium group-hover:text-orange-600 transition-colors truncate block">
                                    {item.problem}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                        {item.reporter.charAt(0)}
                                    </div>
                                    {item.reporter}
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                {getPriorityBadge(item.priority)}
                            </td>
                            <td className="px-4 py-3">
                                {getStatusBadge(item.status)}
                            </td>
                            <td className="px-4 py-3">
                                <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                                    {item.date}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                                <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                    {item.credit}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Empty State */}
            {filteredReports.length === 0 && (
                <div className="p-12 text-center text-gray-400">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Filter className="w-8 h-8 opacity-20" />
                    </div>
                    <p>ไม่มีรายการแจ้งซ่อมที่ตรงกับเงื่อนไข</p>
                </div>
            )}
        </div>

        {/* Footer Pagination */}
        <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
                แสดง {startIndex + 1} ถึง {Math.min(startIndex + itemsPerPage, filteredReports.length)} จาก {filteredReports.length} รายการ
            </span>
            <div className="flex items-center gap-2">
               <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                  <ChevronLeft size={16} />
               </button>
               
               <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button 
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors font-medium ${
                            currentPage === page 
                            ? 'bg-orange-500 text-white shadow-sm shadow-orange-200' 
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                    >
                        {page}
                    </button>
                  ))}
               </div>

               <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                  <ChevronRight size={16} />
               </button>
            </div>
        </div>
      </div>
    </div>
  );
};

ListReport.layout = page => <LayoutReport children={page} />

export default ListReport;
