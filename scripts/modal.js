const closeByOverlayClick = evt => {
    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
        closeModal(document.querySelector('.popup_is-opened'));
    };
};

const closeByEsc = evt => {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    };
};

/*          Открытие попапа         */
const showModal = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('click', closeByOverlayClick);
    document.addEventListener('keydown', closeByEsc);
};

/*          Закрытие попапа         */
const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('click', closeByOverlayClick);
    document.removeEventListener('keydown', closeByEsc);
    
};

export { showModal, closeModal };