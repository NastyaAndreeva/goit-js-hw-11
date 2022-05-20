import Notiflix from 'notiflix';

const axios = require('axios').default;
const URL = "https://pixabay.com/api/";
const API_KEY = "27223779-0e7ff1f3c9e6aed100241b5fd";
const params = {
  q: "",
  image_type: 'photo',
  orientation : 'horizontal',
  safesearch : true,
  per_page : 40,
  page : 1,
}

async function getImages() {
  try {
    const response = await axios.get(`${URL}?key=${API_KEY}`, {params});
    if (response.data.hits === 0) {
      return;
    }
    return response;
  } catch (error) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
    
}

export default {params, getImages}

