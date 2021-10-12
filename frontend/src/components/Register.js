import React from 'react';
import RegistrationForm from './RegistrationForm';

function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onRegister({
            email: email,
            password: password
        })
    }

    return (
        <RegistrationForm
            name='register'
            title='Регистрация'
            buttonText='Зарегистироваться'
            onSubmit={handleSubmit}>

            <input
                className='registration__input'
                value={email}
                type='email'
                name='email'
                placeholder='E-mail'
                onChange={handleEmailChange}
                required />

            <input
                className='registration__input'
                minLength='6'
                value={password}
                type='password'
                name='password'
                placeholder='Пароль'
                onChange={handlePasswordChange}
                required />
        </RegistrationForm>
    )
}

export default Register;