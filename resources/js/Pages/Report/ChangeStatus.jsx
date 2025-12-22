import React, { useState } from 'react';
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Link, usePage } from '@inertiajs/react';
import LayoutReport from '@/Layouts/LayoutReport';
import { Textarea } from "@/Components/ui/textarea";
import { ThumbsUp, ThumbsDown, FileText, ImageIcon, User, MapPin, Calendar, Clock, AlertCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { mockReports } from '@/data/mockReports';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"

const ChangeStatus = () => {
  const { selectedReports } = usePage().props;
  const [activeTab, setActiveTab] = useState('status'); // status | detail
  const [feedback, setFeedback] = useState(null); // 'like' | 'dislike' | null

  // Find the selected report. If array (multiple selected), pick the first one.
  const targetId = Array.isArray(selectedReports) ? selectedReports[0] : selectedReports;
  const report = mockReports.find(r => r.id === targetId) || mockReports[0];

  const handleFeedback = (type) => {
    if (feedback === type) {
      setFeedback(null);
    } else {
      setFeedback(type);
    }
  };

  const [lightboxIndex, setLightboxIndex] = useState(null); // Index of currently viewed image, null if closed

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = (e) => {
    e.stopPropagation();
    if (report.images && lightboxIndex < report.images.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (report.images && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e) => {
        if (lightboxIndex === null) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') {
            if (report.images && lightboxIndex < report.images.length - 1) setLightboxIndex(lightboxIndex + 1);
        }
        if (e.key === 'ArrowLeft') {
            if (lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, report.images]);


  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumb - Clean & Simple */}
        <nav className="flex items-center text-sm text-gray-500 mb-6 px-1">
            <Link href="/report/list-report" className="flex items-center hover:text-blue-600 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                ย้อนกลับไปหน้ารายการ
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-900 font-medium">จัดการสถานะใบงาน</span>
        </nav>

        {/* Header Area */}
        <div className="mb-8 pl-1">
             <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {activeTab === 'status' ? 'จัดการงานซ่อม' : 'ข้อมูลรายละเอียด'}
            </h1>
        </div>

        {/* Main Card Container - The Hybrid Structure */}
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden ring-1 ring-slate-100">
            
            {/* Top Bar with Info & Tabs */}
            <div className="border-b border-gray-100 bg-white">
                <div className="p-6 pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                        {/* Job Info Banner */}
                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 flex-grow">
                             <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                <FileText size={20} />
                             </div>
                             <div>
                                 <h3 className="text-sm font-semibold text-gray-900">{report.problem}</h3>
                                 <p className="text-xs text-gray-500 mt-0.5">เลขที่แจ้ง: {report.id}</p>
                             </div>
                        </div>
                    </div>

                    {/* Tabs - Centered Pill Style */}
                    <div className="flex justify-center pb-6">
                        <div className="bg-slate-100/80 p-1 rounded-xl inline-flex relative">
                             <div 
                                className={`absolute inset-y-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out ${
                                    activeTab === 'status' ? 'left-1' : 'left-[calc(50%+4px)]'
                                }`}
                            />
                            <button 
                                onClick={() => setActiveTab('status')}
                                className={`relative px-6 py-2 rounded-lg text-sm font-medium transition-colors z-10 min-w-[120px] ${
                                    activeTab === 'status' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                เปลี่ยนสถานะ
                            </button>
                            <button 
                                onClick={() => setActiveTab('detail')}
                                className={`relative px-6 py-2 rounded-lg text-sm font-medium transition-colors z-10 min-w-[120px] ${
                                    activeTab === 'detail' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                รายละเอียด
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 min-h-[400px]">
                
                {/* STATUS TAB */}
                {activeTab === 'status' && (
                    <div className="h-full flex flex-col justify-center max-w-lg mx-auto py-8 animate-in fade-in duration-300">
                        <div className="space-y-6">
                             <div className="text-center mb-6">
                                <label className="text-lg font-semibold text-gray-900">อัปเดตสถานะล่าสุด</label>
                                <p className="text-sm text-gray-500 mt-1">เลือกสถานะการดำเนินงานเพื่อแจ้งให้ผู้ใช้ทราบ</p>
                             </div>

                             <Select>
                                <SelectTrigger className="w-full h-14 bg-white border-2 border-slate-100 hover:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all rounded-xl px-4 text-base shadow-sm">
                                    <SelectValue placeholder="เลือกสถานะ..." />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl shadow-xl border-slate-100 p-1 bg-white z-[100]">
                                    <SelectItem value="receive" className="rounded-lg py-3 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm"></span>
                                            <span className="font-medium">รับเรื่อง</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="processing" className="rounded-lg py-3 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm"></span>
                                            <span className="font-medium">กำลังดำเนินการ</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="completed" className="rounded-lg py-3 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm"></span>
                                            <span className="font-medium">เสร็จสิ้น</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="cancelled" className="rounded-lg py-3 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm"></span>
                                            <span className="font-medium">ยกเลิก</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="flex gap-3 pt-4">
                                <Link href="/report/list-report" className="flex-1">
                                    <Button variant="outline" className="w-full h-12 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium">
                                        ย้อนกลับ
                                    </Button>
                                </Link>
                                <Button className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md shadow-blue-500/20">
                                    บันทึกข้อมูล
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* DETAIL TAB */}
                {activeTab === 'detail' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        
                        {/* 1. Meta Data Grid (Top Row) */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center justify-center hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                                    <User size={20} />
                                </div>
                                <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">ผู้แจ้งปัญหา</span>
                                <span className="text-sm font-bold text-slate-700 mt-1 line-clamp-1">{report.reporter}</span>
                            </div>
                            
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center justify-center hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-2">
                                    <MapPin size={20} />
                                </div>
                                <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">สถานที่</span>
                                <span className="text-sm font-bold text-slate-700 mt-1 line-clamp-1">{report.location}</span>
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center justify-center hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-2">
                                    <Calendar size={20} />
                                </div>
                                <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">วันที่แจ้ง</span>
                                <span className="text-sm font-bold text-slate-700 mt-1 line-clamp-1">{report.date}</span>
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center justify-center hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-2">
                                    <AlertCircle size={20} />
                                </div>
                                <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">ความสำคัญ</span>
                                <span className={`text-sm font-bold mt-1 px-2 py-0.5 rounded-full ${
                                    report.priority === 'High' || report.priority === 'เร่งด่วน'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-green-100 text-green-700'
                                }`}>
                                    {report.priority || 'ปกติ'}
                                </span>
                            </div>
                        </div>

                        {/* 2. Main Description (Full Width) */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-blue-600">
                                    <FileText size={20} />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg">รายละเอียดปัญหา</h3>
                            </div>
                            <div className="p-8">
                                <p className="text-gray-700 leading-8 text-lg font-light">
                                    {report.details}
                                </p>
                            </div>
                        </div>

                        {/* 3. Images Grid (Full Width) */}
                        {report.images && report.images.length > 0 && (
                             <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-blue-600">
                                        <ImageIcon size={20} />
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg">รูปภาพประกอบ</h3>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {report.images.map((img, i) => (
                                            <div 
                                                key={i} 
                                                onClick={() => openLightbox(i)}
                                                className="group relative aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-zoom-in shadow-inner"
                                            >
                                                <div className="absolute inset-0 flex items-center justify-center text-slate-300 group-hover:text-slate-400 transition-colors">
                                                    {/* In a real scenario, use <img src={img} ... /> here */}
                                                    <ImageIcon size={32} />
                                                </div>
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <span className="text-white text-xs font-medium px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
                                                        คลิกเพื่อขยาย
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 4. Feedback (Bottom) */}
                        <div className="flex justify-center pt-6 pb-2">
                             <div className="inline-flex bg-white rounded-full p-2 border border-blue-100 shadow-lg shadow-blue-500/10 gap-2">
                                 <button 
                                    onClick={() => handleFeedback('like')}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                                        feedback === 'like' 
                                        ? 'bg-green-500 text-white shadow-md' 
                                        : 'text-gray-500 hover:bg-slate-50'
                                    }`}
                                 >
                                    <ThumbsUp size={18} className={feedback === 'like' ? 'fill-current' : ''} />
                                    <span>มีประโยชน์</span>
                                 </button>
                                 <button 
                                    onClick={() => handleFeedback('dislike')}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                                        feedback === 'dislike' 
                                        ? 'bg-red-500 text-white shadow-md' 
                                        : 'text-gray-500 hover:bg-slate-50'
                                    }`}
                                 >
                                    <ThumbsDown size={18} className={feedback === 'dislike' ? 'fill-current' : ''} />
                                    <span>ไม่มีประโยชน์</span>
                                 </button>
                             </div>
                        </div>

                    </div>
                )}
            </div>
        </div>

        {/* Lightbox Overlay */}
        {lightboxIndex !== null && report.images && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200" onClick={closeLightbox}>
                {/* Content Container */}
                <div className="relative w-full h-full flex items-center justify-center px-4 md:px-20" onClick={e => e.stopPropagation()}>
                    
                     {/* Close Button - Moved inside to work with stopPropagation */}
                    <button 
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {/* Prev Button */}
                    <button 
                        onClick={prevImage}
                        disabled={lightboxIndex === 0}
                        className={`absolute left-4 md:left-8 p-3 rounded-full text-white transition-all ${
                            lightboxIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 hover:scale-110'
                        }`}
                    >
                        <ChevronLeft size={32} />
                    </button>

                    {/* Image Display */}
                    <div className="max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center">
                        <div className="relative bg-slate-800 rounded-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                             {/* In reality, use: <img src={report.images[lightboxIndex]} ... /> */}
                            <div className="w-[600px] h-[400px] bg-slate-700 flex items-center justify-center text-slate-500">
                                   <div className="text-center">
                                       <ImageIcon size={64} className="mx-auto mb-4 opacity-50" />
                                       <p className="text-slate-400">รูปภาพที่ {lightboxIndex + 1} / {report.images.length}</p>
                                   </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Button */}
                    <button 
                        onClick={nextImage}
                        disabled={lightboxIndex === report.images.length - 1}
                        className={`absolute right-4 md:right-8 p-3 rounded-full text-white transition-all ${
                            lightboxIndex === report.images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 hover:scale-110'
                        }`}
                    >
                        <ChevronRight size={32} />
                    </button>

                     {/* Image Counter */}
                     <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/50 rounded-full text-white text-sm">
                        {lightboxIndex + 1} / {report.images.length}
                     </div>
                </div>
            </div>
        )}

      </div>
    </div>
    );
};

ChangeStatus.layout = page => <LayoutReport children={page} />

export default ChangeStatus;
