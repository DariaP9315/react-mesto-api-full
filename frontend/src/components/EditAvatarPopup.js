import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
    const inputRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            buttonText='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                type='url'
                name='link'
                id='av_link'
                placeholder='Ссылка на фото'
                className='popup__input'
                ref={inputRef}
                required
            />
            <span
                className='popup__input-error'
                id='av_link-error'
            ></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;