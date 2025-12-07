import { Menu } from "lucide-react" 
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet" // ต้องผ่านข้อ 1 ก่อนถึงจะบรรทัดนี้จะไม่แดง
import { Button } from "@/components/ui/button"
import Colornav from "./Colornav"
import Dropdown from "./Dropdown"
import ListForm from "./ListForm"
import Listhome from "./Listhome"
import Logo from "./Logo"
import Namenav from "./Namenav"
import UserDropdown from "./UserDropdown" 

const Navbar = () => {
  return (
    <Colornav>
      {/* 1. ส่วนซ้าย: โลโก้ + ชื่อระบบ */}
      <div className="flex items-center gap-2 md:gap-3">
        <Logo />
        <Namenav />
      </div>

      {/* 2. ส่วนขวา (Desktop): จอใหญ่แสดงเมนูครบ */}
      <div className="hidden md:flex items-center gap-4 text-sm">
        <Listhome />
        <ListForm />
        <Dropdown />
        <UserDropdown />
      </div>

      {/* 3. ส่วนขวา (Mobile): จอเล็กแสดงแค่ User กับ ปุ่มเมนู */}
      <div className="flex md:hidden items-center gap-2">
        
        {/* User Profile บนมือถือ (ไว้นอกเมนูเพื่อให้กดง่าย) */}
        <UserDropdown /> 

        {/* ปุ่ม Hamburger (ต้องลง Sheet ก่อนนะ) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          
          <SheetContent side="right" className="w-[250px] bg-white text-black pt-10 border-l-[#F59E0B]">
            <div className="flex flex-col gap-6">
              <span className="font-bold text-lg text-[#F59E0B] border-b pb-2">เมนูหลัก</span>
              
              <div className="flex flex-col items-start gap-4 [&_a]:text-black [&_a]:text-lg">
                <Listhome />
                <ListForm />
                {/* เมนูอื่นๆ ถ้าจะใส่เพิ่ม */}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

    </Colornav>
  )
}

export default Navbar