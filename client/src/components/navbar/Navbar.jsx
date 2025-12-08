import { useState } from "react";
import { Menu, X } from "lucide-react";
import Dropdown from "./Dropdown";
import ListForm from "./ListForm";
import Listhome from "./Listhome";
import Logo from "./Logo";
import Namenav from "./Namenav";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#F59E0B] shadow-md relative z-50">
      
      {/* --- แก้ตรงนี้ครับ --- 
          1. ลบ container mx-auto ออก (เพื่อให้เลิกจัดกึ่งกลาง)
          2. ใส่ w-full (ให้กว้างเต็มจอ)
          3. ปรับ px-4 (มือถือ) และ md:px-10 (จอคอม) <-- ปรับเลขตรงนี้ถ้าอยากให้ขยับซ้าย/ขวา
      */}
      <div className="w-full px-4 md:px-10 py-3"> 
        
        <div className="flex items-center justify-between">
          
          {/* ฝั่งซ้าย */}
          <div className="flex items-center gap-2 sm:gap-4">
               <Logo />
               <Namenav />
          </div>

          {/* ฝั่งขวา (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <Listhome />
            <ListForm />
            <Dropdown />
            <UserDropdown />
          </div>

          {/* ฝั่งขวา (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-center gap-4 py-4 mt-2 border-t border-white/20 animate-in slide-in-from-top-2 duration-300">
            <Listhome />
            <ListForm />
            <Dropdown />
            <div className="pt-2 border-t border-white/20 w-full flex justify-center">
                <UserDropdown />
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;