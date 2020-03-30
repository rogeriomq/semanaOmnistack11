import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/resources/logo.svg';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';

export default function Register() {
  return (
    <div className="w-full max-w-5xl mx-auto h-screen flex items-center justify-center">
      <div className="flex justify-between items-center p-24 w-full bg-gray-200 rounded-lg shadow-custom"
        // style={{borderRadius: '8px' }}
      >
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1 className="text-2xl">Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.
          </p>

          <Link className="flex items-center text-xl font-medium hover:opacity-50 mt-8" 
            to="/">
            <FiArrowLeft className="text-xl mr-2 text-red-600"/>
            Voltar para logon
          </Link>
        </section>
        <form>
          <AppInput type="text" placeholder="Nome da ONG"/>
          <AppInput type="email" placeholder="Email"/>
          <AppInput type="tel" placeholder="Whatsapp"/>
          <div className="input-group">
            <AppInput type="text" placeholder="Cidade"/>
            <AppInput type="text" placeholder="UF"
              style={{ width: 80 }}/>
          </div>

          <AppButton type="submit">Cadastrar</AppButton>
        </form>
      </div>
    </div>
  );
}
