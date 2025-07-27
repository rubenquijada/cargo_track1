"use client";
import Link from "next/link";
import FloatingInput from "../../login/components/FloatingInput";
import { GenericButton } from "@/app/(roles)/(shared)/components/buttons/GenericButton";
import { RegisterFormProps } from "../types";

export const RegisterForm = ({
    onChange,
    onSubmit,
    form,
}: RegisterFormProps) => {
    return (
        <div className= "min-h-screen flex flex-col md:flex-row bg-white text-black" >
        {/* Sección izquierda: mensaje motivacional */ }
        < div className = "md:w-1/2 bg-blue-100 flex items-center justify-center px-8 py-12 border-r border-gray-200" >
            <div className="text-center space-y-4" >
                <h1 className="text-4xl font-bold" >¡Bienvenido a CargoTrack! </h1>
                    < p className = "text-lg text-gray-800" >
                        Regístrate para rastrear tus paquetes, gestionar tus envíos y controlar tus facturas desde un solo lugar.
                    </p>
                            </div>
                            </div>

    {/* Sección derecha: formulario */ }
    <div className="md:w-1/2 bg-blue-100 flex items-center justify-center px-6 py-12" >
        <div className="w-full max-w-md space-y-6" >
            <form onSubmit={ onSubmit } className = "space-y-4" >
                <h2 className="text-3xl font-bold text-center" > Regístrate y empieza a usar CargoTrack </h2>

                    < FloatingInput
    name = "nombre"
    label = "Nombre"
    value = { form.nombre }
    onChange = { onChange }
    textColor = "text-black"
        />

        <FloatingInput
                            name="apellido"
    label = "Apellido"
    value = { form.apellido }
    onChange = { onChange }
    textColor = "text-black"
        />

        <FloatingInput
                            name="cedula"
    label = "Cédula"
    value = { form.cedula }
    onChange = { onChange }
    textColor = "text-black"
        />

        <FloatingInput
                            name="telefono"
    label = "Teléfono"
    value = { form.telefono }
    onChange = { onChange }
    text Color = "text-black"
        />

        <FloatingInput
                            name="email"
    label = "Correo electrónico"
    type = "email"
    value = { form.email }
    onChange = { onChange }
    textColor = "text-black"
        />

        <FloatingInput
                            name="contrasena"
    label = "Contraseña"
    type = "password"
    value = { form.contra }
    onChange = { onChange }
    textColor = "text-black"
        />

        <GenericButton
                            className="w-full rounded-md bg-black py-2 text-white font-semibold hover:bg-gray-600 transition"
    type = "submit"
    content = "Registrarse"
        />

        <p className="text-sm text-center text-gray-700" >
                            ¿Ya tienes acceso ? { " "}
    < Link
                                href = "/login"
className = "underline text-black hover:text-gray-600"
    >
    Ingresa aquí
        </Link>
        </p>
        </form>
        </div>
        </div>
        </div>
    );
};
