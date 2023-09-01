import axios from 'axios';

const URL = 'https://books-backend.p.goit.global/books/category';
const booksEl = document.querySelector('.book-list-container');
const categoryEl = document.querySelector('h1.category-name');
const tmpMenu = document.querySelector('body');

tmpMenu.addEventListener('click', event => {
  const cat = event.target.dataset.category;
  if (!cat) {
    return;
  }
  let lastIndex = cat.lastIndexOf(' ');

  let str1 = cat.substring(0, lastIndex);
  let str2 = cat.substring(lastIndex);
  categoryEl.innerHTML = `${str1} <span class="category-name-accent">${str2}</span>`;
  fetchBooksByCategory(event.target.dataset.category).then(el => {
    const elements = createBookList(el);
    booksEl.innerHTML = elements;
  });
});

function createBookList(dataList) {
  let li = dataList
    .map(book => {
      return `<div class="photo-card">
      <li class="book-content" data-id="">
        <a href=${book.book_image} class='book-link link'>
        <div class="book-img-wrapper">
            <img src="${book.book_image}" alt="${book.description}" loading="lazy" class="gallery__img" width="180"/>
        </div>
        <div class="book-wrapper">
          <h2 class="book-name">${book.title}</h2>
          <p class="book-author">${book.author}</p>
        </div>
        </a>
      </li>
    </div>`;
    })
    .join('');
  return ' <ul class="book-list list">' + li + '</ul>';
}
export async function fetchBooksByCategory(category) {
  try {
    const response = await axios.get(URL, {
      params: {
        category: category,
      },
    });
    const dataPromise = response.data;
    return dataPromise;
  } catch (err) {
    console.log('FETCH ERROR: ' + err);
  }
}
