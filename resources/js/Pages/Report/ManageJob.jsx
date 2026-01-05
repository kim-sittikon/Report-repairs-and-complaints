import React, { useState } from 'react';
import { ChevronRight, Calendar, CloudUpload, Save, CheckCircle, FileText, Clock, CircleDot, Circle, Briefcase, X, Image as ImageIcon } from 'lucide-react';
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea"; 
import { Link } from '@inertiajs/react';
import LayoutReport from '@/Layouts/LayoutReport';

const ManageJob = () => {
    // Mock Data
    const job = {
        id: 'JOB-001',
        name: 'เปลี่ยนและอัปเดตอุปกรณ์คอมพิวเตอร์',
        steps: [
            { 
                id: 1, 
                name: 'ตรวจสอบไดรเวอร์การ์ดจอ', 
                status: 'completed',
                type: 'ตรวจสอบ',
                dueDate: '31 ธ.ค. 2567',
                detail: 'ตรวจสอบเวอร์ชัน Driver ปัจจุบันและเช็คความเข้ากันได้',
                result: 'Driver เป็นเวอร์ชันเก่า ดำเนินการโหลดตัวใหม่รอติดตั้ง'
            },
            { 
                id: 2, 
                name: 'เปลี่ยน cpu', 
                status: 'current', 
                type: 'ดำเนินการ', 
                dueDate: '1 ม.ค. 2568', 
                detail: 'เปลี่ยน CPU คอมพิวเตอร์เครื่องที่ 15 ห้องปฏิบัติการ CPE-204 ตรวจสอบเข้ากันได้ของเมนบอร์ดและอัปเดต BIOS ก่อนติดตั้ง' 
            },
            { 
                id: 3, 
                name: 'ทดสอบระบบ', 
                status: 'pending',
                type: 'ทดสอบ',
                dueDate: '2 ม.ค. 2568',
                detail: 'เปิดเครื่องและรันทดสอบ Performance เป็นเวลา 30 นาที'
            },
        ]
    };

    // Find active step for default state, or fallback to first
    const activeStep = job.steps.find(s => s.status === 'current') || job.steps[0];
    const [selectedStepId, setSelectedStepId] = useState(activeStep.id);
    const [files, setFiles] = useState([]);

    const selectedStep = job.steps.find(s => s.id === selectedStepId);

    const handleFileChange = (e) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);

            // Validations
            if (files.length + selectedFiles.length > 5) {
                alert('สามารถแนบไฟล์ได้สูงสุด 5 ไฟล์');
                return;
            }

            const validFiles = selectedFiles.filter(file => {
                if (file.size > 5 * 1024 * 1024) {
                    alert(`ไฟล์ ${file.name} มีขนาดใหญ่เกิน 5 MB`);
                    return false;
                }
                return true;
            });

            const newFiles = validFiles.map(file => ({
                file,
                preview: URL.createObjectURL(file),
                id: Math.random().toString(36).substr(2, 9)
            }));
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
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
                        <Link href="/report/my-jobs" className="hover:text-orange-600 transition-colors">รายการใบงานของฉัน</Link>
                        <ChevronRight size={12} className="text-slate-300" />
                        <span className="text-gray-900 font-medium">จัดการใบงาน</span>
                    </div>
                    <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                            <Briefcase size={20} />
                         </div>
                         <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">จัดการใบงาน</h1>
                            <p className="text-slate-500 text-sm">บันทึกผลการดำเนินงานในแต่ละขั้นตอน</p>
                         </div>
                    </div>
                </div>
            </div>

            {/* Job Header Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
                <div className="flex-1 relative z-10">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">เลขที่ใบงาน</label>
                    <div className="flex items-center gap-3">
                         <span className="font-mono text-orange-600 bg-orange-50 px-3 py-1 rounded-lg text-lg font-bold border border-orange-100">{job.id}</span>
                         <h2 className="text-xl font-bold text-slate-800">{job.name}</h2>
                    </div>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Column: Steps */}
                <div className="lg:w-1/3 space-y-4">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-fit sticky top-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                            <Clock size={18} className="text-slate-400" />
                            ขั้นตอนการดำเนินงาน
                        </h2>
                        <div className="space-y-2">
                            {job.steps.map((step, index) => (
                                <div 
                                    key={step.id}
                                    onClick={() => setSelectedStepId(step.id)}
                                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                                        selectedStepId === step.id
                                        ? 'ring-2 ring-orange-500 ring-offset-2 border-transparent bg-white shadow-md'
                                        : step.status === 'current' 
                                            ? 'border-orange-200 bg-orange-50 shadow-sm' 
                                            : step.status === 'completed'
                                                ? 'border-slate-100 bg-slate-50 opacity-70 hover:opacity-100'
                                                : 'border-transparent hover:bg-slate-50'
                                    }`}
                                >
                                    <div className={`shrink-0 ${
                                         step.status === 'completed' ? 'text-green-500' : 
                                         step.status === 'current' ? 'text-orange-500' : 'text-slate-300'
                                    }`}>
                                        {step.status === 'completed' && <CheckCircle size={22} className="fill-green-100" />}
                                        {step.status === 'current' && <CircleDot size={22} className="fill-orange-100 text-orange-600" />}
                                        {step.status === 'pending' && <Circle size={22} />}
                                    </div>
                                    <div className="flex-1">
                                        <div className={`text-sm font-medium ${
                                            step.status === 'current' ? 'text-orange-900' : 'text-slate-600'
                                        }`}>
                                            ขั้นตอนที่ {index + 1}
                                        </div>
                                        <div className={`font-semibold ${
                                             step.status === 'current' ? 'text-slate-900' : 'text-slate-500'
                                        }`}>
                                            {step.name}
                                        </div>
                                    </div>
                                    {selectedStepId === step.id && (
                                        <ChevronRight size={16} className="text-orange-500" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Detail & Action */}
                <div className="lg:w-2/3 space-y-6">
                    
                    {/* Task Info & Action Container */}
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300" key={selectedStepId}>
                        
                        {/* Task Detail Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 relative">
                             <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                 selectedStep.status === 'current' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                 selectedStep.status === 'completed' ? 'bg-green-50 text-green-600 border-green-100' :
                                 'bg-slate-100 text-slate-500 border-slate-200'
                             }`}>
                                {selectedStep.status === 'current' ? 'กำลังดำเนินการ' :
                                 selectedStep.status === 'completed' ? 'เสร็จสิ้น' : 'รอดำเนินการ'}
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                                    {job.steps.findIndex(s => s.id === selectedStep.id) + 1}
                                </span>
                                {selectedStep.name}
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">ประเภทการซ่อม</label>
                                    <div className="text-slate-800 font-semibold text-base bg-white px-3 py-2 rounded-lg border border-slate-100 inline-block shadow-sm">
                                        {selectedStep.type}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">กำหนดเสร็จ</label>
                                    <div className="text-slate-800 font-semibold text-base flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-100 w-fit shadow-sm">
                                        <Calendar className="text-orange-500" size={16} />
                                        {selectedStep.dueDate}
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                     <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">รายละเอียดงาน</label>
                                     <p className="text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm">
                                        {selectedStep.detail}
                                    </p>
                                </div>
                            </div>

                            {/* Show Result if Completed */}
                            {selectedStep.status === 'completed' && selectedStep.result && (
                                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                                    <div className="flex items-center gap-2 mb-2 text-green-800 font-bold">
                                        <CheckCircle size={18} />
                                        ผลการดำเนินการ
                                    </div>
                                    <p className="text-green-900">{selectedStep.result}</p>
                                </div>
                            )}
                        </div>

                        {/* Action Form - Show only if status is 'current' */}
                        {selectedStep.status === 'current' ? (
                            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-slate-200">
                                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                                    <FileText className="text-orange-500" size={20} />
                                    <h3 className="text-lg font-bold text-slate-800">บันทึกผลการดำเนินงาน</h3>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">รายละเอียดผลการซ่อม/การดำเนินการ <span className="text-red-500">*</span></label>
                                        <Textarea 
                                            placeholder="ระบุสิ่งที่ได้ดำเนินการไปอย่างละเอียด..." 
                                            className="min-h-[140px] bg-white border-slate-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 resize-none text-base p-4"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-slate-700">แนบไฟล์/รูปประกอบ</label>
                                        
                                        {/* Upload Box */}
                                        <div className="relative group cursor-pointer">
                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:border-orange-400 group-hover:bg-white/50 group-hover:shadow-md group-hover:shadow-orange-500/5 group-hover:-translate-y-0.5">
                                                
                                                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-orange-100 transition-all duration-300 shadow-sm">
                                                    <CloudUpload size={28} className="text-orange-500 group-hover:text-orange-600 transition-colors" />
                                                </div>
                                                
                                                <h4 className="text-slate-700 font-semibold text-base mb-1 group-hover:text-orange-700 transition-colors">
                                                    คลิกเพื่ออัปโหลด หรือลากไฟล์มาวาง
                                                </h4>
                                                
                                                <p className="text-slate-400 text-xs mb-4">
                                                    JPG, PNG, PDF (สูงสุด 5 รูป, ขนาดไม่เกิน 5MB)
                                                </p>
                                                
                                                <Button type="button" variant="outline" className="h-9 px-4 rounded-lg text-xs font-medium border-slate-200 text-slate-600 group-hover:border-orange-200 group-hover:text-orange-600 group-hover:bg-orange-50 pointer-events-none transition-all">
                                                    เลือกไฟล์จากเครื่อง
                                                </Button>
                                                
                                                <input 
                                                    type="file" 
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                                    multiple 
                                                    accept="image/*,.pdf" 
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        </div>

                                        {/* Selected Files Grid */}
                                        {files.length > 0 && (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                                {files.map((fileObj) => (
                                                    <div key={fileObj.id} className="relative group rounded-xl border border-slate-200 bg-white p-2 flex items-center gap-3 overflow-hidden hover:shadow-md transition-all">
                                                        <div className="w-12 h-12 shrink-0 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
                                                            {fileObj.file.type.startsWith('image/') ? (
                                                                <img src={fileObj.preview} alt="preview" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <FileText className="text-slate-400" size={20} />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-slate-700 truncate">{fileObj.file.name}</p>
                                                            <p className="text-xs text-slate-400">{(fileObj.file.size / 1024).toFixed(1)} KB</p>
                                                        </div>
                                                        <button 
                                                            type="button"
                                                            onClick={() => removeFile(fileObj.id)}
                                                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 mt-6 border-t border-slate-100">
                                    <Link href="/report/my-jobs">
                                        <Button variant="outline" className="h-12 px-8 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-medium shadow-sm">
                                        ย้อนกลับ
                                        </Button>
                                    </Link>
                                    <Button className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-md shadow-blue-500/20 w-full sm:w-auto">
                                    บันทึกฉบับร่าง
                                    </Button>
                                    <Button className="h-12 px-8 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-base shadow-md shadow-green-500/20 w-full sm:w-auto flex items-center gap-2">
                                    <CheckCircle size={18} />
                                    บันทึกและจบงาน
                                    </Button>
                                </div>
                            </div>
                        ) : (
                             // Helper text when viewing future pending steps
                            selectedStep.status === 'pending' && (
                                <div className="flex flex-col items-center justify-center p-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <Clock size={48} className="mb-4 opacity-20" />
                                    <p>ขั้นตอน "ทดสอบระบบ" ยังไม่ถึงกำหนดดำเนินการ</p>
                                    <p className="text-sm mt-1">กรุณาดำเนินการขั้นตอนก่อนหน้าให้เสร็จสิ้นก่อน</p>
                                </div>
                            )
                        )}
                   </div>
                </div>
            </div>

        </div>
    );
};

ManageJob.layout = page => <LayoutReport children={page} />

export default ManageJob;
