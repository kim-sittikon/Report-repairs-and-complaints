
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const Listhome = () => {
  return (
    <Button variant="link" asChild 
    className="text-white text-[20px] ">
        <Link to="/">หน้าแรก</Link>
    </Button>
  )
}
export default Listhome