"use client";
import React from "react";
import { Warehouse, Package,Truck } from "lucide-react";

export const WelcomeHeader = () => {
  return (
    <div className="absolute inset-0 z-10 hidden md:flex items-center justify-start px-20">
      <div className="max-w-md">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-gray-900">Cargo Track</h2>
            <p className="text-xl text-gray-800">
              Sistema de Casillero Internacional
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Warehouse className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-semibold">Orlando, FL</p>
                <p className="text-sm text-gray-600">Almacén USA</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Warehouse className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-semibold">Doral, FL</p>
                <p className="text-sm text-gray-600">Almacén USA</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Package className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-semibold">La Guaira</p>
                <p className="text-sm text-gray-600">Almacén VE</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Package className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-semibold">Nueva Esparta</p>
                <p className="text-sm text-gray-600">Almacén VE</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Servicios de Envío</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <Truck className="h-6 w-6 text-blue-600 mb-2" />
                <p className="font-medium">Envío Marítimo</p>
                <p className="text-sm text-gray-600">$25 por pie cúbico</p>
                <p className="text-xs text-gray-500">Mínimo $35</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <Package className="h-6 w-6 text-indigo-600 mb-2" />
                <p className="font-medium">Envío Aéreo</p>
                <p className="text-sm text-gray-600">$7 por libra/volumen</p>
                <p className="text-xs text-gray-500">Mínimo $45</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};
