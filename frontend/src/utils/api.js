class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    updateUserData({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
            })
        })
            .then(this._checkResponse);
    }

    updateAvatar({ avatar }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatar}`
            })
        })
            .then(this._checkResponse);
    }

    postCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`
            })
        })
            .then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    unlikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    changeLikeCardStatus(cardId, isLiked) {
        if(isLiked) {
            return this.likeCard(cardId);
        } else {
            return this.unlikeCard(cardId);
        }
    }
}

const api = new Api({
  baseUrl: 'https://api.mesto-krasivoe.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api
