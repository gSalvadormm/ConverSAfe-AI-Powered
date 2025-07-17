import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Boton from "../../components/Boton";
import Input from "../../components/Input";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { loginUsuario } from "@/services/auth";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUsuario(formData.email, formData.password);

      localStorage.setItem(
        "auth",
        JSON.stringify({ token: data.token, user: data.user })
      );

      if (data.user.role === "admin") {
        navigate("/admin/inicio");
      } else {
        navigate("/user/inicio");
      }
    } catch (err: any) {
      if (err.status === 401) {
        alert("❌ Credenciales incorrectas");
      } else {
        console.error("❌ Error:", err);
        alert("Error al iniciar sesión");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[url('/Fondo.png')] bg-no-repeat bg-center bg-contain bg-white">
        <div className="w-[400px] h-[400px]" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
          <div className="md:hidden flex justify-center">
            <img
              src="/Fondo.png"
              alt="Logo"
              className="w-32 h-32 object-cover rounded-full shadow-md"
            />
          </div>

          <div className="text-center mb-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              ¡Hola de nuevo!
            </h2>
            <p className="mt-1 text-gray-600">Nos alegra verte de nuevo</p>
          </div>

          <Input
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            icon={<FiMail />}
            type="email"
            required
            error={errors.email}
            inputName="email"
          />

          <Input
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            icon={<FiLock />}
            type="password"
            required
            error={errors.password}
            inputName="password"
          />

          <div className="text-right">
            <Link
              to="/recover"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <div className="space-y-4 pt-2">
            <Boton
              texto="Iniciar sesión"
              tipo="submit"
              variant="primary"
              iconoInicio={<FiMail />}
              className="w-full"
            />

            <p className="text-center text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
              >
                Regístrate
              </Link>
            </p>

            <Boton
              texto="Google"
              variant="secondary"
              iconoInicio={<FcGoogle />}
              onClick={() => console.log("Google login")}
              className="w-full border border-gray-300"
            />

            <Boton
              texto="Apple"
              variant="secondary"
              iconoInicio={<FaApple />}
              onClick={() => console.log("Apple login")}
              className="w-full border border-gray-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
