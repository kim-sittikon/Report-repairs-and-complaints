// import Navbar from "@/components/navbaradmin/Navbar"
import { Outlet } from "react-router"
import Navbar from "@/components/navbar/navbar"
import Footer from "@/components/Footer"

const LayoutAdmin = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. เอา Navbar มาไว้ข้างบนสุด */}
      <Navbar />

      {/* 2. ส่วนเนื้อหา (Outlet) ให้ขยายเต็มพื้นที่ที่เหลือ */}
      <main className="container flex-grow py-4">
        <Outlet />
      </main>

      {/* 3. Footer อยู่ล่างสุด */}
      <Footer />
    </div>
  )
}
export default LayoutAdmin