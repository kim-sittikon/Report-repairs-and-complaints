import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function ManageLocations({ auth, buildings = [], rooms = [] }) {
    const [activeTab, setActiveTab] = useState('buildings');

    const buildingForm = useForm({
        building_name: '',
    });

    const roomForm = useForm({
        building_id: '',
        room_name: '',
    });

    const handleAddBuilding = (e) => {
        e.preventDefault();
        buildingForm.post(route('admin.buildings.store'), {
            preserveScroll: true,
            onSuccess: () => buildingForm.reset(),
        });
    };

    const handleAddRoom = (e) => {
        e.preventDefault();
        roomForm.post(route('admin.rooms.store'), {
            preserveScroll: true,
            onSuccess: () => roomForm.reset(),
        });
    };

    const handleDeleteBuilding = (id) => {
        if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบอาคารนี้?')) {
            useForm().delete(route('admin.buildings.destroy', id));
        }
    };

    const handleDeleteRoom = (id) => {
        if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบห้องนี้?')) {
            useForm().delete(route('admin.rooms.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="กำหนดที่ตั้ง" />

            <div className="py-8 bg-gray-50 min-h-screen font-['K2D']">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="text-sm text-gray-600 mb-4">
                        <span>ระบบหลัก</span> / <span className="font-semibold">กำหนดที่ตั้ง</span>
                    </div>

                    {/* Page Title */}
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">กำหนดที่ตั้ง</h1>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-300 mb-6">
                        <button
                            onClick={() => setActiveTab('buildings')}
                            className={`px-6 py-3 font-medium transition-colors ${activeTab === 'buildings'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            กำหนดที่ตั้ง
                        </button>
                        <button
                            onClick={() => setActiveTab('rooms')}
                            className={`px-6 py-3 font-medium transition-colors ${activeTab === 'rooms'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            เพิ่มห้อง
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {activeTab === 'buildings' && (
                            <div>
                                {/* Add Building Form */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-medium mb-4">อาคารและชั้น</h3>
                                    <form onSubmit={handleAddBuilding} className="flex gap-4 items-end">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder="เช่น CPE1 ชั้น 1"
                                                value={buildingForm.data.building_name}
                                                onChange={(e) => buildingForm.setData('building_name', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={buildingForm.processing}
                                            className="px-8 py-2 bg-[#F59E0B] hover:bg-[#d97706] text-white font-medium rounded-md transition-colors disabled:opacity-50"
                                        >
                                            เพิ่ม
                                        </button>
                                    </form>
                                </div>

                                {/* Buildings Table */}
                                <div>
                                    <h3 className="text-lg font-medium mb-4">รายการอาคารและชั้น</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border border-gray-300 px-4 py-2 text-left">ลำดับ</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">อาคาร</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-center">การจัดการ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {buildings.length > 0 ? (
                                                    buildings.map((building, index) => (
                                                        <tr key={building.building_id} className="hover:bg-gray-50">
                                                            <td className="border border-gray-300 px-4 py-2">{String(index + 1).padStart(2, '0')}</td>
                                                            <td className="border border-gray-300 px-4 py-2">{building.building_name}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                                <button
                                                                    onClick={() => handleDeleteBuilding(building.building_id)}
                                                                    className="px-4 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors text-sm"
                                                                >
                                                                    ลบอาคาร
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3" className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                                                            ไม่มีข้อมูลอาคาร
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'rooms' && (
                            <div>
                                {/* Add Room Form */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-medium mb-4">อาคารและชั้น</h3>
                                    <form onSubmit={handleAddRoom} className="space-y-4">
                                        <div>
                                            <select
                                                value={roomForm.data.building_id}
                                                onChange={(e) => roomForm.setData('building_id', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                                                required
                                            >
                                                <option value="">เลือกอาคารและชั้น</option>
                                                {buildings.map((building) => (
                                                    <option key={building.building_id} value={building.building_id}>
                                                        {building.building_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                ระบุห้องที่ต้องการกำหนด
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="เช่น 16105"
                                                value={roomForm.data.room_name}
                                                onChange={(e) => roomForm.setData('room_name', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={roomForm.processing}
                                            className="w-full px-8 py-2 bg-[#F59E0B] hover:bg-[#d97706] text-white font-medium rounded-md transition-colors disabled:opacity-50"
                                        >
                                            เพิ่ม
                                        </button>
                                    </form>
                                </div>

                                {/* Rooms Table */}
                                <div>
                                    <h3 className="text-lg font-medium mb-4">รายการอาคารและห้อง</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border border-gray-300 px-4 py-2 text-left">ลำดับ</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">อาคาร</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">ห้อง</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-center">การจัดการ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rooms.length > 0 ? (
                                                    rooms.map((room, index) => (
                                                        <tr key={room.room_id} className="hover:bg-gray-50">
                                                            <td className="border border-gray-300 px-4 py-2">{String(index + 1).padStart(2, '0')}</td>
                                                            <td className="border border-gray-300 px-4 py-2">{room.building?.building_name}</td>
                                                            <td className="border border-gray-300 px-4 py-2">{room.room_name}</td>
                                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                                <button
                                                                    onClick={() => handleDeleteRoom(room.room_id)}
                                                                    className="px-4 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors text-sm"
                                                                >
                                                                    ลบห้อง
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                                                            ไม่มีข้อมูลห้อง
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
