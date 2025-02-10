/*          Темплейт карточки            */
const cardTemplate = document.querySelector('#card-template').content;

/*          Получение темплейта         */
const getCardTemplate = () => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
};

/*          Функция создания карточки           */
const createCard = (initialCard, deleteCard, toggleLike, imagePopupHandler) => {
    /* клонируем для одной карточки */
    const cardElement = getCardTemplate();

    /* получаем доступ к элементам карточки */
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    /* выводим данные с массива данных */
    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    cardTitle.textContent = initialCard.name;

    /* обработчики события по клику */
    cardDeleteButton.addEventListener('click', deleteCard);
    cardLikeButton.addEventListener('click', toggleLike);
    cardImage.addEventListener('click', imagePopupHandler);

    return cardElement;
};

/*          Хэндлер кнопки лайка          */
const toggleLike = evt => {
    evt.target.classList.toggle('card__like-button_is-active');
};

/*          Хэндлер кнопки удаления          */
const deleteCard = evt => {
    /* обращаемся к родителю текущей кнопки */
    evt.target.closest('.card').remove();
};

export { createCard, deleteCard, toggleLike };