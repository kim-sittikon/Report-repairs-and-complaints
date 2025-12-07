import Layout from "@/layouts/Layout";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import About from "@/pages/About";
import Dashboard from "@/pages/admin/Dashboard";
import Manage from "@/pages/admin/Manage";
import Home from "@/pages/home";
import Notfound from "@/pages/Notfound";
import { BrowserRouter, createBrowserRouter, Outlet, Route, Routes } from "react-router";


const AppRoutes = () => {
  return (
    <>
     <BrowserRouter>
      <Routes>
        
        {/* Public Content */}
        <Route element ={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
        </Route>


        {/* Private Contest */}
        <Route path="admin" element={<LayoutAdmin />}>
           <Route index element={<Dashboard />} />
           <Route path="manage" element={<Manage />} />
        </Route>


        {/* Fail Path */}
        <Route path="*" element={<Notfound />} />

      </Routes>
     </BrowserRouter>
    </>
 );
}


export default AppRoutes