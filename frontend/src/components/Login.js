import React from 'react';
import { useState } from 'react';
import xss from 'xss'
import { navigate } from '@reach/router'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const doLogin = (e) => {
    e.preventDefault()
    console.info("email", email)
    if(!email) {
      alert('Please enter the email')
      return
    }

    if(!password) {
      alert('Please enter your password!')
      return
    }
    
    if(password.length < 8) {
      alert('Password must have at least 8 chars')
      return
    }

    console.info("SUBMIT OK")

    const url = 'https://ediary-test.herokuapp.com/login'
    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: `email=${xss(email)}&password=${xss(password)}`,
      credentials: 'include'
    }

    fetch(url, options)
    .then(response => {
      if(!response.ok) {        
        if(response.status === 401) {
          alert('Error, please retry')
        }
      }
      return response
    })
    .then(response => {
      console.log("response", response)
      return response.json()
    })
    .then(data => {
      console.info("data", data)

      if(data.success){
        console.log("success token", data.token)
        //document.cookie = 'token=' + data.token
        document.cookie = 'signedin=true'
        setLoggedIn(true)
        navigate('/add-activity')
      }
    })
  }
/*
  const sanitizedEmail = xss(email)
  const sanitizedPassword = xss(password)*/

  return (
    <Section onSubmit={doLogin}> 
      <InputWrapper>
        <Row>
          <Input type="email" onChange={e => setEmail(e.target.value)}  placeholder="Enter your email"/>
        </Row>
        <Row>
          <Input type="password" onChange={e => setPassword(e.target.value)}  placeholder="Enter your password"/>
        </Row>
      </InputWrapper>     
      
      <Row>
        <button type="submit">Login</button>
      </Row>
      <Row>
        <br />
        <p>Don't have an account? <a href="/register">Register</a></p>
      </Row>
    </Section>
  )
}

const borderStyle = () =>
css`	
	border: 1px solid #111111;
  border-radius: 5px;
`

const InputWrapper = styled.div`
  display: flex; 
  flex-direction: column;
  gap: 10px;
`

const Row = styled.div`

`

const Section = styled.form`
  display: grid;  
  grid-template-rows: 300px 100px; 
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px;
  //gap: 1rem;
  @media (max-width: 800px){    
    grid-template-rows: auto minmax(450px, 45vh) minmax(350px, 40vh);
  }
`

const Input = styled.input`	
  width: 400px;
  height: 60px;  
  padding: 0 5px;
  line-height: 1;
  font-size: 1.8rem;
  ${borderStyle}
`

export default Login