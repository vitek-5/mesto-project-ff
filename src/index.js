import '../pages/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from '../scripts/cards';
import { renderCard, createCard, deleteCard, LikeToggle } from '../scripts/card'
import { showModal, popupEditInsert, popupImageInsert } from '../scripts/modal';
import { formElement1, formElement2, handleFormSubmit } from '../scripts/forms';
/*          Модальные окна           */
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupOpenImage = document.querySelector('.popup_type_image');
const popupAddCard = document.querySelector('.popup_type_new-card');

/*          Формы           */
formElement1.addEventListener('submit', handleFormSubmit);
formElement2.addEventListener('submit', handleFormSubmit)


// @todo: Вывести карточки на страницу
initialCards.forEach(initialCard => {
    renderCard(createCard(initialCard, deleteCard, LikeToggle));
})


document.addEventListener('click', evt => {
    if (evt.target === popupEditButton) {
        popupEditInsert();
        showModal(popupEdit);
    }

    if (evt.target === popupAddButton) {
        showModal(popupAddCard);
    }

    if (evt.target.classList.contains('card__image')) {
        popupImageInsert(evt);
        showModal(popupOpenImage);
    }
})

