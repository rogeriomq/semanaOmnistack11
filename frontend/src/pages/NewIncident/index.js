import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/resources/logo.svg';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import { MutationCreateIncident } from '../../services/gqls';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();

  const [createIncident, { called, loading, error: errorCreateIncident, data: dataCreateIncident }] = useMutation(
    MutationCreateIncident('id')
  );

  const ongId = global.localStorage.getItem('ongId')
  const ongName = global.localStorage.getItem('ongName');

  function handleSubmit(event) {
    event.preventDefault();
    
    const incidentInput = { title, description, value: parseFloat(value), ong_id:ongId }
    
    console.log(incidentInput)

    createIncident({
      variables: {
        incidentInput
      }
    });
    
  }


  // trigger data
  useEffect(() => {
    if(dataCreateIncident) {
      alert('incident sucess!!')
      history.push('/profile');
    }
  }, [dataCreateIncident, history])

  useEffect(() => {
    global.document.title = `Be The Hero - ${ongName}`;
    console.log(ongName);
    return () => {
      global.document.title = 'Be The Hero';
    };
  }, [ongName]);

  return (
    <div className="w-full max-w-5xl mx-auto h-screen flex items-center justify-center">
      <div
        className="flex justify-between items-center p-24 w-full gray-100 rounded-lg shadow-custom relative"
        // style={{borderRadius: '8px' }}
      >
        <div className="absolute left-0 top-0 m-2">
          <span className="italic font-bold text-gray-500 text-xs">
            {ongName}
          </span>
        </div>
        <section className="w-full max-w-2xl mr-6">
          <img src={logoImg} alt="Be The Hero" />

          <h1 className="text-4xl mt-12 mb-6 font-bold ">
            Cadastrar novo caso
          </h1>
          <p className="text-lg leading-10 text-gray-600">
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link
            className="flex items-center text-xl font-medium hover:opacity-50 mt-6"
            to="/profile"
          >
            <FiArrowLeft className="text-xl mr-2 text-red-600" />
            Voltar para home
          </Link>
        </section>
        <form className="w-full max-w-4xl ml-6" onSubmit={handleSubmit}>
          <AppInput
            className=""
            type="text"
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <AppInput
            isTextArea
            className="mt-4"
            placeholder="Descrição"
            style={{ minHeight: 140 }}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <AppInput
            className="mt-2"
            type="tel"
            placeholder="Valor em R$"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <AppButton type="submit" className="w-full">
            Cadastrar
          </AppButton>
          {called && !loading && !errorCreateIncident && (
              <p>Cadastrado com Sucesso</p>            
          )}
          
          {
            errorCreateIncident &&
            <p>
              Error :( Please try again
            </p>
            
          }
          
        </form>
      </div>
    </div>
  );
}
