import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Boton from "@/components/Boton";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  isAuthenticated: boolean;
  userImage?: string;
}

const Header = ({ isAuthenticated, userImage }: HeaderProps) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("auth") || "{}")?.user;
  const enSala = location.pathname.includes("/chatroom/");

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const handleSalirSala = () => {
    const destino = user?.role === "admin" ? "/admin/inicio" : "/usuario/inicio";
    navigate(destino);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };


  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-[#154EB4] px-4 sm:px-6 py-3 shadow-md">
      <div className="flex items-center justify-between flex-nowrap">
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-xl shrink-0 mr-2">
          <img src="/Logotype2.png" alt="Logo" className="h-8 sm:h-10" />
        </Link>

        {/* Si está autenticado */}
        {isAuthenticated ? (
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Nombre + avatar */}
            <div className="flex items-center gap-2 text-white max-w-[120px] truncate">
              <span className="text-sm font-medium hidden sm:inline truncate">
                {user?.name}
              </span>
              <img
                src={userImage || "/avatar.png"}
                alt="Perfil"
                className="w-9 h-9 rounded-full object-cover border border-white"
              />
            </div>

            {/* Botones grandes (desktop) */}
            <div className="hidden sm:flex items-center gap-2">
              {enSala && (
                <Boton
                  texto="Salir del chat"
                  variant="secondary"
                  onClick={handleSalirSala}
                  className="w-auto h-9 px-3 py-1 text-sm"
                />
              )}
              <Boton
                texto="Cerrar sesión"
                variant="secondary"
                onClick={handleLogout}
                className="w-auto h-9 px-3 py-1 text-sm"
              />
            </div>

            {/* Menú hamburguesa (mobile) */}
            <div className="sm:hidden relative">
              <button
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="text-white"
                aria-label="Abrir menú"
              >
                {menuAbierto ? <X size={24} /> : <Menu size={24} />}
              </button>

              {menuAbierto && (
                <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg py-2 px-4 z-50 space-y-2 w-44">
                  {enSala && (
                    <Boton
                      texto="Salir del chat"
                      onClick={() => {
                        handleSalirSala();
                        setMenuAbierto(false);
                      }}
                      variant="secondary"
                      className="w-full h-10 text-sm"
                    />
                  )}
                  <Boton
                    texto="Cerrar sesión"
                    onClick={() => {
                      handleLogout();
                      setMenuAbierto(false);
                    }}
                    variant="secondary"
                    className="w-full h-10 text-sm"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          // No autenticado: login y register
          <div className="flex items-center gap-2 sm:gap-4 flex-nowrap">
            <Link
              to="/login"
              className="text-[#EFF6FF] text-sm sm:text-base font-medium hover:underline transition whitespace-nowrap"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="bg-[#EFF6FF] text-[#154EB4] text-sm sm:text-base font-medium px-3 sm:px-4 py-2 rounded-[8px] hover:bg-white transition whitespace-nowrap"
            >
              Crear cuenta
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
