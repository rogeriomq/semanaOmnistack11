import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/resources/logo.svg';
import AppAlert from '../../components/AppAlert';
import AppButton from '../../components/AppButton';
import AppIncidentItem from '../../components/AppIncidentItem';
import { MutationDeleteIncident, QuerySession } from '../../services/gqls';

export default function Profile() {
  const [ongId, setOngId] = useState('');
  const [incidents, setIncidents] = useState([])
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

  const [deleteIncident] = useMutation(MutationDeleteIncident())

  function handleLogout() {
    global.localStorage.clear()
    history.push('/')
  }

  async function handleDeleteIncident(id) {
    const {data} = await deleteIncident({
      variables:{
        id,
        ong_id: ongId
      }
    })
    console.log(data)
    if(data.deleteIncident)
      setIncidents(incidents.filter((incident) => incident.id !== id))
  }

  // Trigger to Refetch query
  useEffect(() => {
    refetch();
    if(data?.session)
      setIncidents(data?.session.incidents)
  }, [data, refetch]);

  // Trigger on mount component
  useEffect(() => {
    setOngId(global.localStorage.getItem('ongId'));
  }, []);

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
        {incidents.map((inc, key) => (
          <AppIncidentItem item={inc} key={key} onDeleteIncident={handleDeleteIncident} />
        ))}
      </ul>

      {
        !ongId &&
        <AppAlert
          type="warning"
          title='Atenção'
          message='Que pena, ONG não identificada.'
          position="top-right"
          onClose={() => history.push('/')}
        />
      }
    </div>
  );
}
