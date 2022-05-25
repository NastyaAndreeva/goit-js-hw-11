import './css/styles.css';
import API from "./js/getImages";
import Notiflix from 'notiflix';
import generateImagesMarkup from "./js/generateImagesMarkup";
import refs from "./js/refs";
import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";
import preloader from "./templates/preloader"

let lightbox = null;

async function generateMarkupUI() {
    const result = await API.getImages();
    const images = result?.data?.hits;
    generateImagesMarkup(images);
    lightbox = new SimpleLightbox('.gallery a');
}

function totalHitsNofitication(total){
  if (total) {
    Notiflix.Notify.success(`Hooray! We found ${total} images.`);
  }
}

function onFormSubmit(event) {
  API.params.page = 1;
  API.params.q = event.currentTarget.elements.searchQuery.value;
  refs.gallery.innerHTML = "";
  event.preventDefault();
  generateMarkupUI();
  API.getImages().then(({data} = {}) => {
    if (data.total === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }
    totalHitsNofitication(data?.total)});
}

function onObserver(entries) {
  entries.forEach(entry => {
    if (entry.intersectionRatio && API.params.q !== "") {
      loadMore();
    }
  })
}

async function loadMore(){
    lightbox.refresh();
    refs.preloader.innerHTML = preloader();
    API.params.page += 1;
    setTimeout(()=>{
      generateMarkupUI()}, 1000 );
  
}

const options = {
  rootMargin: "400px",
};

const observer = new IntersectionObserver(onObserver, options);
observer.observe(refs.sentinel);

const showOnPx = 100;

function scrollContainer(){
  return document.documentElement || document.body;
};

function goToTop (){
  document.body.scrollIntoView({
    behavior: "smooth"
  });
};

function onScroll() {
  if (scrollContainer().scrollTop > showOnPx) {
    refs.backToTopButton.classList.remove("hidden");
  } else {
    refs.backToTopButton.classList.add("hidden");
  }
}

refs.searchForm.addEventListener("submit", onFormSubmit);

document.addEventListener("scroll", onScroll);

refs.backToTopButton.addEventListener("click", goToTop);

