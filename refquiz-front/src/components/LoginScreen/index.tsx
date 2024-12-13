import Button from '../ui/Button'
import styled from 'styled-components'
import { AppLogo } from '../../config/icons'
import React, { useState } from 'react'

import {
    CenterCardContainer,
    HighlightedText,
    LogoContainer,
    PageCenter,
} from '../../styles/Global'
import { useQuiz } from '../../context/QuizContext'
import { ScreenTypes } from '../../types'
import { checkCredentials, validateEmailInput } from '../../utils/helpers'

const DetailText = styled.p`
`

const Input = styled.input`
    height: 2rem;
    margin-top: 10px;
    background-color:#0D1321;
    border:none;
    transition: background-color 0.3s ease; 
    color:white;
    border-radius:5px;

  &:focus {
    background-color: white; 
    color:black;
    outline: none; 
  }
    
`

const Lien = styled.a`
    text-decoration: none;
    color: grey;
    cursor:pointer;
`

const Div = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items:center;
    gap:10px;
`

const DivForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
`
const ErrorMessage = styled.p`
    color: #E63946;
    font-size: 12px;
    margin-top: 5px;
`

function LoginScreen() {
    const { setCurrentScreen } = useQuiz()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errors, setErrors] = useState<{ [key: string]: string }>({}) 

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (validateEmailInput(value)) {
                setEmail(value)
                setErrors((prevErrors) => ({ ...prevErrors, email: "" })); 
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "L'email doit être valide et suivre le format 'exemple@domaine.com'.",
                }));
            }
            
        }
    }
       

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const goToQuizTopicsScreen = (e: React.FormEvent) => {
        e.preventDefault() 
        
        setCurrentScreen(ScreenTypes.QuizTopicsScreen)
    }

    const goToRegisterScreen = () => {
        setCurrentScreen(ScreenTypes.RegisterScreen)
    }

    return (
        <PageCenter justifyCenter >
            <CenterCardContainer>
                    <DivForm>
                        <DetailText>E-mail</DetailText>
                        <Input
                            type="email"
                            placeholder="john.doe@mail.com"
                            onChange={handleEmailChange}
                            required
                        />
                        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>} 
                    </DivForm>
                    <DivForm>
                        <DetailText>Mot de Passe</DetailText>
                        <Input
                            type="password"
                            placeholder="***********"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </DivForm>
                    <Button text="CONNEXION" onClick={goToQuizTopicsScreen} outline width/>               
                    <Div>
                        <Lien href="#">Mot de passe oublié ?</Lien>
                        <Lien onClick={goToRegisterScreen}>Créer un compte</Lien>
                    </Div>
            </CenterCardContainer>
        </PageCenter>
    )
}


export default LoginScreen



  