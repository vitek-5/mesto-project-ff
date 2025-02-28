/*          Темплейт карточки            */
const cardTemplate = document.querySelector('#card-template').content;

/*          Получение темплейта         */
const getCardTemplate = () => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
};

/*          Функция создания карточки           */
const createCard = ({ initialCard, toggleLike, imagePopupHandler, deleteCardPopupHandler, putLikeData, removeLikeData, getInitialCards, userId }) => {
    /* клонируем для одной карточки */
    const cardElement = getCardTemplate();

    /* получаем доступ к элементам карточки */
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeCounter = cardElement.querySelector('.like-counter')
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardId = initialCard._id;
    const cardOwnerId = initialCard.owner._id;

    const name = initialCard.name;
    const link = initialCard.link;
    const likes = initialCard.likes;
    /* выводим данные с массива данных */
    cardImage.alt = name;
    cardTitle.textContent = name;
    cardImage.src = link;
    cardLikeCounter.textContent = likes.length;

    /* обработчики события по клику */

    if (likes.length > 0) {
        likes.forEach(like => {
            if (like._id === userId) {
                cardLikeButton.classList.add('card__like-button_is-active');
            };
        });
    };


    if (userId === cardOwnerId) {
        cardDeleteButton.addEventListener('click', () => {
            deleteCardPopupHandler(cardId, cardElement);
        });
    } else {
        cardDeleteButton.remove();
    };
    cardLikeButton.addEventListener('click', evt => {
        if (cardLikeButton.classList.contains('card__like-button_is-active')) {
            removeLikeData(cardId)
                .then(data => {
                    data.forEach(initialCard => {
                        if (cardId === initialCard._id) {
                            cardLikeCounter.textContent = initialCard.likes.length;
                        };
                    })
                })
        } else {
            putLikeData(cardId)
                .then(data => {
                    data.forEach(initialCard => {
                        if (cardId === initialCard._id) {
                            cardLikeCounter.textContent = initialCard.likes.length;
                        };
                    })
                });
        }
        toggleLike(evt);
    });
    cardImage.addEventListener('click', imagePopupHandler);

    return cardElement;
};

/*          Хэндлер кнопки лайка          */
const toggleLike = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
};


export { createCard, toggleLike };