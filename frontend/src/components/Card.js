import trash from '../images/Trash.svg';
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `element__del ${isOwn ? '' : 'element__del_hidden'}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card)
    }

    function handleCardLike() {
        props.onCardLike(props.card);
    }

    function handleCardDelete() {
        props.onCardDelete(props.card);
    }

    return (
        <div className='element'>
            <button type='button' className={cardDeleteButtonClassName} onClick={handleCardDelete} style={{ backgroundImage: `url(${trash})` }}></button>
            <img className='element__photo' alt={props.card.name} src={props.card.link} onClick={handleClick} />
            <div className='element__info'>
                <h2 className='element__title'>{props.card.name}</h2>
                <div className='element__likes'>
                    <button type='button' className={cardLikeButtonClassName} onClick={handleCardLike}></button>
                    <p className='element__counter-like'>{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card