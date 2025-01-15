// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = initialCard => {
    /* клонируем для одной карточки */
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardDescription = cardElement.querySelector('.card__description');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardDescription.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card_like-button');

    /* выводим данные с массива данных */
    cardImage.src = initialCard.link;
    cardTitle.textContent = initialCard.name;

    /* обработчик события по клику */
    cardDeleteButton.addEventListener('click', deleteCard);

    return cardElement;
};

// @todo: Функция удаления карточки
const deleteCard = (evt) => {
    /* обращаемся к элементу текущей кнопке */
    const eventTarget = evt.target;
    eventTarget.parentElement.remove();
}

/* выводим карточку в DOM узел */
const renderCard = (placesList, cardElement) => {
    placesList.append(cardElement);
}


// @todo: Вывести карточки на страницу
initialCards.forEach(initialCard => {
    renderCard(placesList, createCard(initialCard))
});