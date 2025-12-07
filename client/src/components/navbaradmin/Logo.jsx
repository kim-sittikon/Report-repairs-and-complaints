import logoRMUTT from "@/assets/logo/logo_rmutt.png"
import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <div >
      <Link to="/" >
        <img
          src={logoRMUTT}
          alt="RMUTT Logo"
          className="h-[50px] w-[50px] object-contain shrink-0 "
        />
      </Link>
    </div>
  )
}

export default Logo
