import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
// import { links } from "@/utils/links";
import { linksadmin } from "@/utils/linksadmin";
import { Link } from "react-router-dom";

const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* ใช้ Button ตัวเดียวพอ แล้วใส่ข้อความและไอคอนข้างใน */}
        <Button 
          variant="ghost" 
          className="text-white hover:text-white hover:bg-white/20 text-[20px] font-normal px-2"
        >
          รายการ
          <ChevronDown className="ml-1 h-5 w-5" color="white" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 bg-white" align="end">
        {linksadmin.map((item, index) => (
          // ใช้ asChild เพื่อให้ Link ทำงานสมบูรณ์ครอบคลุมพื้นที่เมนู
          <DropdownMenuItem key={index} asChild className="cursor-pointer">
            <Link to={item.href} className="w-full block">
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;