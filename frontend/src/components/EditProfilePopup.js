import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            buttonText='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>

            <input
                className='popup__input'
                minLength='2'
                maxLength='40'
                type='text'
                id='name'
                name='username'
                placeholder='Ваше имя'
                value={name}
                onChange={handleNameChange} />
            <span
                className='popup__input-error'
                id='name-error'></span>
            <input
                className='popup__input'
                minLength='2'
                maxLength='200'
                type='text'
                id='occupation'
                name='occupation'
                placeholder='Род деятельности'
                value={description}
                onChange={handleDescriptionChange} />
            <span
                className='popup__input-error'
                id='occupation-error'></span>

        </PopupWithForm>
    )
}

export default EditProfilePopup;