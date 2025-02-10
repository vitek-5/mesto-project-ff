// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (initialCard, deleteCard, LikeToggle) => {
    /* клонируем для одной карточки */
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    /* получаем доступ к элементам карточки */
    const cardDescription = cardElement.querySelector('.card__description');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardDescription.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    /* выводим данные с массива данных */
    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    cardTitle.textContent = initialCard.name;

    /* обработчик события по клику */
    cardDeleteButton.addEventListener('click', deleteCard);
    cardLikeButton.addEventListener('click', LikeToggle);

    return cardElement;
};

const LikeToggle = evt => {
    evt.target.classList.toggle('card__like-button_is-active');
};


// @todo: Функция удаления карточки
const deleteCard = evt => {
    /* обращаемся к родителю текущей кнопки */
    evt.target.closest('.card').remove();
}

/* выводим карточку в DOM узел */
const renderCard = (cardElement) => {
    placesList.append(cardElement);
}

export {renderCard, createCard, deleteCard, LikeToggle}