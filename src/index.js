import './css/styles.css';
import API from "./js/getImages";
import Notiflix from 'notiflix';
import generateImagesMarkup from "./js/generateImagesMarkup";
import refs from "./js/refs";

async function generateMarkupUI() {
  try {
    const result = await API.getImages();
    const images = result.data.hits;
    generateImagesMarkup(images);
    
  } catch (error) {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  }
  
}

function totalHitsNofitication(total){
  if (total) {
    Notiflix.Notify.success(`Hooray! We found ${total} images.`);
  }
  
}

function onSearchInput(event){
  API.params.page = 1;
  API.params.q = event.target.value;
}

function onFormSubmit(event) {
  refs.gallery.innerHTML = "";
  event.preventDefault();
  generateMarkupUI();
  API.getImages().then(({data}) => totalHitsNofitication(data.total))
}

function onObserver(entries) {
  entries.forEach(entry => {
    if (entry.intersectionRatio && API.params.q !== "") {
      loadMore();
    }
  })
}

function loadMore(){
  API.params.page += 1;
  generateMarkupUI();
}

const options = {
  rootMargin: "400px",
};

const observer = new IntersectionObserver(onObserver, options);
observer.observe(refs.sentinel);

refs.searchInput.addEventListener("input", onSearchInput);

refs.searchForm.addEventListener("submit", onFormSubmit);

