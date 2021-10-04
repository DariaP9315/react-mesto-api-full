import React from 'react';
import { Link } from 'react-router-dom';

function RegistrationForm(props) {
    return (
        <section className='registration'>
            <h2 className='registration__title'>{props.title}</h2>
            <form
                name={props.name}
                onSubmit={props.onSubmit}
                noValidate>
                <fieldset className='registration__form'>
                    {props.children}
                    <button
                        className='registration__submit-button'
                        type='submit'
                        name='submit'>{props.buttonText}</button>

                    {props.name === 'register' &&
                        <div className='registration__login'>
                            <p className='registration__login-caption'>Уже зарегистрированы?&nbsp;</p>
                            <Link
                                to='/signin'
                                className='registration__login-link'>Войти</Link>
                        </div>
                    }
                </fieldset>
            </form>
        </section>
    )
}

export default RegistrationForm;
