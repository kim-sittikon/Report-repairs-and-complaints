import React, { useState } from 'react';
import { 
    ChevronRight, 
    Settings, 
    Tags, 
    Plus, 
    Search, 
    Trash2, 
    AlertCircle,
    CheckCircle2,
    Database,
    Tag
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import LayoutReport from '@/Layouts/LayoutReport';

const ManageKeyword = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [newKeyword, setNewKeyword] = useState('');

    // Mock Data: Central Keywords (ReadOnly)
    const centralKeywords = [
        { id: 1, name: 'อันตราย' },
        { id: 2, name: 'อาคารมีรอยร้าว' },
        { id: 3, name: 'ปลั๊กไฟชำรุด' },
        { id: 4, name: 'ฝ้าเพดานหรือพื้นห้องเสียหาย' },
        { id: 5, name: 'ประตูอาคาร/ห้องเสียหาย' },
        { id: 6, name: 'Wi-Fi ใช้งานไม่ได้' },
        { id: 7, name: 'ไฟไหม้' },
        { id: 8, name: 'โต๊ะเรียนหรือเก้าอี้ชำรุด' },
        { id: 9, name: 'เครื่องพิมพ์ (Printer) เสีย' },
        { id: 10, name: 'เครื่องดูดอากาศไม่ทำงาน' },
    ];

    // Mock Data: My Keywords (Editable)
    const [myKeywords, setMyKeywords] = useState([
        { id: 1, name: 'เครื่องสแกนบาร์โค้ดเสีย' },
        { id: 2, name: 'พื้นห้องมีรอยแตกหรือหลุดล่อน' },
        { id: 3, name: 'ท่อน้ำตัน' },
        { id: 4, name: 'ระบบน้ำรั่ว' },
        { id: 5, name: 'ป้ายชื่อห้องหลุด' },
        { id: 6, name: 'คีย์บอร์ดใช้งานไม่ได้' },
        // Add more mock data for pagination testing if needed
    ]);

    const handleAddKeyword = () => {
        if (newKeyword.trim()) {
            setMyKeywords([...myKeywords, { id: Date.now(), name: newKeyword }]);
            setNewKeyword('');
        }
    };

    const handleDeleteKeyword = (id) => {
        setMyKeywords(myKeywords.filter(k => k.id !== id));
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
                        <span className="text-gray-900 font-medium">ตั้งค่าตัวเลือก</span>
                    </div>
                    <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                            <Settings size={20} />
                         </div>
                         <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">กำหนดคีย์เวิร์ด</h1>
                         </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Central Keywords (Reference) */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="bg-slate-50/80 rounded-2xl border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-700 font-bold">
                                <Database size={18} className="text-slate-400" />
                                รายการคีย์เวิร์ดกลาง
                            </div>
                            <span className="text-xs font-semibold bg-slate-200 text-slate-600 px-2 py-1 rounded-md">Reference</span>
                        </div>
                        
                        <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-100 text-slate-500 font-semibold sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-3 text-left w-20">#</th>
                                        <th className="px-6 py-3 text-left">รายละเอียด</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {centralKeywords.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-white transition-colors text-slate-600 group">
                                            <td className="px-6 py-3 font-mono text-slate-400 group-hover:text-slate-500">
                                                {(index + 1).toString().padStart(2, '0')}
                                            </td>
                                            <td className="px-6 py-3 font-medium group-hover:text-slate-800">
                                                {item.name}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1">
                        <AlertCircle size={12} />
                            ข้อมูลส่วนนี้เป็นข้อมูลระบบ ไม่สามารถแก้ไขได้
                    </p>
                </div>

                {/* Right Column: Manage My Keywords */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* Add Keyword Card */}
                    <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 border border-orange-100 shadow-sm space-y-4">
                        <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <Plus size={16} className="text-orange-500" />
                            ระบุคีย์เวิร์ดใหม่ที่ต้องการเพิ่ม
                        </label>
                        <div className="flex gap-3">
                            <Input 
                                value={newKeyword}
                                onChange={(e) => setNewKeyword(e.target.value)}
                                placeholder="เช่น เครื่องสแกนชำรุด, ไฟกะพริบ..." 
                                className="h-12 border-orange-200 focus:border-orange-500 focus:ring-orange-100 bg-white shadow-sm text-base text-slate-800 placeholder:text-slate-400"
                                onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                            />
                            <Button 
                                onClick={handleAddKeyword}
                                className="h-12 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all w-24 shrink-0"
                            >
                                เพิ่ม
                            </Button>
                        </div>
                    </div>

                    {/* My Keywords Table */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-800 font-bold">
                                <Tag size={18} className="text-orange-500" />
                                รายการคีย์เวิร์ดของฉัน
                                <span className="text-xs font-normal bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full ml-2">
                                    {myKeywords.length} รายการ
                                </span>
                            </div>
                            <div className="relative w-48">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input 
                                    type="text" 
                                    placeholder="ค้นหา..." 
                                    className="w-full pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left w-20">ลำดับ</th>
                                        <th className="px-6 py-4 text-left">รายละเอียด</th>
                                        <th className="px-6 py-4 text-center w-24">จัดการ</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {myKeywords.length > 0 ? (
                                        myKeywords.map((item, index) => (
                                            <tr key={item.id} className="hover:bg-orange-50/50 transition-colors group">
                                                <td className="px-6 py-4 font-mono text-slate-400 group-hover:text-orange-400 transition-colors">
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </td>
                                                <td className="px-6 py-4 font-medium text-slate-700 group-hover:text-slate-900">
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button 
                                                        onClick={() => handleDeleteKeyword(item.id)}
                                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 duration-200"
                                                        title="ลบรายการ"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="py-20 text-center text-slate-400">
                                                <Tag size={48} className="mx-auto mb-3 opacity-20" />
                                                <p>ยังไม่มีรายการคีย์เวิร์ด</p>
                                                <p className="text-xs mt-1 text-slate-300">เริ่มเพิ่มคีย์เวิร์ดใหม่ได้ที่ด้านบน</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                            {/* Pagination (Mock UI) */}
                            {myKeywords.length > 0 && (
                            <div className="p-4 border-t border-slate-100 flex justify-center">
                                <div className="flex items-center gap-1">
                                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
                                        <ChevronRight size={16} className="rotate-180" />
                                    </button>
                                    <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-500 text-white font-medium shadow-sm shadow-orange-500/30">1</button>
                                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-orange-600 font-medium transition-colors">2</button>
                                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-orange-600 font-medium transition-colors">3</button>
                                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-50">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                            )}
                    </div>
                </div>

            </div>
        </div>
    );
};

ManageKeyword.layout = page => <LayoutReport children={page} />

export default ManageKeyword;
