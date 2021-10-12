import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link
    });
  }


  return (
    <PopupWithForm
      name='newplace'
      title='Новое место'
      buttonText='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        name='placename'
        id='placename'
        placeholder='Название'
        value={name}
        className='popup__input'
        minLength='2'
        maxLength='30'
        onChange={handleNameChange}
        required
      />
      <span
        className='popup__input-error'
        id='placename-error'
      ></span>

      <input
        type='url'
        name='link'
        id='link'
        value={link}
        placeholder='Ссылка на картинку'
        onChange={handleLinkChange}
        className='popup__input'
        required
      />
      <span
        className='popup__input-error'
        id='link-error'
      ></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
