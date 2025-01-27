import React, { useState } from 'react'
import { useQuiz } from '../../context/QuizContext'
import { validateEmailInput } from '../../utils/helpers'
import InputField from '../../components/Input/Input'
import Card from '../../components/Card/Card'
import Error from '../../components/Errors/Error'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import './Login.css';
import {useAuth} from "../../context/AuthProvider";

function Login() {
    const { login } = useAuth();
    const { setCurrentScreen } = useQuiz();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
    const [apiError, setApiError] = useState<string | null>(null);


    const submitData = async () => {
        if (Object.values(errors).every((err) => err === '')) {
            try {
                await login(email, password);
                navigate('/topics');
            } catch (error: any) {
                setApiError(error.message || 'Une erreur est survenue lors de l\'authentification.');
            }
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (validateEmailInput(value)) {
            setEmail(value);
            setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "L'email doit être valide et suivre le format 'exemple@domaine.com'.",
            }));
        }
    };

    const removePlaceHolder = (e: React.MouseEvent<HTMLInputElement>) => {
        e.currentTarget.placeholder = '';
        e.currentTarget.className += ' border';
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };


    const goToRegisterScreen = () => {
        navigate('/register'); // Utilisation du navigate pour rediriger vers /register
    };

    return (
        <Card className="login-card ">
            <InputField
                label="E-mail"
                type="email"
                placeholder="john.doe@mail.com"
                onChange={handleEmailChange}
                onClick={removePlaceHolder}
            />
            <Error>{errors.email && errors.email}</Error>

            <InputField
                label="Mot de Passe"
                type="password"
                placeholder="***********"
                value={password}
                onChange={handlePasswordChange}
                onClick={removePlaceHolder}
            />

            <div className="button-container">
                <Button onClick={submitData}>CONNEXION</Button>
            </div>

            <div className="link-container">
                <a href="#" className="text-white-400 hover:text-gray-300 transition">
                    Mot de passe oublié ?
                </a>
                <a
                    onClick={goToRegisterScreen} // Appel de la fonction de navigation
                    className="text-white-400 cursor-pointer hover:text-gray-300 transition"
                >
                    Créer un compte
                </a>
            </div>
        </Card>
    );
}

export default Login;