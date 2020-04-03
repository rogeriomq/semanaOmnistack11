import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

export default function AppIncidentItem({ item }) {
  const p_class = "text-gray-600 text-base leading-relaxed"
  return (
    <li
      className="relative rounded-lg p-6 bg-white border w-full max-w-lg"
    >
      <strong className="block mb-2 text-gray-700 ">CASO:</strong>
      <p className={p_class}>{item?.title}</p>
 
      <strong className="block mb-2 mt-8 text-gray-700">Descrição:</strong>
      <p className={p_class}>{item?.description}</p>

      <strong className="block mb-2 mt-8 text-gray-700">Valor:</strong>
      <p className={p_class}>
        {
          global.Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(item?.value)
        }
      </p>
      
      <button type="button">
        <FiTrash2 className="absolute right-0 top-0 mt-6 mr-6 hover:opacity-50" />
      </button>
    </li>
  );
}
