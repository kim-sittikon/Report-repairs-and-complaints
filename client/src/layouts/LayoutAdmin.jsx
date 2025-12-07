// import Navbar from "@/components/navbaradmin/Navbar"
import { Outlet } from "react-router"
import Navbar from "@/components/navbaradmin/Navbar"

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