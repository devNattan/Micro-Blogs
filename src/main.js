import './style.css';

import {
  fillUsersSelect,
  fillPosts,
  fillFeaturedPostComments,
  clearPageData,
  fillErrorMessage,
} from '../utils/updateUI';

const usersSelect = document.querySelector('#users-select');

const USERS_API = 'https://dummyjson.com/users';

fetch(USERS_API)
  .then((response) => response.json())
  .then((data) => {
    const { users } = data;
    fillUsersSelect(users);
});

usersSelect.addEventListener('change', (e) => {
  clearPageData();

  const POSTS_API = `https://dummyjson.com/posts/user/${e.target.value}`;
  fetch(POSTS_API)
    .then((response) => response.json())
    .then((data) => {
        const  { posts }   = data;
        console.log(posts);
        fillPosts(posts);
        const COMMENTS_API = `https://dummyjson.com/posts/${posts[0].id}/comments`;
        return fetch(COMMENTS_API);
    })
    .then((res) => res.json())
    .then((data) => {
      const  { comments } = data;
      fillFeaturedPostComments(comments)
    })
    .catch((error) => {
        fillErrorMessage('Erro ao recuperar informações');
        console.log(error.message);
    });
});