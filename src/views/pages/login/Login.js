import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
`

const Underline = styled.div`
  width: 50px;
  height: 3px;
  background-color: #333;
  margin: 0 auto;
`

const Form = styled.form`
  width: 300px;
  margin-top: 20px;
`

const InputGroup = styled.div`
  margin-bottom: 20px;
`

const InputLabel = styled.label`
  display: block;
  font-size: 18px;
  margin-bottom: 5px;
  color: #333;
`

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
`

const LoginComponent = () => {
  const [maVariable, setMaVariable] = useState()
  const [state, setState] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    mdp: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Utilisez Axios pour envoyer les données au backend
    axios
      .post('https://webservice-production-dbfd.up.railway.app/api/login1', formData)
      .then((response) => {
        console.log(response.data)
        if (response.data == 1) {
          console.log(response.data)
          window.location.href = '/#/Dashboard'
        } else {
          setState('Mot de passe ok incorrect!!!')
        }
        //setMaVariable(response.data);
        //const msg = response.data;
        // Traitez la réponse du backend si nécessaire
      })
      .catch((error) => {
        window.location.href = '/#/Dashboard'
        console.error("Erreur lors de l'envoi des données", error)
      })
  }

  return (
    <Container>
      <div>
        <p>{state}</p>
      </div>
      <Header>
        <Title>Login</Title>
        <Underline />
      </Header>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel>Email</InputLabel>
          <InputField
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Votre e-mail"
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>Mot de passe</InputLabel>
          <InputField
            name="mdp"
            type="password"
            value={formData.mdp}
            onChange={handleChange}
            placeholder="Mot de passe"
          />
        </InputGroup>
        <SubmitButton type="submit">Se connecter</SubmitButton>
      </Form>
    </Container>
  )
}

export default LoginComponent
