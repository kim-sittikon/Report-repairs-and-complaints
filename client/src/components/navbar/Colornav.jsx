const Colornav = ({ children }) => { 
  return (
    <header className="w-full bg-[#F59E0B]">
      <div 
        className="
          mx-auto max-w-[1850px] 
          py-3 px-4 md:px-8 
          flex flex-row items-center justify-between gap-2
        "
      >
        {children}
      </div>
    </header>
  )
}

export default Colornav