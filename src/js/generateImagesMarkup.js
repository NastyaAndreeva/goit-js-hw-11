import imgTpl from '../templates/card';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import refs from "./refs";

export default function generateImagesMarkup(images){
    refs.gallery.insertAdjacentHTML('beforeend', imgTpl(images));

    var lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh ();
  };