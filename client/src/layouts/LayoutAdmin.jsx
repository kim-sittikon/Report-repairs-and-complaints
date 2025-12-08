// import Navbar from "@/components/navbaradmin/Navbar"
import { Outlet } from "react-router"
import Navbar from "@/components/navbaradmin/Navbar"

const LayoutAdmin = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <Outlet />
      <footer className="mt-8 p-4 bg-gray-100 text-center text-gray-600">
        Copyright &copy; {new Date().getFullYear()} Report Repairs and Complaints Admin
      </footer>
    </div>
  )
}
export default LayoutAdmin