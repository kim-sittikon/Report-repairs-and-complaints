import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Calendar, Briefcase, PlayCircle, CheckCircle } from 'lucide-react';
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Link } from '@inertiajs/react';
import LayoutReport from '@/Layouts/LayoutReport';

const MyJobs = () => {
    // State for Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Expanded Mock Data
    const myJobs = [
        { 
            id: 'JOB-001', 
            name: 'เปลี่ยนและอัปเดตอุปกรณ์คอมพิวเตอร์', 
            date: '15 ม.ค. 2025 16.11',
            totalSteps: 2, 
            currentStep: 2, 
            currentStepName: 'ตรวจสอบอุปกรณ์',
            status: 'pending'
        },
         { 
            id: 'JOB-002', 
            name: 'ซ่อมเก้าอี้ห้องปฏิบัติการ', 
            date: '16 ม.ค. 2025 12.11',
            totalSteps: 3, 
            currentStep: 1, 
            currentStepName: 'รับเรื่อง',
            status: 'pending' 
        },
        { 
            id: 'JOB-003', 
            name: 'ตรวจสอบระบบเครือข่ายชั้น 4', 
            date: '17 ม.ค. 2025 09.30',
            totalSteps: 4, 
            currentStep: 3, 
            currentStepName: 'กำลังแก้ไข',
            status: 'in_progress' 
        },
        { 
            id: 'JOB-004', 
            name: 'ติดตั้งโปรแกรมห้องคอมฯ 1', 
            date: '18 ม.ค. 2025 10.00',
            totalSteps: 2, 
            currentStep: 1, 
            currentStepName: 'เตรียมไฟล์',
            status: 'pending' 
        },
        { 
            id: 'JOB-005', 
            name: 'ซ่อมโปรเจคเตอร์ห้องประชุม', 
            date: '19 ม.ค. 2025 13.45',
            totalSteps: 5, 
            currentStep: 4, 
            currentStepName: 'ทดสอบระบบ',
            status: 'in_progress' 
        },
        { 
            id: 'JOB-006', 
            name: 'เปลี่ยนหลอดไฟทางเดิน', 
            date: '20 ม.ค. 2025 11.20',
            totalSteps: 1, 
            currentStep: 1, 
            currentStepName: 'ดำเนินการ',
            status: 'pending' 
        },
    ];

    // Pagination Logic
    const totalPages = Math.ceil(myJobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentJobs = myJobs.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
             
             {/* Header Section */}
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                     {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <Link href="/report" className="hover:text-orange-600 transition-colors">รายการ</Link> 
                        <ChevronRight size={12} className="text-slate-300" />
                        <span className="text-gray-900 font-medium">รายการใบงานของฉัน</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        <Briefcase className="text-orange-500" />
                        รายการใบงานของฉัน
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">จัดการและติดตามสถานะงานที่คุณได้รับมอบหมาย</p>
                </div>

                {/* Search & Filter */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64 group">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                       <Input 
                            className="bg-white border-slate-200 rounded-xl pl-10 h-10 shadow-sm focus:border-orange-300 focus:ring-4 focus:ring-orange-500/10 transition-all" 
                            placeholder="ค้นหาใบงาน..." 
                        />
                    </div>
                     <button className="p-2.5 bg-white border border-slate-200 hover:border-orange-200 hover:text-orange-600 rounded-xl transition-all shadow-sm active:scale-95 text-slate-600">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-100/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50/80 text-slate-600 font-semibold border-b border-slate-200">
                             <tr>
                                <th className="px-6 py-4 whitespace-nowrap">เลขใบงาน</th>
                                <th className="px-6 py-4">ชื่อใบงาน</th>
                                <th className="px-6 py-4 whitespace-nowrap">วันที่มอบหมาย</th>
                                <th className="px-6 py-4 whitespace-nowrap">ความคืบหน้า</th>
                                <th className="px-6 py-4 whitespace-nowrap text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentJobs.map((job, index) => (
                                <tr key={index} className="hover:bg-orange-50/30 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-slate-500 font-medium">{job.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-800">{job.name}</div>
                                        <div className="text-xs text-slate-400 mt-0.5 md:hidden">{job.date}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap hidden md:table-cell">
                                        <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 w-fit">
                                            <Calendar size={14} className="text-slate-400" />
                                            {job.date.split(' ')[0] + ' ' + job.date.split(' ')[1] + ' ' + job.date.split(' ')[2]}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                                                <span>ขั้นตอนที่ {job.currentStep}/{job.totalSteps}</span>
                                                <span className="text-orange-600">{Math.round((job.currentStep / job.totalSteps) * 100)}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-orange-500 rounded-full transition-all duration-500" 
                                                    style={{ width: `${(job.currentStep / job.totalSteps) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Link href={`/report/manage-job?jobId=${job.id}`}>
                                            <Button variant="outline" className="h-9 px-4 text-slate-600 hover:text-orange-600 border-slate-200 hover:border-orange-200 hover:bg-orange-50 rounded-xl font-medium transition-all shadow-sm">
                                                จัดการ
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Empty State */}
                {currentJobs.length === 0 && (
                    <div className="p-12 text-center text-slate-400">
                        <Briefcase className="mx-auto w-12 h-12 opacity-20 mb-3" />
                        <p>ไม่มีรายการใบงาน</p>
                    </div>
                )}
            </div>

             {/* Functional Pagination */}
             {totalPages > 0 && (
                <div className="flex justify-end mt-6">
                    <div className="flex items-center bg-white rounded-xl p-1 shadow-sm border border-slate-200 gap-1">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        
                        {[...Array(totalPages)].map((_, i) => (
                            <button 
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                                    currentPage === i + 1 
                                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' 
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
             )}

        </div>
    );
};

MyJobs.layout = page => <LayoutReport children={page} />

export default MyJobs;
