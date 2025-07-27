import DynamicCRUD from '@/app/(roles)/(shared)/components/CRUD/DynamicCRUD'
import React from 'react'
import { formConfig, getColumns } from '../configs' // Asumo que estas rutas son correctas
import { envioPayload, envioService } from '@/app/services/enviosService' // Asumo que estas rutas son correctas
import { paquete } from '@/app/services/paqueteService' // Asumo que esta ruta es correcta y 'paquete' es la interfaz/tipo para un paquete individual

// Define el estado inicial para un nuevo envío
const initState: envioPayload = {
  tipo: "",
  estado: "PENDIENTE", // Estado inicial predeterminado
  almacenOrigen: "",
  almacenEnvio: "",
  paquete: [], // Un array vacío para los IDs de los paquetes asociados
};

export default function Envios() {
  return (
    // Se mantiene la tipificación genérica y las props tal como las tenías originalmente.
    // El primer tipo genérico (<paquete>) probablemente se refiere al tipo de datos
    // que el DynamicCRUD listará y permitirá seleccionar (ej. los paquetes disponibles).
    // El segundo tipo genérico (<envioPayload>) se refiere al tipo de datos
    // que el formulario de creación/edición manejará.
    <DynamicCRUD<paquete, envioPayload>
      formConfig={formConfig} // Configuración del formulario para los campos del envío
      formName="Seleccione los datos del envio" // Título para la sección del formulario
      h1Name={"Seleccione los paquetes a enviar"} // Título principal de la página/sección de selección
      getColumns={getColumns} // Función que devuelve las columnas para la tabla de paquetes (o envíos, dependiendo del contexto)
      service={envioService} // Servicio para las operaciones CRUD de envíos
      initState={initState} // Estado inicial para el formulario de creación de envío
      checks={true} // Propiedad que probablemente habilita checkboxes para seleccionar elementos (paquetes)
      id="tracking" // Un ID único para esta instancia del CRUD, posiblemente para seguimiento o estilos
    ></DynamicCRUD>
  );
}


