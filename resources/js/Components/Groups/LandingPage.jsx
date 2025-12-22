import { Link } from '@inertiajs/react';

export default function LandingPage() {
    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            {/* 1. Hero Section */}
            <div className="relative w-full h-[600px] overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/landing-bg-final.png')" }}
                ></div>
                {/* Dark Overlay - Adjusted to be lighter since the image might already be dark or user wants specific look */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Content */}
                <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col justify-center px-4 md:px-6 lg:px-0">
                    {/* ^^^ ปรับ px ให้น้อยลง (จาก 12 เหลือ 8) เพื่อให้ชิดซ้ายมากขึ้น */}

                    <div className="max-w-7xl space-y-6 text-left pt-10">
                        <div className="space-y-3">
                            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-medium text-white tracking-wide leading-tight drop-shadow-xl whitespace-nowrap">
                                ระบบรับแจ้งปัญหา ภาควิศวกรรมคอมพิวเตอร์
                            </h1>

                            {/* ปรับบรรทัดนี้: เพิ่มขนาดตัวอักษร และเพิ่ม tracking-widest */}
                            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white/95 tracking-widest drop-shadow-lg whitespace-nowrap">
                                Computer Engineering Issue Reporting System
                            </h2>
                        </div>

                        <div className="text-[#949494] text-sm md:text-base lg:text-lg font-light leading-relaxed space-y-1">
                            <p>พบปัญหาเกี่ยวกับอุปกรณ์คอมพิวเตอร์ อุปกรณ์ในห้องเรียน หรือระบบเครือข่าย</p>
                            <p>ระบบนี้พร้อมรับแจ้งและติดตามสถานะให้คุณอย่างสะดวกและรวดเร็ว</p>
                            <p>กรอกแบบฟอร์มไม่กี่นาที แล้วรอการติดต่อกลับจากเจ้าหน้าที่</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-10 pt-4">
                            <Link
                                href={route('report.create')}
                                className="min-w-[160px] px-8 py-3 bg-[#F59E0B] hover:bg-[#d97706] text-black font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg text-center"
                            >
                                แจ้งปัญหา
                            </Link>
                            <Link
                                href={route('report.history')}
                                className="min-w-[160px] px-8 py-3 bg-transparent text-[#F59E0B] border border-[#F59E0B] font-medium rounded-lg hover:bg-[#F59E0B]/10 transition-all duration-300 text-lg shadow-md hover:shadow-lg text-center"
                            >
                                ติดตามสถานะ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Content Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 space-y-12">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h3 className="text-3xl font-bold text-gray-800 tracking-tight">ข่าวสารประชาสัมพันธ์</h3>
                    <div className="h-1 w-20 bg-[#F59E0B] mx-auto rounded-full"></div>
                </div>

                {/* Urgent News (Auto-Scrolling Carousel) */}
                <div className="space-y-4 overflow-hidden relative group/carousel">
                    <h4 className="text-xl font-semibold text-gray-700 border-l-4 border-[#F59E0B] pl-3">เรื่องด่วน (Urgent)</h4>

                    {/* Carousel Container */}
                    <div className="flex gap-6 w-max animate-marquee pause-on-hover py-2">
                        {/* Render items twice for seamless loop */}
                        {[...Array(2)].map((_, setIndex) => (
                            <div key={setIndex} className="flex gap-6">
                                {[
                                    {
                                        id: 1,
                                        title: "บำรุงรักษาเครื่อง Server ประจำเดือน",
                                        desc: "ตรวจสอบและปรับปรุงระบบ Server ID-A1 เพื่อประสิทธิภาพสูงสุด...",
                                        date: "10 Dec 2025",
                                        img: "/images/urgent-news-server.png"
                                    },
                                    {
                                        id: 2,
                                        title: "ซ่อมแซมสาย LAN ห้องปฏิบัติการ 402",
                                        desc: "กำลังดำเนินการเดินสายใหม่ กรุณางดใช้เสียงบริเวณหน้าห้อง...",
                                        date: "09 Dec 2025",
                                        img: "/images/urgent-news-repair.jpg"
                                    },
                                    {
                                        id: 3,
                                        title: "ติดตั้ง Access Point เพิ่มเติม",
                                        desc: "เพิ่มจุดกระจายสัญญาณ Wi-Fi บริเวณโถงทางเดินชั้น 3...",
                                        date: "08 Dec 2025",
                                        img: "/images/urgent-news-server.png"
                                    },
                                    {
                                        id: 4,
                                        title: "แจ้งเปลี่ยนจอโปรเจคเตอร์",
                                        desc: "ห้องเรียน 305 จะมีการเปลี่ยนจอรับภาพใหม่ในช่วงบ่าย...",
                                        date: "07 Dec 2025",
                                        img: "/images/urgent-news-repair.jpg"
                                    },
                                    {
                                        id: 5,
                                        title: "ทำความสะอาดอุปกรณ์คอมพิวเตอร์",
                                        desc: "ขอความร่วมมือคลุมผ้ากันฝุ่นหลังเลิกใช้งาน...",
                                        date: "06 Dec 2025",
                                        img: "/images/urgent-news-server.png"
                                    }
                                ].map((item) => (
                                    <div key={`${setIndex}-${item.id}`} className="w-[300px] md:w-[320px] bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group border border-gray-100 flex-shrink-0">
                                        <div className="h-44 overflow-hidden relative">
                                            <img src={item.img} alt="News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider">Urgent</div>
                                        </div>
                                        <div className="p-4 space-y-2">
                                            <h5 className="font-bold text-lg text-gray-800 line-clamp-1 leading-tight group-hover:text-[#F59E0B] transition-colors">{item.title}</h5>
                                            <p className="text-sm text-gray-500 line-clamp-2 font-light h-10">{item.desc}</p>
                                            <div className="pt-2 flex items-center text-xs text-gray-400 font-light gap-2">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                {item.date}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* All News (Vertical List) */}
                <div className="space-y-4 pt-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h4 className="text-xl font-semibold text-gray-700 border-l-4 border-gray-400 pl-3">เรื่องทั้งหมด (All News)</h4>

                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="ค้นหาข่าวสาร..."
                                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none transition-all"
                            />
                            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {[
                            {
                                id: 1,
                                title: "บำรุงรักษาเครื่อง Server ประจำเดือน",
                                desc: "ตรวจสอบและปรับปรุงระบบ Server ID-A1 เพื่อประสิทธิภาพสูงสุด...",
                                date: "10 Dec 2025",
                                img: "/images/news-test-1.png"
                            },
                            {
                                id: 2,
                                title: "ซ่อมแซมสาย LAN ห้องปฏิบัติการ 402",
                                desc: "กำลังดำเนินการเดินสายใหม่ กรุณางดใช้เสียงบริเวณหน้าห้อง...",
                                date: "09 Dec 2025",
                                img: "/images/news-test-2.jpg"
                            },
                            {
                                id: 3,
                                title: "ติดตั้ง Access Point เพิ่มเติม",
                                desc: "เพิ่มจุดกระจายสัญญาณ Wi-Fi บริเวณโถงทางเดินชั้น 3...",
                                date: "08 Dec 2025",
                                img: "/images/news-test-1.png"
                            },
                            {
                                id: 4,
                                title: "แจ้งเปลี่ยนจอโปรเจคเตอร์",
                                desc: "ห้องเรียน 305 จะมีการเปลี่ยนจอรับภาพใหม่ในช่วงบ่าย...",
                                date: "07 Dec 2025",
                                img: "/images/news-test-2.jpg"
                            }
                        ].map((item) => (
                            <div key={item.id} className="bg-white border boundary border-gray-100 rounded-lg p-4 flex flex-col md:flex-row gap-4 hover:shadow-md transition-shadow duration-200 group">
                                <div className="w-full md:w-48 h-32 md:h-28 shrink-0 rounded-md overflow-hidden bg-gray-100 relative">
                                    <img src={item.img} className="w-full h-full object-cover" alt="news" />
                                </div>
                                <div className="flex-1 space-y-2 py-1">
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            {item.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            ห้อง 402
                                        </div>
                                    </div>
                                    <h5 className="font-bold text-lg text-gray-800 group-hover:text-[#F59E0B] transition-colors">
                                        {item.title}
                                    </h5>
                                    <p className="text-sm text-gray-500 line-clamp-2 font-light">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center pt-6 pb-8">
                        <nav className="flex items-center gap-2">
                            <button className="h-8 w-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            {[1, 2, 3, 4, 5].map((page) => (
                                <button
                                    key={page}
                                    className={`h-8 w-8 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${page === 1 ? 'bg-[#F59E0B] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button className="h-8 w-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </nav>
                    </div>

                </div>
            </div>

            {/* Footer (Copyright) */}

        </div>
    );
}
