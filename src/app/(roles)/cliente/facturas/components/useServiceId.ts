import { useState, useEffect } from "react";
import { flattenDeepWithPrefix } from "@/app/lib/axios";

// Define un tipo para los objetos de datos aplanar.
// Record<string, any> es un objeto con claves de string y valores de cualquier tipo.
type FlattenedDataType = Record<string, any>;

export function useServiceId(url: string, initialId?: string) {
  const [id, setId] = useState<string | null>(initialId || null);
  // --- ¡CORRECCIÓN AQUÍ! ---
  // Ahora, data se declara como un array de objetos (FlattenedDataType[])
  const [data, setData] = useState<FlattenedDataType[]>([]);
  // -------------------------
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [trigger, setTrigger] = useState(0);

  const updater = () => setTrigger((t) => t + 1);

  useEffect(() => {
    if (!initialId && typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.id) setId(user.id);
    }
  }, [initialId]);

  useEffect(() => {
    if (!id) return; // Salir si no hay ID

    setLoading(true);
    fetch(`/api/${url}${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la petición");
        return res.json();
      })
      .then((resData) => {
        let processedData: FlattenedDataType[]; // Declaramos que será un array de nuestro tipo

        if (Array.isArray(resData)) {
          // Si resData es un array, mapeamos cada item
          processedData = resData.map((item) => flattenDeepWithPrefix(item));
        } else {
          // Si resData es un solo objeto, lo aplanamos y lo envolvemos en un array
          processedData = [flattenDeepWithPrefix(resData)];
        }
        setData(processedData); // Ahora setData siempre recibirá un array
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id, trigger, url]); // Añadido 'url' a las dependencias, ya que se usa en el fetch

  return { data, loading, error, updater };
}