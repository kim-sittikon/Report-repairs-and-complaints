import { usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from "@/Components/Footer"

const LayoutReport = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar user={usePage().props.auth.user} />
      
      <main className="container mx-auto px-4 py-8 pt-28 flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  )
}
export default LayoutReport