import { checkResponse } from "./utils/response"

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
    headers: {
        authorization: 'a5ae7f32-c824-4254-9b81-95bd8de42f0d',
        'Content-Type': 'application/json'
    }
}


const request = (endpoint, options) => {
    return fetch(config.baseUrl + endpoint, options)
        .then(checkResponse)
};

/*          Данные юзера            */
const getUserData = () => {
    return request('/users/me', { headers: config.headers })
};

const updateUserData = (profileName, profileDescription) => {
    return request('/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileName,
            about: profileDescription
        })
    })
};

/*          Карточки сайта            */
const getInitialCards = () => {
    return request('/cards', { headers: config.headers })
};

const addNewCardData = newCard => {
    return request('/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link
        })
    })
};

const putLikeData = cardId => {
    return request('/cards/likes/' + cardId, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(getInitialCards)
};

const removeLikeData = cardId => {
    return request(`/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(getInitialCards)
};

const deleteCardData = cardId => {
    return request(`/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
};

const changeAvatarData = inputChangeAvatar => {
    return request('/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: inputChangeAvatar
        })
    })
};

export { getUserData, updateUserData, getInitialCards, addNewCardData, putLikeData, removeLikeData, deleteCardData, changeAvatarData };