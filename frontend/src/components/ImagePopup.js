function ImagePopup(props) {
    return (
        <div className={`popup popup-${props.name} ${props.card.link ? 'popup_opened' : ''}`} onClick={props.handleOverlay}>
            <div className='popup__image'>
                <img className='popup__photo' src={props.card.link} alt={props.card.name} />
                <h2 className='popup__caption'>{props.card.name}</h2>
                <button
                    type='button'
                    className='popup__close'
                    onClick={props.onClose}
                ></button>
            </div>
        </div>
    )
}

export default ImagePopup
