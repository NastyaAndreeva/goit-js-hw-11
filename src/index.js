import './css/styles.css';
import API from "./js/getImages";
import Notiflix from 'notiflix';
import generateImagesMarkup from "./js/generateImagesMarkup";
import refs from "./js/refs";

async function getAllImages() {
  try {
    const result = await API.getImages();
    const images = result.data.hits;
    generateImagesMarkup(images);

    Notiflix.Notify.success(`Hooray! We found ${result.data.total} images.`);
  } catch (error) {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  }
  
}

function onSearchInput(event){
  API.params.page = 1;
  API.params.q = event.target.value;
}

function onFormSubmit(event) {
  refs.gallery.innerHTML = "";
  event.preventDefault();
  getAllImages();

}

function onGalleryScroll() {
  if (refs.gallery.scrollTop + refs.gallery.clientHeight >= refs.gallery.scrollHeight) {
    loadMore();
  }
}

function loadMore(){
  API.params.page += 1;
  getAllImages();
}

refs.searchInput.addEventListener("input", onSearchInput);

refs.searchForm.addEventListener("submit", onFormSubmit);

refs.gallery.addEventListener('scroll', onGalleryScroll);
