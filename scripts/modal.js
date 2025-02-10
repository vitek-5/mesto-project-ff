const popups = document.querySelectorAll('.popup');

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileDescription = document.querySelector('.popup__input_type_description');

popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
})

const EventHandler = evt => {

    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
        closeModal(document.querySelector('.popup_is-opened'));
    }
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));

    }
}
const showModal = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('click', EventHandler);
    document.addEventListener('keydown', EventHandler);
}

const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('click', EventHandler);
    document.removeEventListener('keydown', EventHandler);
}


const popupEditInsert = () => {
    inputProfileName.value = profileName.innerHTML;
    inputProfileDescription.value = profileDescription.innerHTML;
}

const popupImageInsert = (evt) => {
    popupImage.src = evt.target.closest('.card__image').src;
popupImage.alt = evt.target.closest('.card__image').alt;
popupCaption.textContent = evt.target.closest('.card__image').alt;
}

export {showModal, closeModal, popupEditInsert, popupImageInsert}