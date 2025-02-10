import '../pages/index.css';
import { initialCards } from '../scripts/cards';
import { createCard, deleteCard, toggleLike } from '../scripts/card'
import { showModal, closeModal } from '../scripts/modal';

/*          Список карточек         */
const placesList = document.querySelector('.places__list');

/*          Получение всех попапов         */
const popups = document.querySelectorAll('.popup');

/*          Кнопки-события           */
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');

/*          Получение каждого попапа         */
const popupEdit = document.querySelector('.popup_type_edit');
const popupOpenImage = document.querySelector('.popup_type_image');
const popupAddCard = document.querySelector('.popup_type_new-card');

/*          Инпуты для попапа изображения         */
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

/*         Данные для попапа профиля         */
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

/*          Инпуты для попапа профиля         */
const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileDescription = document.querySelector('.popup__input_type_description');

/*          Инпуты создания карточки            */
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');

/*          Формы         */
const editProfileForm = document.querySelector('.popup__form_edit_profile');
const addCardForm = document.querySelector('.popup__form_add_card');

/*          Получение-передача данных в попап           */
const insertUserData = () => {
    inputProfileName.value = profileName.innerHTML;
    inputProfileDescription.value = profileDescription.innerHTML;
};

const insertImageData = (evt) => {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
};

/*          Хэндлеры кнопок-событий          */
const editPopupHandler = () => {
    insertUserData();
    showModal(popupEdit);
};

const addCardPopupHandler = () => {
    showModal(popupAddCard);
};

/*          Хэндлер картинки          */
const imagePopupHandler = evt => {
    insertImageData(evt);
    showModal(popupOpenImage);
};

/*          Добавление класса для всех попапов          */
popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
});

/*          Вывод карточки в DOM узел           */
const renderCard = (cardElement) => {
    placesList.append(cardElement);
};

/*          Вывод карточки на страницу          */
initialCards.forEach(initialCard => {
    renderCard(createCard(initialCard, deleteCard, toggleLike, imagePopupHandler));
});

popupEditButton.addEventListener('click', editPopupHandler);
popupAddButton.addEventListener('click', addCardPopupHandler);

/*          Хэндлеры сабмитов          */
const submitEditProfileForm = evt => {
    evt.preventDefault();
    profileName.textContent = inputProfileName.value;
    profileDescription.textContent = inputProfileDescription.value;
    closeModal(document.querySelector('.popup_is-opened'));
}

const submitAddCardForm = evt => {
    evt.preventDefault();
    const newCard = {
        name: cardName.value,
        link: cardLink.value,
    };
    placesList.prepend(createCard(newCard, deleteCard, toggleLike, imagePopupHandler));
    closeModal(document.querySelector('.popup_is-opened'));
};

editProfileForm.addEventListener('submit', submitEditProfileForm);
addCardForm.addEventListener('submit', submitAddCardForm);
