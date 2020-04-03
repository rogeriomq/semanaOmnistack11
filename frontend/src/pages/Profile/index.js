import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/resources/logo.svg';
import AppAlert from '../../components/AppAlert';
import AppButton from '../../components/AppButton';
import AppIncidentItem from '../../components/AppIncidentItem';
import { QuerySession } from '../../services/gqls';

export default function Profile() {
  const [ongId, setOngId] = useState('');
  const history = useHistory()
  const { data, refetch } = useQuery(
    QuerySession(`
      incidents {
        id title description value
      }
    `),
    {
      variables: { id: ongId }
    }
  );

  function handleLogout() {
    global.localStorage.clear()
    history.push('/')
  }

  useEffect(() => {
    console.log('get OngId');
    refetch();
  }, [data, refetch]);

  useEffect(() => {
    setOngId(global.localStorage.getItem('ongId'));
    console.log('mounted...');
  }, []);

  // if(!ongId) {
  //   return (
  //     <div className="w-full h-screen bg-gray-200 text-gray-200 text-center pt-32">
  //       <p className="font-bold text-black p-5 text-2xl">OPS!</p>
  //       <p className="text-red-600 font-bold w-full text-center text-lg">
  //         NÃO FOI POSSÍVEL IDENTIFICAR A ONG.
          
  //       </p>
  //       {/* {
  //           setTimeout(() => {
  //             history.push('/')
  //           }, 2000)
  //         }   */}
  //     </div>  
  //   )
  // }
  return (
    <div className="w-full max-w-screen-lg px-8 mx-auto my-8">
      <header className="flex items-center">
        <img className="h-16" src={logoImg} alt="Be The Hero" />
        <span className="text-sm md:text-lg ml-5">Bem vinda, ADAP</span>

        <AppButton className="mt-0 ml-auto w-64">
          <Link className="" to="/incidents/new">
            Cadastrar novo caso
          </Link>
        </AppButton>

        <button
          className="bg-transparent rounded-md w-12 h-12 mt-3 ml-4 border  border-gray-300 transition-colors duration-300
        hover:border-gray-600"
          type="button"
          onClick={handleLogout}
        >
          <FiPower className="mx-auto text-xl text-red-600" />
        </button>
      </header>

      <h1 className="text-2xl mt-20 mb-6">Casos Cadastrados</h1>
      {/* <pre>
        {JSON.stringify(data, null, 2)}
      </pre> */}
      <ul className="grid grid-flow-row gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
        {data?.session?.incidents.map((inc, key) => (
          <AppIncidentItem item={inc} key={key} />
        ))}
      </ul>

      <AppAlert
        type="warning"
        title='Atenção'
        message='ONG não identificada. sdfsdf sdfsd fsdf sdfs dsdf sdf sdfsd fds fdsf sf sdf sf dsf sfsd fsdfds fsdfsd fsd fsdfsd sdfsdfsdfs'
        position="bottom-left"
      />
    </div>
  );
}
