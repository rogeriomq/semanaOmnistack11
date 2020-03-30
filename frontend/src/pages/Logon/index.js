import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import heroesImg from '../../assets/resources/heroes.png';
import logoImg from '../../assets/resources/logo.svg';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';

export default function Logon() {
  return (
    <div className="w-full max-w-5xl mx-auto h-screen flex items-center justify-center">
      <section className="w-full max-w-xs mr-8">
        <img src={logoImg} alt="Be The Hero"/>
        <form className="mt-24">
          <h1 className="text-2xl font-bold mb-8">Faça seu Logon</h1>
          
          <AppInput type="text" placeholder="Sua ID"/>
          <AppButton type="submit" className="pqp">
            Entrar
          </AppButton>
          
          <Link className="flex items-center text-xl font-medium hover:opacity-50 mt-8" 
            to="/register">
            <FiLogIn className="text-xl mr-2 text-red-600"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes"/>
    </div>
  )
}
