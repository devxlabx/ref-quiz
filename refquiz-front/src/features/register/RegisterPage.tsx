import React, { useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ScreenTypes } from '../../types';
import {
  validateEmailInput,
  validateMatchPasswordInput,
  validateNameInput,
  validatePasswordInput,
} from '../../utils/helpers';
import Button from '../../components/ButtonComponent/StyledButton';
import InputField from '../../components/InputComponent/Input';
import Card from '../../components/CardComponent/Card';
import Error from '../../components/ErrorComponent/error';

function RegisterPage() {
  const { setCurrentScreen } = useQuiz();

  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [matchedPassword, setMatchedPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  const removePlaceHolder = (e: React.MouseEvent<HTMLInputElement>) => {
          e.currentTarget.placeholder = ""
          e.currentTarget.className += " border"
      }

  const handleValidation = (
    value: string,
    validator: (val: string) => boolean,
    setter: (val: string) => void,
    errorKey: string,
    errorMsg: string
  ) => {
    if (validator(value)) {
      setter(value);
      setErrors((prevErrors) => ({ ...prevErrors, [errorKey]: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [errorKey]: errorMsg }));
    }
  };

  const submitData = () => {
    if (Object.values(errors).every((err) => err === '')) {
      setCurrentScreen(ScreenTypes.LoginPage);
    }
  };

  const goToLoginScreen = () => setCurrentScreen(ScreenTypes.LoginPage);

  return (
    <div className="flex items-center justify-center min-h-screen">
        <Card className="w-11/12 sm:w-8/12 md:w-6/12 lg:w-3/12 h-3/6">
            <h2 className="text-2xl font-bold text-center mb-6">Création du compte</h2>

          <InputField
            label="Nom"
            type="text"
            placeholder="Doe"
            onClick={removePlaceHolder}
            onChange={(e) =>
              handleValidation(
                e.target.value,
                validateNameInput,
                setFirstName,
                'firstName',
                'Le nom ne doit pas contenir de caractères spéciaux.'
              )
            }
          />
          <Error>
            {errors.firstName && errors.firstName}
          </Error>

          <InputField
            label="Prénom"
            type="text"
            placeholder="John"
            onClick={removePlaceHolder}
            onChange={(e) =>
              handleValidation(
                e.target.value,
                validateNameInput,
                setLastName,
                'lastName',
                'Le prénom ne doit pas contenir de caractères spéciaux.'
              )
            }
          />
          <Error>
            {errors.lastName && errors.lastName}
          </Error>

          <InputField
            label="E-mail"
            type="email"
            placeholder="john.doe@mail.com"
            onClick={removePlaceHolder}
            onChange={(e) =>
              handleValidation(
                e.target.value,
                validateEmailInput,
                setEmail,
                'email',
                "L'email doit être valide."
              )
            }
          />
          <Error>
            {errors.email && errors.email}
          </Error>

          <InputField
            label="Mot de passe"
            type="password"
            placeholder="***********"
            onClick={removePlaceHolder}
            onChange={(e) =>
              handleValidation(
                e.target.value,
                validatePasswordInput,
                setPassword,
                'password',
                'Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un caractère spécial.'
              )
            }
          />
          <Error>
            {errors.password && errors.password}
          </Error>

          <InputField
            label="Confirmer le mot de passe"
            type="password"
            placeholder="***********"
            onClick={removePlaceHolder}
            onChange={(e) =>
              handleValidation(
                e.target.value,
                (val) => validateMatchPasswordInput(val, password),
                setMatchedPassword,
                'passwordMatch',
                'Les mots de passe ne correspondent pas.'
              )
            }
          />
          <Error>
            {errors.passwordMatch && errors.passwordMatch}
          </Error>


          <div className="flex justify-between mt-4 gap-x-10">
            <Button onClick={goToLoginScreen}>Retour</Button>
            <Button onClick={submitData}>Créer</Button>
          </div>
      </Card>
    </div>
  );
}

export default RegisterPage;
