import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import './css/style.css';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelectRef = document.querySelector('.breed-select');
const catInfoBoxRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');

errorRef.classList.add('hidden');

fetchBreeds()
  .then(breeds => {
    loaderRef.classList.add('hidden');
    breedSelectRef.classList.remove('hidden');

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelectRef.appendChild(option);
    });
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(err => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

breedSelectRef.addEventListener('change', onBreedSelectChange);

function onBreedSelectChange() {
  const breedId = breedSelectRef.value;

  loaderRef.classList.remove('hidden');
  catInfoBoxRef.classList.add('hidden');

  fetchCatByBreed(breedId)
    .then(displayCatInfo)
    .catch(err => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function displayCatInfo(cat) {
  const { name, origin, description, temperament } = cat.breeds[0];
  loaderRef.classList.add('hidden');
  catInfoBoxRef.classList.remove('hidden');

  catInfoBoxRef.innerHTML = `
    <img src="${cat.url}" alt="Cat Image" width="300" ;class="cat-image">
    <div class="cat-container-info">
      <h2 class="cat-name">Name: ${name}</h2>
      <h3 class="country">From: ${origin}</h3>
      <p class="cat-description">Description: ${description}</p>
      <p class="cat-temperament">Temperament: ${temperament}</p>
    </div>
  `;
}
