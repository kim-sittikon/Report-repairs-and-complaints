import React, { useState, useEffect } from 'react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Plus, List, ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import LayoutReport from '@/Layouts/LayoutReport';
import { mockReports } from '@/data/mockReports';

const CreateJob = () => {
    const { selectedReports } = usePage().props;
    
    // Auto-open sidebar if coming from selection
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedRequestIds, setSelectedRequestIds] = useState([]);
    
    // Initialize steps
    const [steps, setSteps] = useState([
        { id: 1, name: '', type: '', responsible: '', date: '', details: '' }
    ]);

    // Handle incoming state from navigation
    useEffect(() => {
        if (selectedReports) {
            // Ensure array (Inertia might pass as string if single, or array?) 
            // Query params: ?selectedReports[]=1&selectedReports[]=2 -> Array.
            // ?selectedReports=1 -> String.
            const reportIds = Array.isArray(selectedReports) ? selectedReports : [selectedReports].filter(Boolean);
            setSelectedRequestIds(reportIds);
            if (reportIds.length > 0) {
                setIsSidebarOpen(true);
            }
        }
    }, [selectedReports]);

    // Use Centralized Mock Data
    const requests = mockReports;

    const toggleRequestSelection = (id) => {
        setSelectedRequestIds(prev => 
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const addStep = () => {
        setSteps([
            ...steps,
            { id: steps.length + 1, name: '', type: '', responsible: '', date: '', details: '' }
        ]);
    };

    const removeStep = (id) => {
        if (steps.length > 1) {
             setSteps(steps.filter(step => step.id !== id));
        }
    };

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden relative animate-in fade-in duration-500 bg-slate-50">
            
            {/* Sidebar (Request List) */}
            <div className={`fixed inset-y-0 left-0 z-40 w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200 shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:w-0 lg:hidden`}>
                 {/* Mobile overlay placeholder */}
            </div>

             {/* Sidebar Content (implemented as a drawer style) */}
            <div className={`fixed left-0 top-0 h-full bg-white z-50 shadow-2xl transition-all duration-300 w-full sm:w-[380px] flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                           <List className="text-orange-500" size={20}/> 
                           รายการคำขอ
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">เลือกคำขอที่ต้องการรวมในใบงานนี้</p>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <ChevronLeft size={24}/>
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                     {/* Header Config */}
                    <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider grid grid-cols-12 gap-2">
                        <div className="col-span-2 text-center">เลือก</div>
                        <div className="col-span-3">เลขที่</div>
                        <div className="col-span-7">หัวข้อ</div>
                    </div>

                    <div className="space-y-2">
                        {requests.map((req, idx) => (
                            <div 
                                key={idx} 
                                className={`flex items-center p-3 rounded-xl border transition-all duration-200 cursor-pointer group ${
                                    selectedRequestIds.includes(req.id) 
                                    ? 'bg-orange-50 border-orange-200 shadow-sm' 
                                    : 'bg-white border-slate-100 hover:border-orange-200 hover:shadow-md'
                                }`}
                                onClick={() => toggleRequestSelection(req.id)}
                            >
                                <div className="w-[16%] flex justify-center">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                        selectedRequestIds.includes(req.id) ? 'bg-orange-500 border-orange-500' : 'border-gray-300 bg-white'
                                    }`}>
                                        {selectedRequestIds.includes(req.id) && <Plus size={14} className="text-white" />}
                                    </div>
                                </div>
                                <div className="w-[25%] text-xs font-bold text-slate-700 font-mono">{req.id}</div>
                                <div className="w-[59%] text-sm text-slate-600 truncate group-hover:text-orange-600 transition-colors font-medium">
                                    {req.problem}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Main Content */}
            <div className="flex-1 overflow-y-auto w-full p-4 md:p-8 lg:p-10 relative">
                
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header & Toggle */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                                className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-500 hover:text-orange-600 hover:border-orange-200 hover:shadow-md transition-all active:scale-95"
                            >
                                <List size={20} />
                            </button>
                            
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">สร้างใบงานใหม่</h1>
                                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                    <Link href="/report" className="hover:text-orange-600 transition-colors">รายการ</Link> 
                                    <ChevronRight size={12} className="text-slate-300"/>
                                    <span className="">รายการใบงาน</span>
                                    <ChevronRight size={12} className="text-slate-300"/>
                                    <span className="text-orange-600 font-medium">สร้างใบงาน</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Name Card */}
                    <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
                        <div className="relative">
                            <label className="block text-slate-700 font-bold mb-3 text-lg">ชื่อใบงาน <span className="text-red-500">*</span></label>
                            <Input 
                                placeholder="ระบุชื่อใบงานเพื่อการติดตามที่ง่ายขึ้น..." 
                                className="bg-slate-50 border-slate-200 h-14 text-lg px-4 focus:bg-white focus:border-orange-300 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-xl" 
                            />
                        </div>
                    </div>

                    {/* Steps Section */}
                    <div>
                        <div className="flex items-center justify-between mb-6 px-1">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">
                                    {steps.length}
                                </span>
                                ขั้นตอนการดำเนินงาน
                            </h2>
                        </div>
                        
                        <div className="space-y-6">
                            {steps.map((step, index) => (
                                <div key={step.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative group animate-in slide-in-from-bottom-4 fill-mode-both" style={{animationDelay: `${index * 100}ms`}}>
                                    
                                    {/* Decoration Line */}
                                    <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-orange-400 to-orange-200 rounded-r-full"></div>

                                    <div className="pl-4">
                                        <div className="flex justify-between items-start mb-6">
                                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">ขั้นตอนที่ {String(index + 1).padStart(2, '0')}</h3>
                                            {steps.length > 1 && (
                                                <button 
                                                    onClick={() => removeStep(step.id)}
                                                    className="text-slate-300 hover:text-red-500 bg-slate-50 hover:bg-red-50 p-2 rounded-lg transition-all"
                                                >
                                                    <X size={18} />
                                                </button>
                                            )}
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">ชื่อขั้นตอน</label>
                                                <Input 
                                                    placeholder="เช่น ตรวจสอบความเสียหาย" 
                                                    className="bg-white border-slate-200 h-11 focus:border-orange-300 focus:ring-4 focus:ring-orange-500/10 rounded-xl" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">ประเภท</label>
                                                <Select>
                                                    <SelectTrigger className="bg-white border-slate-200 h-11 focus:border-orange-300 focus:ring-4 focus:ring-orange-500/10 rounded-xl">
                                                        <SelectValue placeholder="เลือกประเภท" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white rounded-xl shadow-xl border-slate-100 p-1 z-50">
                                                        <SelectItem value="general" className="rounded-lg cursor-pointer py-2.5">ทั่วไป</SelectItem>
                                                        <SelectItem value="urgent" className="rounded-lg cursor-pointer py-2.5 text-red-600 font-medium">เร่งด่วน</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">วันกำหนดเสร็จ</label>
                                                <div className="relative">
                                                    <Input 
                                                        type="date"
                                                        min={new Date().toISOString().split('T')[0]}
                                                        defaultValue={new Date().toISOString().split('T')[0]}
                                                        className="bg-white border-slate-200 h-11 focus:border-orange-300 focus:ring-4 focus:ring-orange-500/10 rounded-xl block w-full" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">ผู้รับผิดชอบ</label>
                                                 <Select>
                                                        <SelectTrigger className="bg-white border-slate-200 h-11 focus:border-orange-300 focus:ring-4 focus:ring-orange-500/10 rounded-xl">
                                                            <SelectValue placeholder="เลือกผู้รับผิดชอบ" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-white rounded-xl shadow-xl border-slate-100 p-1 z-50">
                                                            <SelectItem value="person1" className="rounded-lg cursor-pointer py-2.5">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">ก</div>
                                                                    นาย ก.
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="person2" className="rounded-lg cursor-pointer py-2.5">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">ข</div>
                                                                    นาย ข.
                                                                </div>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">รายละเอียดเพิ่มเติม</label>
                                            <Textarea 
                                                placeholder="ระบุรายละเอียดขั้นตอนการทำงาน..." 
                                                className="bg-white border-slate-200 min-h-[120px] focus:border-orange-300 focus:ring-4 focus:ring-orange-500/10 rounded-xl resize-none" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10 pb-8">
                             <Link href="/report/list-report">
                                <Button 
                                    variant="outline"
                                    className="h-12 px-8 rounded-xl border-2 border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 hover:bg-white font-medium text-lg min-w-[150px] bg-white transition-all"
                                >
                                    ย้อนกลับ
                                </Button>
                             </Link>
                             <Button 
                                onClick={addStep}
                                className="h-12 px-8 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white font-medium text-lg min-w-[200px] shadow-lg shadow-orange-500/20"
                             >
                                เพิ่มขั้นตอน
                             </Button>
                            <Button className="h-12 px-8 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white font-medium text-lg min-w-[200px] shadow-lg shadow-orange-500/20">
                                สร้างใบงาน
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

CreateJob.layout = page => <LayoutReport children={page} />

export default CreateJob;
