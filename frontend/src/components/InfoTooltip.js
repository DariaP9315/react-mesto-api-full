import React from 'react';

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container'>
                <button 
                className='popup__close'
                type='button'
                title='Закрыть'
                onClick={props.onClose}
                />
                <div className='popup__status'>
                    <img className='popup__status_icon'
                    src={props.icon}
                    alt='Статус регистрации' 
                    />
                    <p className='popup__status_message'>{props.message}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;