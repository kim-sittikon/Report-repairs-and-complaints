// import Navbar from "@/components/navbaradmin/Navbar"
import { Outlet } from "react-router"
import Navbar from "@/components/navbar/navbar"

const LayoutAdmin = () => {
  return (
    <div>
        <Navbar />
        <hr />
        <Outlet />
    </div>
  )
}
export default LayoutAdmin