import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Megaphone,
    Check,
    EyeOff,
    Save,
    CloudUpload,
    Images,
    Calendar,
    Clock,
    MapPin
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- Schema ---
const CreateNewsSchema = z.object({
    title: z.string().min(1, "กรุณากรอกหัวข้อประกาศ"),
    description: z.string().optional(),
    type: z.enum(["general", "urgent"]), // general = ทั่วไป, urgent = เร่งด่วน
    location: z.string().optional(),
});

const CreateNews = () => {
    // --- Form Hooks ---
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(CreateNewsSchema),
        defaultValues: {
            title: "",
            description: "",
            type: "general",
            location: "",
        },
    });

    // --- Watch values for Preview ---
    const watchedValues = watch();

    // State สำหรับรูปภาพ (Mock functionality)
    const [previewImage, setPreviewImage] = useState(null);

    const onSubmit = (data) => {
        console.log("Form Data:", { ...data, image: previewImage });
        // TODO: Connect to backend
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // --- Helper Components ---
    const TypeButton = ({ value, label, current }) => (
        <button
            type="button" // Important to prevent submit
            onClick={() => setValue("type", value)}
            className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                current === value
                    ? "bg-slate-800 text-white border-slate-800 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            )}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* --- Header Section --- */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b px-6 py-4 mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Title */}
                    <div className="flex items-center gap-3 text-slate-800">
                        <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                            <Megaphone className="w-6 h-6" />
                        </div>
                        <h1 className="text-xl font-bold">สร้างข่าวสาร / ประกาศ</h1>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                        <span className="text-green-600 text-sm font-medium flex items-center gap-1 min-w-fit px-2">
                            <Check className="w-4 h-4" /> บันทึกแล้ว
                        </span>

                        <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 text-gray-600">
                            <EyeOff className="w-4 h-4" />
                            ซ่อนตัวอย่าง
                        </Button>

                        <Button variant="secondary" size="sm" className="bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2 shadow-sm">
                            <Save className="w-4 h-4" />
                            บันทึกฉบับร่าง
                        </Button>

                        <Button size="sm" onClick={handleSubmit(onSubmit)} className="bg-[#EAB308] hover:bg-[#CA8A04] text-white font-medium shadow-sm">
                            เผยแพร่
                        </Button>
                    </div>
                </div>
            </div>

            {/* --- Main Content Content --- */}
            <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">

                        {/* --- Left Column: Form --- */}
                        <div className="lg:col-span-7 xl:col-span-8 p-6 md:p-8 lg:border-r border-gray-100">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-slate-800">รายละเอียดการประกาศ</h2>
                                <p className="text-slate-500 mt-1 text-sm">ใส่ข้อมูลให้ครบถ้วนก่อนเผยแพร่</p>
                            </div>

                            <form className="space-y-6 max-w-2xl mx-auto">
                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-slate-600 font-medium">หัวข้อ</Label>
                                    <Input
                                        id="title"
                                        {...register("title")}
                                        placeholder="เช่น ปิดปรับปรุงเครือข่าย ห้อง 1302"
                                        className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                    />
                                    {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-slate-600 font-medium">รายละเอียด</Label>
                                    <Textarea
                                        id="description"
                                        {...register("description")}
                                        placeholder="สรุปรายละเอียด..."
                                        className="bg-gray-50 border-gray-200 focus:bg-white min-h-[120px] resize-none"
                                    />
                                </div>

                                {/* Post Type */}
                                <div className="space-y-2">
                                    <Label className="text-slate-600 font-medium">ประเภทการโพส</Label>
                                    <div className="flex items-center gap-3">
                                        <TypeButton
                                            value="general"
                                            label="เรื่องทั่วไป"
                                            current={watchedValues.type}
                                        />
                                        <TypeButton
                                            value="urgent"
                                            label="เรื่องเร่งด่วน"
                                            current={watchedValues.type}
                                        />
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-slate-600 font-medium">สถานที่</Label>
                                    <Input
                                        id="location"
                                        {...register("location")}
                                        placeholder="ห้อง 1302"
                                        className="bg-gray-50 border-gray-200 focus:bg-white"
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <Label className="text-slate-600 font-medium">รูปภาพประกอบ</Label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative group h-48 flex flex-col items-center justify-center text-center">
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        {previewImage ? (
                                            <img src={previewImage} alt="Preview" className="h-full object-contain p-2" />
                                        ) : (
                                            <>
                                                <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                                    <CloudUpload className="w-6 h-6 text-gray-400" />
                                                </div>
                                                <p className="text-sm text-gray-600 font-medium">ลากรูปมาวางที่นี่ หรือ</p>
                                                <span className="mt-2 px-4 py-1.5 bg-white border text-xs font-semibold rounded-md shadow-sm text-gray-700">เลือกรูปภาพ</span>
                                                <p className="text-xs text-gray-400 mt-2">รองรับ jpg, png</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* --- Right Column: Preview --- */}
                        <div className="lg:col-span-5 xl:col-span-4 bg-gray-50/50 p-6 md:p-8 flex items-start justify-center border-t lg:border-t-0 lg:border-l border-gray-100">
                            <div className="sticky top-24 w-full max-w-sm">
                                <div className="flex items-center gap-2 mb-4 text-slate-500">
                                    <Images className="w-5 h-5" />
                                    <span className="text-sm font-medium">ตัวอย่างการแสดงผล</span>
                                </div>

                                {/* Card Preview */}
                                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transform transition-all hover:shadow-xl">

                                    {/* Card Image */}
                                    <div className="h-48 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                                        {previewImage ? (
                                            <img src={previewImage} alt="Cover" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-gray-400 flex flex-col items-center">
                                                <Images className="w-12 h-12 mb-2 opacity-50" />
                                                <span className="text-xs">No Image</span>
                                            </div>
                                        )}

                                        {/* Urgent Badge */}
                                        {watchedValues.type === 'urgent' && (
                                            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                                เร่งด่วน
                                            </span>
                                        )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-4 space-y-3">
                                        {/* Date/Time */}
                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{new Date().toLocaleDateString('th-TH')}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-bold text-lg text-slate-800 leading-tight line-clamp-2">
                                            {watchedValues.title || "หัวข้อประกาศ..."}
                                        </h3>

                                        {/* Location */}
                                        {watchedValues.location && (
                                            <div className="flex items-center gap-1 text-xs text-orange-600 font-medium">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span>{watchedValues.location}</span>
                                            </div>
                                        )}

                                        {/* Desc */}
                                        <p className="text-sm text-gray-500 line-clamp-3">
                                            {watchedValues.description || "รายละเอียดเนื้อหา..."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNews;
