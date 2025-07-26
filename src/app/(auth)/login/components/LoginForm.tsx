"use client";
import Link from "next/link";
import FloatingInput from "./FloatingInput";
import { GenericButton } from "@/app/(roles)/(shared)/components/buttons/GenericButton";
import { WelcomeHeader } from "./WelcomeHeader";
import { LoginFormProps } from "../types";



export const LoginForm = ({ onChange, onSubmit, form }: LoginFormProps) => {
  return (
    <div className="relative min-h-screen bg-blue-100 text-black flex items-center justify-center overflow-hidden">
       
      <WelcomeHeader></WelcomeHeader>
      <div className="relative z-20 flex justify-end w-full px-8">
        <div className="max-w-sm w-full bg-transparent p-6 space-y-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold text-black text-center">Iniciar sesión</h2>
            <h3 className="py-1 font-semibold text-gray-400 text-center">Ingresa tus credenciales para acceder al sistema</h3>

            <FloatingInput
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={onChange}
            />

            <FloatingInput
              name="password"
              label="Contraseña"
              type="password"
              value={form.password}
              onChange={onChange}
            />

            <GenericButton content="Ingresar" type="submit" className="w-full rounded-md bg-black py-2 text-gray-200 font-semibold hover:bg-gray-500 transition"></GenericButton>
        

            <p className="text-sm text-center">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="underline  text-blue-600 hover:text-white">
                Regístrate aquí
              </Link>
            </p>

            <p className="text-sm text-center">
              ¿Olvidaste tu contraseña?{" "}
              <Link href="/recovery" className="underline text-blue-600 hover:text-white">
                Recuperar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};