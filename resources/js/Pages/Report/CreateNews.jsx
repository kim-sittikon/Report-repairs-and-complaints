import React, { useState, useRef, useEffect } from 'react';
import { Megaphone, Check, LayoutTemplate, Save, Send, Image as ImageIcon, X } from 'lucide-react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";

import LayoutReport from '@/Layouts/LayoutReport';

const CreateNews = () => {
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'general', // general | urgent
    location: '',
    date: new Date().toLocaleString('th-TH'),
    image: null,
    imagePreview: null
  });

  const [showPreview, setShowPreview] = useState(true);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('news_draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(prev => ({
          ...prev,
          ...parsedDraft,
          image: null // File object cannot be saved in localStorage
        }));
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  }, []);

  const handleSaveDraft = () => {
    try {
        // Exclude the File object from storage, keep the preview string
        const { image, ...draftData } = formData;
        localStorage.setItem('news_draft', JSON.stringify(draftData));
        alert('บันทึกแบบร่างเรียบร้อยแล้ว! (Saved locally)');
    } catch (error) {
        alert('เกิดข้อผิดพลาดในการบันทึก: ' + error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation(); // Prevent triggering file input
    setFormData(prev => ({
        ...prev,
        image: null,
        imagePreview: null
    }));
    // Reset file input value so selecting the same file again works
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 py-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-orange-100/50">
        <div className="flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
             <Megaphone className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">สร้างข่าวสาร / ประกาศ</h1>
            <p className="text-gray-500 text-xs">จัดการข้อมูลข่าวสารประชาสัมพันธ์สำหรับบุคลากรและนักศึกษา</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100 shadow-sm mr-2">
            <Check size={14} /> บันทึกอัตโนมัติ
          </div>
          
          <div className="flex gap-2">
            <Button 
                variant="outline" 
                onClick={() => setShowPreview(!showPreview)}
                className="bg-white hover:bg-gray-50 text-gray-600 border-gray-200 transition-all hover:shadow-md"
            >
                <LayoutTemplate size={16} className={`mr-2 transition-transform duration-300 ${!showPreview ? 'rotate-180' : ''}`}/> 
                {showPreview ? 'ซ่อนตัวอย่าง' : 'แสดงตัวอย่าง'}
            </Button>
            
            <Button 
                variant="outline" 
                onClick={handleSaveDraft}
                className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 transition-all hover:shadow-md"
            >
                <Save size={16} className="mr-2"/> บันทึกร่าง
            </Button>

            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/20 border-0 transition-all hover:scale-105">
                <Send size={16} className="mr-2" /> เผยแพร่ประกาศ
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form */}
        <div className={`space-y-6 transition-all duration-500 ease-in-out ${showPreview ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50/50 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>

                <div className="relative">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                        รายละเอียดการประกาศ
                    </h2>
                    <p className="text-gray-400 text-xs mt-1 ml-3">กรุณากรอกข้อมูลให้ครบถ้วนเพื่อความสมบูรณ์ของข่าวสาร</p>
                </div>

                <div className="grid gap-6">
                    {/* Title Input */}
                    <div className="space-y-2 group">
                        <label className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">หัวข้อประกาศ <span className="text-red-500">*</span></label>
                        <Input 
                            placeholder="ระบุหัวข้อที่กระชับและได้ใจความ..." 
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-orange-400 h-12 text-lg transition-all"
                        />
                    </div>

                    {/* Description Input */}
                    <div className="space-y-2 group">
                        <label className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">รายละเอียดเนื้อหา</label>
                        <Textarea 
                            className="min-h-[160px] bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-orange-400 resize-none transition-all text-gray-600 leading-relaxed" 
                            placeholder="อธิบายรายละเอียดเพิ่มเติม..."
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {/* Location */}
                        <div className="space-y-2 group">
                            <label className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">สถานที่</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    {/* MapPin Icon placeholder if not imported, creating one with svg for safety */}
                                    <svg className="w-4 h-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </span>
                                <Input 
                                    placeholder="เช่น ห้องประชุมใหญ่ ชั้น 2" 
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    className="pl-10 bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all"
                                />
                            </div>
                        </div>

                        {/* Post Type Selection */}
                         <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">ประเภทความสำคัญ</label>
                            <div className="flex bg-gray-100/80 p-1.5 rounded-lg border border-gray-200">
                                <button 
                                    onClick={() => setFormData({...formData, type: 'general'})}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                        formData.type === 'general' 
                                        ? 'bg-white text-gray-800 shadow-sm ring-1 ring-black/5' 
                                        : 'text-gray-500 hover:bg-white/50 hover:text-gray-700'
                                    }`}
                                >
                                    <span className={`w-2 h-2 rounded-full bg-blue-400`}></span>
                                    ทั่วไป
                                </button>
                                <button 
                                    onClick={() => setFormData({...formData, type: 'urgent'})}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                        formData.type === 'urgent' 
                                        ? 'bg-red-50 text-red-700 shadow-sm ring-1 ring-red-100' 
                                        : 'text-gray-500 hover:bg-white/50 hover:text-gray-700'
                                    }`}
                                >
                                     <span className={`w-2 h-2 rounded-full animate-pulse bg-red-500`}></span>
                                    เร่งด่วน
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Image Upload Area */}
                    <div className="space-y-2 pt-2">
                        <label className="text-sm font-medium text-gray-700 flex justify-between">
                            <span>รูปภาพประกอบ</span>
                            <span className="text-xs font-normal text-gray-400">รองรับไฟล์ JPG, PNG (ไม่เกิน 5MB)</span>
                        </label>
                        
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageChange} 
                            className="hidden" 
                            accept="image/png, image/jpeg, image/jpg"
                        />

                        <div 
                            onClick={triggerFileInput}
                            className={`group border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer overflow-hidden relative flex flex-col items-center justify-center min-h-[240px]
                            ${formData.imagePreview 
                                ? 'border-orange-300 bg-orange-50/30' 
                                : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
                            }`}
                        >
                            {formData.imagePreview ? (
                                    <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
                                        <div className="relative rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 max-h-[280px]">
                                            <img src={formData.imagePreview} alt="Selected" className="max-w-full max-h-full object-contain" />
                                            
                                            {/* Delete Button overlaid on image */}
                                            <button 
                                                onClick={handleRemoveImage}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 shadow-md z-20"
                                                title="ลบรูปภาพ"
                                            >
                                                <X size={16} />
                                            </button>

                                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm pointer-events-none">
                                                <ImageIcon className="w-10 h-10 text-white mb-2" />
                                                <span className="text-white font-medium">คลิกเพื่อเปลี่ยนรูปภาพ</span>
                                            </div>
                                        </div>
                                    </div>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <ImageIcon className="w-8 h-8 text-orange-500 opacity-80" />
                                    </div>
                                    <h3 className="text-gray-700 font-medium mb-1 group-hover:text-gray-900">ลากไฟล์รูปภาพมาวางที่นี่</h3>
                                    <p className="text-gray-400 text-sm mb-4">หรือคลิกเพื่อเลือกไฟล์จากเครื่อง</p>
                                    <Button size="sm" variant="outline" className="pointer-events-none bg-white border-orange-200 text-orange-600 group-hover:bg-orange-50">
                                        เลือกรูปภาพ
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>

        {/* Right Column: Preview */}
        {showPreview && (
        <div className="lg:col-span-1 animate-in slide-in-from-right-8 duration-500 ease-out sticky top-6 h-fit">
             <div className="flex items-center gap-2 mb-3 px-1 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                <LayoutTemplate size={12} /> Live Preview
             </div>
             
             {/* Preview Card */}
             <div className="bg-white rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 transform transition-all hover:scale-[1.01]">
                {/* Card Image Area */}
                <div className="relative aspect-video bg-gray-100 overflow-hidden group">
                     {formData.imagePreview ? (
                        <>
                            <img 
                                src={formData.imagePreview} 
                                alt="Preview" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                        </>
                     ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50 pattern-grid">
                             <ImageIcon size={48} className="mb-2 opacity-30"/>
                             <span className="text-xs font-medium uppercase tracking-widest opacity-60">No Image</span>
                        </div>
                     )}
                     
                     {/* Badge Overlay */}
                     <div className="absolute top-4 right-4 flex gap-2">
                        {formData.type === 'urgent' && (
                            <span className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-red-400/50 uppercase tracking-wide">
                                Urgent
                            </span>
                        )}
                         <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-white/50 uppercase tracking-wide">
                            Internal
                        </span>
                     </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-4">
                    <div>
                         <div className="flex items-center gap-2 mb-2 text-xs text-gray-400 font-medium">
                            <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded text-gray-500">
                                {/* Calendar Icon SVG */}
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                {formData.date.split(' ')[0]}
                            </span>
                             <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded text-gray-500">
                                {/* Clock Icon SVG */}
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {formData.date.split(' ')[1]} - {formData.date.split(' ')[3]}
                            </span>
                        </div>

                        <h3 className="font-bold text-lg text-gray-900 leading-tight line-clamp-2 min-h-[1.5em]" style={{ wordBreak: 'break-word' }}>
                            {formData.title || <span className="text-gray-300 italic">หัวข้อประกาศ...</span>}
                        </h3>
                    </div>

                    <div className="border-l-2 border-orange-200 pl-3">
                         <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed min-h-[4.5em]" style={{ wordBreak: 'break-word' }}>
                            {formData.description || <span className="text-gray-300 italic">รายละเอียดเนื้อหาจะแสดงที่นี่...</span>}
                        </p>
                    </div>

                    {/* Footer Info */}
                    <div className="pt-4 mt-2 border-t border-dashed border-gray-100 flex items-center justify-between text-xs">
                        <div className="flex items-center text-gray-500 gap-1.5">
                             <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-[10px]">
                                A
                             </div>
                             <span className="font-medium">Admin User</span>
                        </div>
                        <div className="text-gray-400 flex items-center gap-1">
                             <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                             {formData.location || '-'}
                        </div>
                    </div>
                </div>
                
                {/* Bottom Action Bar Mockup */}
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-500 font-mono">
                        ID: PREVIEW
                    </span>
                     <button className="text-orange-500 text-xs font-semibold hover:text-orange-600 transition-colors flex items-center gap-1">
                        อ่านเพิ่มเติม <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                     </button>
                </div>
             </div>
        </div>
        )}

      </div>
    </div>
  );
};

CreateNews.layout = page => <LayoutReport children={page} />

export default CreateNews;
