import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (

    <main className='content'>
      <section className='profile'>
        <div className='profile__pasport'>
          <div className='profile__avatar'>
            <img className='profile__avatar-image' src={currentUser.avatar}
              alt='аватар пользователя' />
            <button type='button' className='profile__avatar-edit' onClick={props.onEditAvatar}></button>
          </div>
          <div className='profile__info'>
            <div className='profile__title'>
              <h1 className='profile__name'>{currentUser.name}</h1>
              <button type='button' className='profile__edit' onClick={props.onEditProfile}></button>
            </div>
            <p className='profile__occupation'>{currentUser.about}</p>
          </div>
        </div>
        <button type='button' className='profile__add' onClick={props.onAddPlace}></button>

      </section>
      <section className='elements'>
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}

      </section>

    </main>

  )
}

export default Main