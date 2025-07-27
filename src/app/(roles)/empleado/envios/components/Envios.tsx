import DynamicCRUD from '@/app/(roles)/(shared)/components/CRUD/DynamicCRUD'
import React from 'react'
import { formConfig, getColumns } from '../configs'
import { envioPayload, envioService } from '@/app/services/enviosService'
import { paquete } from '@/app/services/paqueteService'

const initState: envioPayload = {
  tipo: "", 
  estado: "", 
  almacenOrigen: "", 
  almacenEnvio: "", 
  paquete: [], 
};


export default function Envios() {
  
}

