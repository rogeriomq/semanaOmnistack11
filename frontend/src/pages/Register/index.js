import { gql, useMutation } from '@apollo/client';
// import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/resources/logo.svg';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';

export default function Register() {
  const history = useHistory();
  const [name, setName] = useState('Ong XXX');
  const [email, setEmail] = useState('maila@aaa.com');
  const [whatsapp, setWhatsapp] = useState('123456');
  const [city, setCity] = useState('Gurupi');
  const [uf, setUf] = useState('TO');

  const CREATE_ONG = gql`
    mutation CreateOng($ongInput: OngInput!) {
      createOng(ongInput: $ongInput) {
        id
        name
      }
    }
  `;

  const [
    createOng,
    {
      called: calledCreateOng,
      loading: loadingCreateOng,
      error: errorCreateOng,
      data: dataCreateOng
    }
  ] = useMutation(CREATE_ONG);

  const handlerRegister = async event => {
    event.preventDefault();
    const ongInput = { name, email, whatsapp, city, uf };
    try {
      await createOng({
        variables: {
          ongInput
        }
      });
    } catch(e) {
      console.log('Error:', e)
      alert('Deu ruim')
    }
    

  };

  const copyToClipBoard = async e => {
    e.preventDefault();
    // console.log(e.target.textContent)
    const text = e.target.textContent;
    if (global.navigator.clipboard) {
      await global.navigator.clipboard.writeText(text);
      alert(`ID ${text} copiado para Área de Transferência`);
      history.push('/')
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto h-screen flex items-center justify-center">
      <div
        className="flex justify-between items-center p-24 w-full gray-100 rounded-lg shadow-custom"
        // style={{borderRadius: '8px' }}
      >
        <section className="w-full max-w-2xl mr-6">
          <img src={logoImg} alt="Be The Hero" />

          <h1 className="text-4xl mt-12 mb-6 font-bold ">Cadastro</h1>
          <p className="text-lg leading-10 text-gray-600">
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link
            className="flex items-center text-xl font-medium hover:opacity-50 mt-6"
            to="/"
          >
            <FiArrowLeft className="text-xl mr-2 text-red-600" />
            Voltar para logon
          </Link>
        </section>
        <form onSubmit={handlerRegister} className="w-full max-w-4xl ml-6">
          <AppInput
            className="mt-2"
            type="text"
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <AppInput
            className="mt-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <AppInput
            className="mt-2"
            type="tel"
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="flex">
            <AppInput
              className="mt-2 mr-1"
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />

            <AppInput
              className="mt-2 ml-1"
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <AppButton type="submit" className="w-full">
            {loadingCreateOng ? 'Cadastrando...' : 'Cadastrar'}
          </AppButton>
          {calledCreateOng && !loadingCreateOng &&!errorCreateOng && (
            <p className="mt-4 text-lg text-gray-700">
              <strong>
                Ong criada! Seu id é
                <span
                  className="cursor-pointer underline transition-opacity transition-shadow  duration-500 hover:shadow-2xl hover:opacity-50 text-red-600 ml-3"
                  onClick={copyToClipBoard}
                >
                  {dataCreateOng?.createOng.id}
                </span>
              </strong>
            </p>
          )}
          
          {
            errorCreateOng &&
            <p>
              Error :( Please try again
              {/* <div>
                BAD:
              {errorCreateOng.networkError.result.errors.map(({message}, i) => (<p key={i}>{message}</p>))}
              </div> */}
            </p>
            
          }
        </form>
      </div>
    </div>
  );
}
