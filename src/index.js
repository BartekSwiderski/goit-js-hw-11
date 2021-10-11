import Notiflix from "../node_modules/notiflix";
import __defoult from '../node_modules/simplelightbox/dist/simple-lightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const axios = require('axios').default;

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);
const page = 1
let markup = ""
const searchBox = qs("#search-form");
const galleryGrid = qs(".gallery");

async function fetchImage(searchValue) {
  const imageList = await axios.get(`https://pixabay.com/api/?key=23744712-142a310b592b893afddd0f0d4&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`);
  let arr1= [imageList.data.hits];
  let arr = [...arr1[0]]
  return arr;
  
}

function renderUserListItems(arr) {
  arr.forEach(
    (im) => markup +=`
    <a  href="${im.largeImageURL}">
    <img class="gallery__image" src="${im.webformatURL}" alt="${im.tags}" loading="lazy" />
    </a>
      `
      )
  
      galleryGrid.innerHTML = markup;
}


searchBox.addEventListener("submit", async(event)=> {
markup=""
event.preventDefault();
let searchValue = event.currentTarget.elements.searchQuery.value
let arr = await fetchImage(searchValue)
console.log(arr)
renderUserListItems(arr)

})

let gallery = new SimpleLightbox('.gallery a',{captionsData:"alt", captionDelay:"250"});
gallery.on('show.simplelightbox', function () {
	preventDefault()
});
galleryGrid.addEventListener("click", preventDefault())