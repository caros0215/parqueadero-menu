function AdminView() {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-[#C19356] mb-2">Administrar ingresos y salidas</h1>
        <div className="h-px bg-neutral-200 w-full mb-6" />
        <div className="w-full min-h-[400px] bg-gray-50 rounded-lg border border-gray-100 shadow-sm grid grid-rows-[2fr_1fr_2fr]">
          <div className="border-b border-gray-200 p-4 relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Línea horizontal */}
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#FBBF24" strokeWidth="2" />
  
              {/* Líneas diagonales */}
              <line x1="5%" y1="0" x2="20%" y2="100%" stroke="#FBBF24" strokeWidth="2" />
              <line x1="22%" y1="0" x2="37%" y2="100%" stroke="#FBBF24" strokeWidth="2" />
              <line x1="39%" y1="0" x2="54%" y2="100%" stroke="#FBBF24" strokeWidth="2" />
              <line x1="56%" y1="0" x2="71%" y2="100%" stroke="#FBBF24" strokeWidth="2" />
              <line x1="73%" y1="0" x2="88%" y2="100%" stroke="#FBBF24" strokeWidth="2" />
              <line x1="90%" y1="0" x2="105%" y2="100%" stroke="#FBBF24" strokeWidth="2" />
            </svg>
          </div>
          <div className="border-b border-gray-200 p-4">{/* Segunda sección - más pequeña */}</div>
          <div className="p-4 relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Línea horizontal */}
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#FBBF24" strokeWidth="2" />
  
              {/* Líneas diagonales */}
              <line x1="5%" y1="0" x2="20%" y2="100%" stroke="#FBBF24" strokeWidth="2" />
              <line x1="22%" y1="0" x2="37%" y2="100%" stroke="#FBBF24" strokeWidth="2" />
              <line x1="39%" y1="0" x2="54%" y2="100%" stroke="#FBBF24" strokeWidth="2" />
              <line x1="56%" y1="0" x2="71%" y2="100%" stroke="#FBBF24" strokeWidth="2" />
              <line x1="73%" y1="0" x2="88%" y2="100%" stroke="#FBBF24" strokeWidth="2" />
              <line x1="90%" y1="0" x2="105%" y2="100%" stroke="#FBBF24" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    )
  }
  
  export default AdminView
  