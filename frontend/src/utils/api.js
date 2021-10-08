class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkRequestResult(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkRequestResult)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkRequestResult)
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkRequestResult)
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
      .then(this._checkRequestResult)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: `DELETE`,
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkRequestResult)
  }

  updateUserData({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
      .then(this._checkRequestResult)
  }

  updateAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatar}`,
      }),
    })
      .then(this._checkRequestResult);
  }
}

const api = new Api({
  baseUrl: 'https://mesto-krasivoe.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api
