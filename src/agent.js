import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://api.life2film.com:8000/api';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const W_API_ROOT = 'http://52.30.47.67:6869';
const ASSET_ID = 'GU67LPeJmEfqP7CK3swA994jdhVTzKSKXFrFdSTV5Ck'

const wRequests = {
  del: url =>
    superagent.del(`${W_API_ROOT}${url}`).then(responseBody),
  get: url =>
    superagent.get(`${W_API_ROOT}${url}`).then(responseBody),
  put: (url, body) =>
    superagent.put(`${W_API_ROOT}${url}`, body).then(responseBody),
  post: (url, body) =>
    superagent.post(`${W_API_ROOT}${url}`, body).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Tags = {
  getAll: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = film => Object.assign({}, film, { slug: undefined })
const Films = {
  all: page =>
    requests.get(`/allfilms?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/films?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/films?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/films/${slug}`),
  favorite: slug =>
    requests.post(`/films/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/films?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/films/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/allfilms/${slug}`),
  unfavorite: slug =>
    requests.del(`/films/${slug}/favorite`),
  update: film =>
    requests.put(`/films/${film.slug}`, { film: omitSlug(film) }),
  create: film =>
    requests.post('/films', { film })
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/films/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/films/${slug}/comments/${commentId}`),
  forFilm: slug =>
    requests.get(`/films/${slug}/comments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

const Waves = {
  getBalance: (address) => wRequests.get('/assets/balance/' + address + '/' + ASSET_ID),
}

export default {
  Films,
  Auth,
  Comments,
  Profile,
  Tags,
  Waves,
  setToken: _token => { token = _token; }
};
