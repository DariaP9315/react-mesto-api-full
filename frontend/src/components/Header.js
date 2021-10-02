import logo from '../images/logo.svg';
import { Route, Link } from 'react-router-dom';



function Header(props) {
    return (
        <header className='header'>

            <img className='header__logo' src={logo} alt='логотип' />

            {props.loggedIn &&
                <div className='header__auth-info'>
                    <p className='header__email'>{props.email}</p>
                    <button
                        className='header__log-out'
                        type='submit'
                        name='submit'
                        onClick={props.onLogOut}>Выйти</button>
                </div>
            }
            <Route path='/sign-up'>
                <Link className='header__link' to='sign-in'>Войти</Link>
            </Route>
            <Route path='/sign-in'>
                <Link className='header__link' to='sign-up'>Регистрация</Link>
            </Route>
        </header>
    )
}

export default Header;