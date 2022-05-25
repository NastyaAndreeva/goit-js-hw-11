import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "27223779-0e7ff1f3c9e6aed100241b5fd";

const instance = axios.create({
  baseURL: BASE_URL,
});

// instance.defaults.headers.common['Authorization'] = API_KEY;

const params = {
  key: API_KEY,
  q: "",
  image_type: 'photo',
  orientation : 'horizontal',
  safesearch : true,
  per_page : 40,
  page : 1,
}

async function getImages() {
  try {
    return await instance.get(``, {params});
  } catch (error) {
    console.log(error);
  }  
}

export default {params, getImages}

