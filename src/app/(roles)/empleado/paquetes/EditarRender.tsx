import React from 'react'

export const EditarRender = (_: any, row: any) => (
            <button
                onClick={() => handleEdit(row)}
                className="text-blue-400 hover:text-blue-500 transition-colors"
            >
                Editar
            </button>
        )
