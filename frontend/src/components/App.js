import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import successIcon from '../images/success.svg';
import errorIcon from '../images/error.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import api from '../utils/api.js';
import * as auth from '../utils/auth.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [statusMessage, setStatusMessage] = React.useState('');
  const [statusIcon, setStatusIcon] = React.useState(null);
  const history = useHistory();

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(err => console.log(err))
  }, [loggedIn]);
  
  useEffect(() => {
    if (loggedIn) {
      history.push('/')
    }
  }, [loggedIn, history]);
  
  const handleCheckToken = React.useCallback(() => {
    auth.checkToken()
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(res.email);
        history.push('/');
      })
      .catch((err) => console.log(err))
  }, [history]);

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  useEffect(() => {
    function handleOverlayClose(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }
    document.addEventListener('click', handleOverlayClose);

    return () => {
      document.removeEventListener('click', handleOverlayClose);
    };
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ name: '', link: '' });
  }


  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about }).then((data) => {
      setCurrentUser({
        name: name,
        about: about,
        avatar: data.avatar
      });
      closeAllPopups();
    })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api.editAvatar({ avatar }).then((data) => {
      setCurrentUser({
        name: data.name,
        about: data.about,
        avatar: avatar
      });
      closeAllPopups();
    })
      .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link }).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch(err => console.log(err));
  }

  function handleRegister({ email, password }) {
    auth.register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setStatusIcon(successIcon);
        setStatusMessage('Вы успешно зарегистрировались!');
        history.push('/signin');
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
      .then(() => {
        handleCheckToken();
        setLoggedIn(true);
        setUserEmail(email);
        history.push('/');
      })
      .catch(err => console.log(err));
  }

  function handleLogOut() {
    auth.signOut()
      .then(() => {
        history.push('/signin');
        setUserEmail('');
        setLoggedIn(false);
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <Header 
          loggedIn={loggedIn} 
          onLogOut={handleLogOut} 
          email={userEmail} />
        <Switch>
          <ProtectedRoute exact path='/' loggedIn={loggedIn} component={Main}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
        />
        <Route path="/signup">
          <Register onRegister={handleRegister} />
        </Route>
        <Route path="/signin">
          <Login onLogin={handleLogin} />
        </Route>
        </Switch>
        <Footer />
            
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} message={statusMessage} icon={statusIcon} />
    </CurrentUserContext.Provider>
  );
}

export default App
