// src/components/navbar/Colornav.jsx
const Colornav = ({ children }) => {
  return (
    <header className="w-full bg-[#F59E0B]">
      <div
        className="
          mx-auto max-w-[1850px]
          py-4 px-8
          flex flex-col items-center gap-4
          sm:flex-row sm:justify-between
        "
      >
        {children}
      </div>
    </header>
  )
}

export default Colornav
