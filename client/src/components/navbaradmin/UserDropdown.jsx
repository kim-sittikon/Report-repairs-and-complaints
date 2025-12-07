import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" // เช็ค path ให้ถูกนะครับ
import { Button } from "@/components/ui/button"
import { User, LogOut, Settings, ChevronDown } from "lucide-react" 

const UserDropdown = () => {
  // ในอนาคตตัวแปรนี้จะรับค่ามาจาก Database หลัง Login ผ่าน
  const userName = "สิทธิกร บุญณะ"; 

  return (
    <DropdownMenu>
      {/* ส่วน Trigger: ชื่อผู้ใช้ที่แสดงบน Navbar */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20 font-normal text-[20px] px-2">
          <User className="mr-2 h-5 w-5" /> 
          {userName}
          <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      {/* ส่วนเมนูที่เด้งออกมา */}
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>แก้ไขข้อมูลส่วนตัว</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          <span>ออกจากระบบ</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown