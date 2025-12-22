import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Clock, Frown, Power, MoreHorizontal, Calendar, AlertCircle, Zap, TrendingUp, CheckCircle, ClipboardList, ChevronRight, Filter, Search, ChevronDown, RotateCcw } from 'lucide-react';
import { Link } from '@inertiajs/react';
import LayoutReport from '@/Layouts/LayoutReport';
import { mockReports } from '@/data/mockReports';
import Dropdown from '@/Components/UI/Dropdown';

const ReportDashboard = () => {
    // State for Date Filter
    const [dateFilter, setDateFilter] = useState('month'); // 'week', 'month', 'year', 'custom', 'all'
    const [customStart, setCustomStart] = useState('');
    const [customEnd, setCustomEnd] = useState('');

  // Mock Data for Chart
  const chartData = [
    { name: 'ม.ค.', current: 65, previous: 20 },
    { name: 'ก.พ.', current: 40, previous: 65 },
    { name: 'มี.ค.', current: 70, previous: 100 },
    { name: 'เม.ย.', current: 120, previous: 30 },
    { name: 'พ.ค.', current: 140, previous: 70 },
    { name: 'มิ.ย.', current: 105, previous: 65 },
    { name: 'ก.ค.', current: 120, previous: 150 },
  ];

  // Helper: Parse Thai Date
  const parseThaiDate = (dateString) => {
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
        if (year > 2400) year -= 543;
        if (month === undefined) return null;
        return new Date(year, month, day);
      } catch (e) { return null; }
  };

  // Helper: Get Date Filter Label
  const getFilterLabel = () => {
      switch(dateFilter) {
          case 'week': return 'สัปดาห์นี้';
          case 'month': return 'เดือนนี้';
          case 'year': return 'ปีนี้';
          case 'custom': return 'กำหนดเอง';
          default: return 'ทั้งหมด';
      }
  };

  // Filter Logic
  const urgentTasks = mockReports
    .filter(report => report.priority === 'เร่งด่วน' || report.priority === 'High')
    .filter(task => {
        if (dateFilter === 'all') return true;

        const taskDate = parseThaiDate(task.date);
        if (!taskDate) return false;

        const now = new Date(); // In real app, this is "current time"
        // For testing with mock data (Jan 2025), let's assume "now" is around mid-Jan 2025
        // Or if using real date, previous mock data might be hidden. 
        // Let's use real date logic but keep in mind mock data is Jan 2025.
        // If current real date is Dec 2024, Jan 2025 is "future".
        
        // Use Mock "Now" as Jan 20, 2025 for consistent testing with mock data?
        // No, user wants real feature. But mock data is static.
        // Let's use real date. If user tests today (Dec 2024), Jan 2025 won't show in "This Month".
        // FIX: Mock "now" to match mock data context? 
        // Let's stick to standard logic. If mock data is Jan 2025, it will show if we filter for Jan 2025.

        if (dateFilter === 'custom') {
            if (customStart) {
                const start = new Date(customStart);
                start.setHours(0,0,0,0);
                if (taskDate < start) return false;
            }
            if (customEnd) {
                const end = new Date(customEnd);
                end.setHours(23,59,59,999);
                if (taskDate > end) return false;
            }
            return true;
        }

        // Logic for Week, Month, Year uses current real system date
        // If testing now (Dec 2024) and data is Jan 2025, "This Month" will hide everything.
        // IMPORTANT: For Demo purposes, if data is filtered out, I'll show a fallback message.
        
        if (dateFilter === 'month') {
             return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear();
        }
        if (dateFilter === 'year') {
             return taskDate.getFullYear() === now.getFullYear();
        }
        if (dateFilter === 'week') {
            const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
            const lastDay = new Date(now.setDate(now.getDate() - now.getDay() + 6));
            return taskDate >= firstDay && taskDate <= lastDay;
        }
        return true;
    });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-2 px-1 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard ภาพรวม</h1>
           <p className="text-gray-500 text-sm mt-1">สรุปข้อมูลการแจ้งซ่อมและสถานะงานทั้งหมด</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
            
            {/* Custom Date Inputs */}
            {dateFilter === 'custom' && (
                <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-lg border border-gray-200 shadow-sm animate-in fade-in slide-in-from-right-2">
                    <input 
                        type="date" 
                        value={customStart}
                        onChange={(e) => setCustomStart(e.target.value)}
                        className="text-xs border-none p-0 focus:ring-0 text-gray-600 bg-transparent"
                    />
                    <span className="text-gray-300">-</span>
                    <input 
                        type="date" 
                        value={customEnd}
                        onChange={(e) => setCustomEnd(e.target.value)}
                        className="text-xs border-none p-0 focus:ring-0 text-gray-600 bg-transparent"
                    />
                </div>
            )}

            <Dropdown>
                <Dropdown.Trigger>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm min-w-[140px] justify-between">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-orange-500"/>
                            <span>{getFilterLabel()}</span>
                        </div>
                        <ChevronDown size={14} className="text-gray-400"/>
                    </button>
                </Dropdown.Trigger>
                <Dropdown.Content width="48" contentClasses="py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <div className="px-1 py-1">
                        <button onClick={() => setDateFilter('week')} className={`block w-full text-left px-4 py-2 text-sm rounded-md ${dateFilter === 'week' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                            สัปดาห์นี้
                        </button>
                        <button onClick={() => setDateFilter('month')} className={`block w-full text-left px-4 py-2 text-sm rounded-md ${dateFilter === 'month' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                            เดือนนี้
                        </button>
                        <button onClick={() => setDateFilter('year')} className={`block w-full text-left px-4 py-2 text-sm rounded-md ${dateFilter === 'year' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                            ปีนี้
                        </button>
                        <div className="h-px bg-gray-100 my-1"></div>
                        <button onClick={() => setDateFilter('custom')} className={`block w-full text-left px-4 py-2 text-sm rounded-md ${dateFilter === 'custom' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                            กำหนดเอง
                        </button>
                         <button onClick={() => setDateFilter('all')} className={`block w-full text-left px-4 py-2 text-sm rounded-md ${dateFilter === 'all' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                            ทั้งหมด
                        </button>
                    </div>
                </Dropdown.Content>
            </Dropdown>
        </div>
      </div>
      
      {/* Stats Cards - Preserving Colors but Modernizing Shape/Shadow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="งานเร่งด่วน" 
          count={urgentTasks.length} 
          icon={<Zap size={28} className="text-white/80" />}
          bgClass="bg-[#FF5D73]" // Pink/Red
        />
        <StatCard 
          title="งานใหม่วันนี้" 
          count="16" 
          icon={<TrendingUp size={28} className="text-white/80" />}
          bgClass="bg-[#4DA1FF]" // Blue
        />
        <StatCard 
          title="ใบงานของฉัน" 
          count="156" 
          icon={<ClipboardList size={28} className="text-white/80" />}
          bgClass="bg-[#2ECC71]" // Green
        />
        <StatCard 
          title="งานทั้งหมด" 
          count="231" 
          icon={<CheckCircle size={28} className="text-white/80" />}
          bgClass="bg-[#8E99F3]" // Purple
        />
      </div>

      {/* Charts & Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart (Occupies 2/3) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <div>
                 <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <TrendingUp size={20} className="text-blue-500"/>
                    สถิติการแจ้งซ่อม
                 </h3>
                 <p className="text-xs text-gray-400 mt-1">จำนวนคำร้องที่เข้ามาในระบบรายเดือน</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
                 <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-gray-600">ปีนี้</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-100"></span>
                    <span className="text-gray-400">ปีก่อน</span>
                 </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#F3F4F6" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                />
                <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#E5E7EB" 
                  strokeWidth={2} 
                  fill="transparent"
                  strokeDasharray="5 5" 
                />
                <Area 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#3B82F6" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorCurrent)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Side Panel (Occupies 1/3) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
          <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
            <Clock size={20} className="text-orange-500"/>
            สถานะงานปัจจุบัน
          </h3>
          
          <div className="space-y-6 flex-grow">
            <SummaryProgress 
              icon={<Clock size={18} className="text-blue-500" />} 
              label="กำลังดำเนินงาน" 
              count="4" 
              total="231"
              color="bg-blue-500"
            />
            <SummaryProgress 
              icon={<Frown size={18} className="text-red-500" />} 
              label="งานล่าช้า" 
              count="1" 
              total="231"
              color="bg-red-500"
            />
             <SummaryProgress 
              icon={<CheckCircle size={18} className="text-green-500" />} 
              label="ปิดงานสำเร็จ" 
              count="13" 
              total="30" // Mock base for week
              color="bg-green-500"
            />
          </div>

          {/* Efficiency Section Removed */}
        </div>
      </div>

      {/* Urgent Tasks Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                <AlertCircle size={20} />
             </div>
             <h3 className="font-bold text-lg text-gray-800">รายการคำร้องเร่งด่วน</h3>
          </div>
          <Link href="/report/list-report" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 hover:underline">
            ดูทั้งหมด <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4 rounded-tl-lg">เลขที่แจ้ง</th>
                <th className="px-6 py-4">ปัญหาที่แจ้ง</th>
                <th className="px-6 py-4">ผู้แจ้ง</th>
                <th className="px-6 py-4">วัน-เวลา</th>
                <th className="px-6 py-4">ความเร่งด่วน</th>
                <th className="px-6 py-4">สถานะ</th>
                <th className="px-6 py-4 text-right rounded-tr-lg">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {urgentTasks.map((task, index) => (
                <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                      <span className="font-mono text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                        {task.id}
                      </span>
                  </td>
                  <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{task.problem}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                              {task.reporter.charAt(0)}
                          </div>
                          {task.reporter}
                      </div>
                  </td>
                  <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                          {task.date}
                      </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                       <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                       {task.priority || 'เร่งด่วน'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
                      {task.status === 'receive' ? 'รอรับเรื่อง' : 'กำลังดำเนินการ'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <Link 
                        href={`/report/change-status?selectedReports[]=${task.id}`}
                        className="inline-block text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                     >
                        เปลี่ยนสถานะ
                     </Link>
                  </td>
                </tr>
              ))}
              {urgentTasks.length === 0 && (
                  <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                          ไม่มีรายการเร่งด่วนในขณะนี้
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};



ReportDashboard.layout = page => <LayoutReport children={page} />

// --- Sub-components ---

const StatCard = ({ title, count, icon, bgClass, trend }) => (
  <div className={`${bgClass} text-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group`}>
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110">
        {icon}
    </div>
    <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                {icon}
            </div>
            {/* <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">{trend}</span> */}
        </div>
        <h4 className="text-white/90 text-sm font-medium mb-1">{title}</h4>
        <p className="text-3xl font-bold tracking-tight">{count}</p>
        <p className="text-xs text-white/70 mt-2 font-light">{trend}</p>
    </div>
  </div>
);

const SummaryProgress = ({ icon, label, count, total, color }) => {
    const percentage = Math.min((parseInt(count) / parseInt(total)) * 100 * 5, 100); // Exaggerated for visual
    
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    {icon}
                    <span>{label}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{count}</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    )
};

export default ReportDashboard;
