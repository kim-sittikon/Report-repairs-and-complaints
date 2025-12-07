import { Link } from "react-router"
import { Button } from "../ui/button"

const Namenav = () => {
  return (
    <Button variant="link" asChild 
    className="text-white text-[20px] leading-[35px] font-normal px-3 py-2 h-auto">
        <Link to="/">ระบบรับเรื่องแจ้งปัญหาภาควิศวกรรมคอมพิวเตอร์</Link>
    </Button>
  )
}
export default Namenav