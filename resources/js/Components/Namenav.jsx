import { Link } from "@inertiajs/react"
import { Button } from "@/Components/UI/button"

const Namenav = () => {
  return (
    <Button variant="link" asChild className="p-0 h-auto">
      <Link 
        href="/" 
        className="
          text-white font-normal 
          text-xs md:text-[20px] 
          leading-tight md:leading-[35px] 
          text-left line-clamp-2 md:whitespace-nowrap
        "
      >
        ระบบรับเรื่องแจ้งปัญหา<br className="block md:hidden"/>ภาควิชาวิศวกรรมคอมพิวเตอร์
      </Link>
    </Button>
  )
}

export default Namenav