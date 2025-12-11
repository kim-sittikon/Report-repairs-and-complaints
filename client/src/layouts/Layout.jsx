import Navbar from "@/components/navbar/Navbar"
import { Outlet } from "react-router"

const Layout = () => {
  return (
    <> 
      {/* 1. เอา Navbar มาไว้ข้างบนสุด (นอก main) มันถึงจะกว้างเต็มจอได้ */}
      <Navbar /> 
      
      {/* 2. ส่วนเนื้อหา (Outlet) ให้เก็บไว้ใน container เหมือนเดิม เนื้อหาจะได้อยู่ตรงกลางสวยๆ */}
      <main className="container">
        <Outlet />
      </main>

    </>
  )
}
export default Layout