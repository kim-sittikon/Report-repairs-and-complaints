import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";

const ReportDropdown = () => {
    
  const reportLinks = [
    { href: "/report", label: "Dashboard (แดชบอร์ด)" },
    { href: "/report/create-news", label: "Create News (สร้างข่าวสาร)" },
    { href: "/report/list-report", label: "List Report (รายการแจ้งซ่อม)" },
    { href: "/report/create-job", label: "Create Job (สร้างใบงาน)" },
    { href: "/report/all-jobs", label: "All Jobs (ใบงานรวม)" },
    { href: "/report/my-jobs", label: "My Jobs (ใบงานของฉัน)" },
    { href: "/report/change-status", label: "Change Status (เปลี่ยนสถานะ)" },
    { href: "/report/create", label: "Create Report (แจ้งซ่อม/ร้องเรียน)" },
    { href: "/report/history", label: "History (ประวัติ)" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="text-white hover:text-white hover:bg-white/20 text-[16px] md:text-[18px] font-normal px-2 hover:no-underline"
        >
          กลุ่มงานแจ้งซ่อม
          <ChevronDown className="ml-1 h-5 w-5" color="white" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 bg-white" align="end">
        {reportLinks.map((item, index) => (
          <DropdownMenuItem key={index} asChild className="cursor-pointer">
            <Link href={item.href} className="w-full block">
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReportDropdown;
