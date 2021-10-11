import Notiflix from "../node_modules/notiflix";
const axios = require('axios').default;

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);

const serchBox = qs("#search-form");
const search = qs("#search");
let searchValue = "";

const search = (event) => {

  event.preventDefault();
  searchValue = event.currentTarget.elements.searchQuery.value
  return searchValue

}
const fetchImage = async (event) => {

  event.preventDefault();
  searchValue = event.currentTarget.elements.searchQuery.value
  const imageList = await axios.get(`https://pixabay.com/api/?key=23744712-142a310b592b893afddd0f0d4&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`);
  let arr1= [imageList.data.hits];
  let arr = [...arr1[0]]
  return arr
}


function renderUserListItems(arr) {
  const markup = users
    .map(
      (user) => `<ul class="item">
        <p><b>Name</b>: ${user.name}</p>
        <p><b>Email</b>: ${user.email}</p>
        <p><b>Company</b>: ${user.company.name}</p>
      </ul>`
    )
    .join("");
  userList.innerHTML = markup;
}

serchBox.addEventListener("submit", async()=>{
 const zmi1 = await fetchImage
  console.log(zmi1)
})


