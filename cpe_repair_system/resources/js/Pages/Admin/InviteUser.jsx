import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Mail, User, Shield, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function InviteUser({ recentInvites = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        role: 'staff',
        job_repair: true,
        job_admin: false,
        job_complaint: true,
    });

    // 🧠 Smart Logic: เปลี่ยนสิทธิ์ตาม Role อัตโนมัติ
    useEffect(() => {
        if (data.role === 'staff') {
            // Staff: ต้องเป็นช่างซ่อม, ไม่ใช่แอดมิน
            setData(prev => ({ ...prev, job_repair: true, job_admin: false, job_complaint: true }));
        } else if (data.role === 'teacher') {
            // Teacher: ให้เลือกเอง แต่ default ไม่ใช่แอดมิน
            setData(prev => ({ ...prev, job_admin: false, job_repair: false, job_complaint: true }));
        }
    }, [data.role]);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.invite.send'), {
            onSuccess: () => reset('email'),
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto p-6 space-y-8">

                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">เชิญผู้ใช้งานใหม่</h1>
                    <p className="mt-2 text-gray-500 text-lg">ส่งคำเชิญเข้าร่วมระบบผ่านทางอีเมล</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Invite Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="bg-orange-500 p-4">
                                <h2 className="text-white font-semibold flex items-center gap-2">
                                    <Mail className="w-5 h-5" /> ฟอร์มส่งคำเชิญ
                                </h2>
                            </div>

                            <form onSubmit={submit} className="p-8 space-y-6">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        อีเมลผู้ใช้งาน <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                            placeholder="user@rmutt.ac.th"
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" /> {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Role */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        บทบาทหน้าที่ <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            value={data.role}
                                            onChange={e => setData('role', e.target.value)}
                                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition-colors appearance-none bg-white"
                                        >
                                            <option value="staff">เจ้าหน้าที่ (Staff)</option>
                                            <option value="teacher">อาจารย์ (Teacher)</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Permissions Card */}
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-orange-500" /> กำหนดสิทธิ์การเข้าถึง
                                    </h3>

                                    <div className="space-y-3">
                                        {/* กลุ่มงานแจ้งปัญหา (แสดงเฉพาะ Teacher) */}
                                        {data.role === 'teacher' && (
                                            <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-orange-300 transition-colors cursor-pointer group">
                                                <div className="flex h-5 items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.job_complaint}
                                                        onChange={e => setData('job_complaint', e.target.checked)}
                                                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 group-hover:ring-2"
                                                    />
                                                </div>
                                                <div className="text-sm">
                                                    <span className="font-medium text-gray-900">กลุ่มงานแจ้งปัญหา</span>
                                                    <p className="text-gray-500 text-xs">สำหรับการดูแลเรื่องการเรียนการสอน</p>
                                                </div>
                                            </label>
                                        )}

                                        {/* กลุ่มงานแจ้งซ่อม */}
                                        <label className={`flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-orange-300 transition-colors cursor-pointer group ${data.role === 'staff' ? 'bg-orange-50 border-orange-200' : ''}`}>
                                            <div className="flex h-5 items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={data.job_repair}
                                                    disabled={data.role === 'staff'}
                                                    onChange={e => setData('job_repair', e.target.checked)}
                                                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                                />
                                            </div>
                                            <div className="text-sm">
                                                <span className="font-medium text-gray-900">
                                                    กลุ่มงานแจ้งซ่อม
                                                    {data.role === 'staff' && <span className="ml-2 text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">Required</span>}
                                                </span>
                                                <p className="text-gray-500 text-xs">สำหรับเจ้าหน้าที่ช่างและผู้ดูแลงานซ่อม</p>
                                            </div>
                                        </label>

                                        {/* กลุ่มแอดมิน (แสดงเฉพาะ Teacher) */}
                                        {data.role === 'teacher' && (
                                            <label className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer group">
                                                <div className="flex h-5 items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.job_admin}
                                                        onChange={e => setData('job_admin', e.target.checked)}
                                                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 group-hover:ring-2"
                                                    />
                                                </div>
                                                <div className="text-sm">
                                                    <span className="font-medium text-gray-900">ผู้ดูแลระบบ (Admin)</span>
                                                    <p className="text-gray-500 text-xs">สิทธิ์สูงสุดในการจัดการระบบ (หากได้รับมอบหมาย)</p>
                                                </div>
                                            </label>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-bold text-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            กำลังส่งข้อมูล...
                                        </>
                                    ) : (
                                        <>
                                            <Mail className="w-5 h-5" /> ส่งคำเชิญทันที
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Recent History & Tips */}
                    <div className="space-y-6">

                        {/* Recent Invites Panel */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-500" /> ประวัติล่าสุด
                                </h3>
                                <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{recentInvites.length}</span>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {recentInvites.length > 0 ? (
                                    recentInvites.map((invite) => (
                                        <div key={invite.account_id} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-medium text-gray-900 text-sm truncate w-2/3" title={invite.email}>
                                                    {invite.email}
                                                </span>
                                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${invite.status === 'active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {invite.status}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs text-gray-500">
                                                <span className="capitalize bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{invite.role}</span>
                                                <span>{new Date(invite.invitation_sent_at).toLocaleDateString('th-TH', { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-400 text-sm">
                                        ยังไม่มีประวัติการเชิญ
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tips Card */}
                        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" /> ข้อแนะนำ
                            </h4>
                            <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
                                <li>ลิงก์คำเชิญมีอายุใช้งาน <strong>24 ชั่วโมง</strong></li>
                                <li><strong>Staff</strong> จะได้รับสิทธิ์งานซ่อมโดยอัตโนมัติ</li>
                                <li><strong>Teacher</strong> สามารถเลือกรับงานแอดมินหรือแจ้งซ่อมได้ตามความเหมาะสม</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
