import { Link } from "react-router"
import { Button } from "../ui/button"

const ListForm = () => {
  return (
     <Button variant="link" asChild 
    className="text-white text-[20px] ">
        <Link to="/">ฟอร์มแจ้งปัญหา</Link>
    </Button>
  )
}
export default ListForm