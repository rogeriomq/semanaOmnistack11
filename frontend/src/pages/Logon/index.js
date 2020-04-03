import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import heroesImg from '../../assets/resources/heroes.png';
import logoImg from '../../assets/resources/logo.svg';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import { QuerySession } from '../../services/gqls';


export default function Logon() {
  const [getSession, { error, data}] = useLazyQuery(QuerySession(`id, name, email`))
  const history = useHistory()
  const [id, setId] = useState('')

  function handleLogon(e) {
    e.preventDefault()
    console.log(id)
    getSession({
      variables: { id }
    })
    if (error) return alert (`Error! ${error}`)

  }

  // When state of data Mutation to modify...
  useEffect(() => {
    if(data?.session?.name) {
      const {id, name} = data.session
      global.localStorage.setItem('ongId', id)
      global.localStorage.setItem('ongName', name)
      history.push('/profile')
    }
  }, [data, history])


  return (
    <div className="w-full max-w-5xl relative mx-auto h-screen flex items-center justify-between">
      <section className="z-10 w-full mx-8 md:max-w-sm md:mr-8">
        <img src={logoImg} alt="Be The Hero"/>
        <form className="mt-24" onSubmit={handleLogon}>
          <h1 className="text-2xl font-bold mb-8">Faça seu Logon</h1>
          
          <AppInput
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={ e => setId(e.target.value) }
          />
          <AppButton type="submit" className="w-full">
            Entrar
          </AppButton>
          
          <Link className="flex items-center text-xl font-medium hover:opacity-50 mt-8" 
            to="/register">
            <FiLogIn className="text-xl mr-2 text-red-600"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img
        className="
          absolute z-0 opacity-25 mx-auto my-auto
          md:inset-auto md:mx-0 md:my-0 md:opacity-100 md:relative md:w-7/12"
        src={heroesImg}
        alt="Heroes"
      />
    </div>
  )
}
