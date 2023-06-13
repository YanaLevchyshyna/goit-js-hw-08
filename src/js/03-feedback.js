import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const LS_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

let formData = JSON.parse(localStorage.getItem(LS_KEY)) || {};
const { email, message } = formEl.elements;
populateFormInput();

function onFormInput() {
  formData = {
    email: email.value,
    message: message.value,
  };

  localStorage.setItem(LS_KEY, JSON.stringify(formData));
}

function populateFormInput() {
  if (formData) {
    email.value = formData.email || '';
    message.value = formData.message || '';
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(LS_KEY);
}
