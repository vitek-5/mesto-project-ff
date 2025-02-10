import { createCard, deleteCard, LikeToggle } from "./card";
import { closeModal } from "./modal";

const placesList = document.querySelector('.places__list')

const formElement1 = document.querySelector('.popup__form_1');
const formElement2 = document.querySelector('.popup__form_2');

const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');

const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileDescription = document.querySelector('.popup__input_type_description');

const ProfileName = document.querySelector('.profile__title');
const ProfileDescription = document.querySelector('.profile__description');




const handleFormSubmit = evt => {
    const openedPopup = document.querySelector('.popup_is-opened');
    evt.preventDefault();
    if (evt.target === formElement1) {
        ProfileName.textContent = inputProfileName.value;
        ProfileDescription.textContent = inputProfileDescription.value;
        closeModal(openedPopup);
    }
    if (evt.target === formElement2) {
        const newCard = {
            name: cardName.value,
            link: cardLink.value,
        };
        placesList.prepend(createCard(newCard, deleteCard, LikeToggle));
        closeModal(openedPopup);
    }
}

export {formElement1, formElement2, handleFormSubmit}