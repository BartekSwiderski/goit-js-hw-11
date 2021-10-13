import Notiflix from "../node_modules/notiflix";
const basicLightbox = require('basiclightbox')
const axios = require('axios').default;
const qs = (selector) => document.querySelector(selector);
let page = 2
let markup = ""
let addres =""
const searchBox = qs("#search-form");
const galleryGrid = qs(".gallery");
const moreBtn = qs("#load")
async function fetchImage(searchValue) {
  const imageList = await axios.get(`https://pixabay.com/api/?key=23744712-142a310b592b893afddd0f0d4&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`);
  let ig = imageList.request.responseURL
  addres += ig
  let totalHits = imageList.data.totalHits
  let arr1= [imageList.data.hits];
  let arr = [...arr1[0]]
  if(arr.length==0){Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)}
  if(arr.length>0){Notiflix.Notify.success(`We found ${totalHits} images.`)}
  return  arr;
}
function renderUserListItems(arr) {
  arr.forEach(
    (im) => markup +=`<div class="gallery__item" >
    <a  href="${im.largeImageURL}">
    <img class="gallery__image" src="${im.webformatURL}" data-source="${im.largeImageURL}" alt="${im.tags}" loading="lazy" />
      </a><div class="info">
        <div class="info-item">
        <b>Likes</b>
        <p>${im.likes}</p>
        </div>
        <div class="info-item">
        <b>Views</b>
        <p>${im.views}</p>
        </div>
        <div class="info-item">
        <b>Comments</b>
        <p>${im.comments}</p>
        </div>
        <div class="info-item">
        <b>Downloads</b>
        <p>${im.downloads}</p>
      </div></div></div>`
      )
      galleryGrid.innerHTML = markup;
}
searchBox.addEventListener("input", ()=>{
  while(galleryGrid.firstChild){galleryGrid.firstChild.remove()}
  moreBtn.classList.add("is-hidden")})
searchBox.addEventListener("submit", async(event)=> {
markup=""
page =2;
event.preventDefault();
let searchValue = event.currentTarget.elements.searchQuery.value
let arr = await fetchImage(searchValue)
renderUserListItems(arr)
moreBtn.classList.remove("is-hidden")
})
async function fetchNextImage(searchValue) {
  try {const imageList = await axios.get(`${addres}&page=${page}`);
  let arr1= [imageList.data.hits];
  let arr = [...arr1[0]];
  if(arr.length==0){Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`)}
  return  arr;
}
catch(error){console.log(error.status)}}; 
moreBtn.addEventListener("click", async() => {
  let arr = await fetchNextImage()
  if(page==14){Notiflix.Notify.failure(`We're sorry, but you've viewed all 500 photos`)}
  renderUserListItems(arr);
  page += 1;
  console.log(page)
});
function instance(event){
  event.preventDefault();
  const imageSource = event.target.dataset.source
  let moddal = basicLightbox.create(`
  <img src="${imageSource}"/>
  `);
  moddal.show();
  document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
          moddal.close()
      }
    })
  }
  galleryGrid.addEventListener("click", instance);