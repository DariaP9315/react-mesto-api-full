import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';

import successIcon from '../images/success.svg';
import errorIcon from '../images/error.svg';



function App() {

  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' });

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [statusMessage, setStatusMessage] = React.useState('');

  const [statusIcon, setStatusIcon] = React.useState(null);
  const history = useHistory();

  React.useEffect(() => {
    Promise.all([
      api.getUserData(),
      api.getInitialCards()
    ])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(err => console.log(err));

    if (localStorage.getItem('jwt')) {
      auth.checkToken(localStorage.getItem('jwt'))
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push('/');
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEscClosePopup(evt) {
    evt.key === 'Escape' && closeAllPopups()
  }

  function handleOverlayClick(evt) {
    (evt.target === evt.currentTarget) && closeAllPopups()
  }

  function handleCardClick(data) {
    setSelectedCard({ link: data.link, name: data.name })
  }

  function closeAllPopups() {
    isEditProfilePopupOpen && setIsEditProfilePopupOpen(false);
    isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(false);
    isAddPlacePopupOpen && setIsAddPlacePopupOpen(false);
    isInfoTooltipOpen && setIsInfoTooltipOpen(false);
    selectedCard.link && setSelectedCard({ name: '', link: '' })
  }


  function handleUpdateUser({ name, about }) {
    api.updateUserData({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });

  }

  function handleUpdateAvatar({ avatar }) {
    api.updateAvatar({ avatar })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(setCards((state) =>
        state.filter((c) => c._id !== card._id)
      ))
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.postCard({ name, link }).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister({ email, password }) {
    auth.register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setStatusIcon(successIcon);
        setStatusMessage('Вы успешно зарегистрировались!');
        history.push('/sign-in');
      })
      .catch(err => {
        setIsInfoTooltipOpen(true);
        setStatusIcon(errorIcon);
        setStatusMessage('Что-то пошло не так! Попробуйте ещё раз.');
        console.log(err);
      });
  }

  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(email);
        localStorage.setItem('jwt', res.token);
        history.push('/');
      })
      .catch(err => console.log(err));
  }

  function handleLogOut() {
    history.push('/sign-in');
    setUserEmail('');
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }


  React.useEffect(() => {
    (isEditProfilePopupOpen || isEditAvatarPopupOpen ||
      isAddPlacePopupOpen || isInfoTooltipOpen ||
      selectedCard.name !== '') &&
      document.addEventListener('keydown', handleEscClosePopup);

    return () => document.removeEventListener('keydown', handleEscClosePopup);
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          loggedIn={loggedIn}
          onLogOut={handleLogOut}
          email={userEmail} />
        <Switch>

          <Route path='/sign-up'>
            <Register onRegister={handleRegister} />
          </Route>

          <Route path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>

        </Switch>
        <ProtectedRoute
          path='/'
          loggedIn={loggedIn}
          component={Main}
          cards={cards}
          isCardOpen={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onCardClick={handleCardClick}
        />
        <Footer />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          handleOverlay={handleOverlayClick}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          handleOverlay={handleOverlayClick}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          handleOverlay={handleOverlayClick}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          name='image'
          onClose={closeAllPopups}
          card={selectedCard}
          isOpen={selectedCard.link}
          handleOverlay={handleOverlayClick}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          message={statusMessage}
          icon={statusIcon} />

      </div>


    </CurrentUserContext.Provider>
  );
}

export default App