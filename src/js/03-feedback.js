import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const LS_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

let formData = {};
const { email, message } = formEl.elements;

function onFormInput(e) {
  formData = {
    email: email.value,
    message: message.value,
  };

  localStorage.setItem(LS_KEY, JSON.stringify(formData));
}

function populateFormInput() {
  const savedInputForm = JSON.parse(localStorage.getItem(LS_KEY));

  if (savedInputForm) {
    email.value = savedInputForm || '';
    message.value = savedInputForm || '';
  }
}
populateFormInput();

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(LS_KEY);
  console.log(formData);
}
