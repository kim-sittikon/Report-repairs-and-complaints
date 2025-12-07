import Colornav from "./Colornav"
import Dropdown from "./Dropdown"
import Listhome from "./Listhome"
import Logo from "./Logo"
import Namenav from "./Namenav"
import UserDropdown from "./UserDropdown"

const Navbar = () => {
  return (
    <Colornav>
      {/* ซ้าย: โลโก้ + ชื่อระบบ */}
      <div className="flex items-center gap-3">
        <Logo />
        <Namenav />

  
      </div>

      {/* ขวา: เมนู */}
      <div className="flex items-center gap-4 text-sm">
        <Listhome />
        <Dropdown />
        <UserDropdown />
      </div>
    </Colornav>
  )
}

export default Navbar
