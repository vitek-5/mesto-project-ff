import '../pages/index.css';
import { createCard, toggleLike } from '../scripts/card'
import { showModal, closeModal } from '../scripts/modal';
import { enableValidation, clearValidation } from '../scripts/validation';
import { getUserData, updateUserData, getInitialCards, addNewCardData, putLikeData, removeLikeData, deleteCardData, changeAvatarData } from '../scripts/api'

/*          Список карточек         */
const placesList = document.querySelector('.places__list');

/*          Получение всех попапов         */
const popups = document.querySelectorAll('.popup');

/*          Получение открытого попапа          */
const getOpenedPopup = () => {
    const openedPopup = document.querySelector('.popup_is-opened');
    return openedPopup;
}

/*          Получение каждого попапа         */
const popupEdit = document.querySelector('.popup_type_edit');
const popupOpenImage = document.querySelector('.popup_type_image');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupDeleteCard = document.querySelector('.popup_type_delete-card');
const popupChangeAvatar = document.querySelector('.popup_type_change-avatar');

/*          Кнопки-события           */
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');

/*         Данные для попапа профиля         */
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

/*          Инпуты для попапа изображения         */
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

/*          Инпуты для попапа профиля         */
const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileDescription = document.querySelector('.popup__input_type_description');

/*          Инпуты создания карточки            */
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');

/*          Инпуты для попапа аватара           */
const inputChangeAvatar = document.querySelector('.popup__input_change_avatar');

/*          Оверлей аватарки           */
const overlay = document.querySelector('.profile__image_overlay');

/*          Формы         */
const editProfileForm = document.querySelector('.popup__form_edit_profile');
const addCardForm = document.querySelector('.popup__form_add_card');
const deleteCardForm = document.querySelector('.popup__form_delete_card');
const changeAvatarForm = document.querySelector('.popup__form_change_avatar');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'input-error_active'
};
/* ----------------------------------- */

/*          Для сохранения текущих значений при взаимодействии          */
let userId;
let cardId;
let cardElement;
const savingText = 'Сохранение...';
const savedText = 'Сохранить';


/*          Получение-передача данных в попап           */
const insertUserData = () => {
    inputProfileName.value = profileName.innerHTML;
    inputProfileDescription.value = profileDescription.innerHTML;
};
insertUserData();

const insertImageData = (evt) => {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
};
/* ----------------------------------- */

/*          Хэндлеры кнопок-событий          */
const editProfilePopupHandler = () => {
    clearValidation(editProfileForm, validationConfig);
    editProfileForm.reset();
    insertUserData();
    showModal(popupEdit);
};

const addCardPopupHandler = () => {
    addCardForm.reset();
    clearValidation(addCardForm, validationConfig);
    showModal(popupAddCard);
};

const deleteCardPopupHandler = (cardID, cardEl) => {
    showModal(popupDeleteCard);
    cardId = cardID;
    cardElement = cardEl;
};
/* ----------------------------------- */

/*          Хэндлер картинки          */
const imagePopupHandler = evt => {
    insertImageData(evt);
    showModal(popupOpenImage);
};

/*          Хэндлеры аватарки          */
const hoverImageHandler = () => {
    overlay.classList.add('profile__image_overlay-hovered');
};

const outImageHandler = () => {
    overlay.classList.remove('profile__image_overlay-hovered');
};

const changeImageHandler = () => {
    changeAvatarForm.reset();
    clearValidation(changeAvatarForm, validationConfig);
    showModal(popupChangeAvatar);
};
/* ----------------------------------- */

popupEditButton.addEventListener('click', editProfilePopupHandler);
popupAddButton.addEventListener('click', addCardPopupHandler);
profileImage.addEventListener('mouseover', hoverImageHandler);
profileImage.addEventListener('mouseout', outImageHandler);
profileImage.addEventListener('click', changeImageHandler);

/*          Лоадеры кнопок      */
const savingData = (evt, savingText) => {
    const submitButton = evt.target.querySelector('.popup__button');
    submitButton.textContent = savingText;
};

const savedData = (evt, savedText) => {
    const submitButton = evt.target.querySelector('.popup__button');
    submitButton.textContent = savedText;
};
/* ----------------------------------- */

/*          Хэндлеры сабмитов          */
const submitEditProfileForm = evt => {
    savingData(evt, savingText);
    evt.preventDefault();
    updateUserData(inputProfileName.value, inputProfileDescription.value)
        .then(data => {
            profileName.textContent = data.name;
            profileDescription.textContent = data.about;
        })
        .then(() => {
            closeModal(getOpenedPopup());
            savedData(evt, savedText);
        })
}

const submitDeleteCardForm = (evt, cardId, cardElement) => {
    const removingText = 'Удаление...';
    const removedText = 'Да';
    evt.preventDefault();
    savingData(evt, removingText);
    deleteCardData(cardId)
        .then(() => {
            cardElement.remove();
        })
        .then(() => {
            closeModal(getOpenedPopup());
            savedData(evt, removedText);
        })
};

const submitAddCardForm = evt => {
    const savingText = 'Сохранение...';
    const savedText = 'Сохранить';
    evt.preventDefault();
    savingData(evt, savingText);
    const newCard = {
        name: cardName.value,
        link: cardLink.value,
    };
    addNewCardData(newCard)
        .then(initialCard => {
            placesList.prepend(createCard({ initialCard, toggleLike, imagePopupHandler, deleteCardPopupHandler, putLikeData, removeLikeData, getInitialCards, userId }));
        })
        .then(() => {
            closeModal(getOpenedPopup());
            savedData(evt, savedText);
        })
};

const submitChangeAvatarForm = evt => {
    evt.preventDefault();
    savingData(evt, savingText);
    changeAvatarData(inputChangeAvatar.value)
        .then(data => {
            profileImage.style.backgroundImage = `url("${data.avatar}")`;
        })
        .then(() => {
            closeModal(getOpenedPopup());
            savedData(evt, savedText);
        })
};
/* ----------------------------------- */

editProfileForm.addEventListener('submit', submitEditProfileForm);
addCardForm.addEventListener('submit', submitAddCardForm);
deleteCardForm.addEventListener('submit', evt => {
    submitDeleteCardForm(evt, cardId, cardElement);
});
changeAvatarForm.addEventListener('submit', submitChangeAvatarForm);

/*          Включить валидацию          */
enableValidation(validationConfig);



/*          Добавление класса для всех попапов          */
popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
});

/*          Вывод карточки в DOM узел           */
const renderCard = (cardElement) => {
    placesList.append(cardElement);
};

/*          Рендеринг GET данных          */
const renderUserData = (userData) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url("${userData.avatar}")`;
};

const renderCardData = (initialCards, userId) => {
    /*          Вывод карточки на страницу          */
    initialCards.forEach(initialCard => {
        renderCard(createCard({ initialCard, toggleLike, imagePopupHandler, deleteCardPopupHandler, putLikeData, removeLikeData, getInitialCards, userId }));
    });
};
/* ----------------------------------- */


const getData = () => {
    Promise.all([getUserData(), getInitialCards()])
        .then(([userData, initialCards]) => {
            userId = userData._id;
            renderUserData(userData);
            renderCardData(initialCards, userId);
        })
};
getData();
