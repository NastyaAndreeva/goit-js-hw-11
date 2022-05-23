import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/'
});

const params = {
  key: "27223779-0e7ff1f3c9e6aed100241b5fd",
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

