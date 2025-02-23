// importing functions from another file
import {fileTypeCheck, fileSizeCheck, fileReader, validateUsername, validateEmail, validateGithub} from './formValidation.js'

// state of form validation
const state = {
  isValid: false,
  isSubmited: false
}

// storage of data from the user
let userObj = {
  avatar: undefined,
  name: undefined,
  emailAddress: undefined,
  username: undefined
};

// selecting form input element
const avatarInput = document.querySelector('#avatar');
const nameInput = document.querySelector('#full-name');
const emailInput = document.querySelector('#email-address');
const githubInput = document.querySelector('#github-username');

function renderTicket() {
    
  // selecting & creating dom element
  const bottomSec = document.querySelector(".bottom-sec");
  const ticketContainer = document.createElement("section");
  const headerTitle = document.querySelector(".heading-title");
  const descrption = headerTitle.nextElementSibling;
  
  headerTitle.innerHTML = '';
  descrption.innerText = '';
  headerTitle.innerHTML += `Congrats, <span>${userObj.name}!</span> Your ticket is ready.`;
  descrption.innerText += `We've emailed your ticket to your Email Address  and will send updates in the run up to the event.`;

  
  bottomSec.remove();
  
  ticketContainer.innerHTML += `
    <section class="ticket-info">
      <section class="ticket-upLayer">
        <img id="ticket-logo" src="../assets/images/logo-mark.svg" alt="logo">
        <section class="date-container">
          <h3>Coding Conf</h3>
          <span> Jan 31, 2025 / Austin, TX </span>
        </section>
      </section>
      <section class="ticket-btmLayer">
        <section class="user-info">
          <img id="user-img" src="${userObj.avatar}" alt="avatar">
          <section class="user-detail">
            <h5>${userObj.name}</h5>
            <span>
              <img src="../assets/images/icon-github.svg" alt="github-icon" id="github-icon">
              <span class="">${userObj.username}</span>
            </span>
          </section>
        </section>
      </section>
    </section>
  `;
  document.querySelector(".bottom-layer").appendChild(ticketContainer);
}

function callback(arg) {
  if (arg.error) {
    alert(arg.error);
  } else if (arg.data) {
    const imgHolder = document.querySelector(".upload-icon");
    const imgName = imgHolder.nextElementSibling;
    
    userObj.avatar = arg.data;
    
    imgHolder.src = userObj.avatar;
    imgName.innerText = arg.fileName;
    
  }
}

// adding event listener to file input elem
fileReader(avatarInput, ['image/jpg', 'image/png', 'image/jpeg'], 577536, callback); // arguments: 1. HTML element(input: type→file), 2. an array of allowed file type, 3. file size in bytes, 4. a callback function to handle the send by fileReader

// selecting and adding event listener to form element
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // preventing default submission
  
  // validating the user input by calling the function with passing the html elem as an argument
  const NAME = validateUsername(nameInput);
  const EMAIL = validateEmail(emailInput);
  const GITHUB = validateGithub(githubInput);
  
  // updating  storage info based on the response
  if  (NAME.data) {
    userObj.name = NAME.data;
  } else if (NAME.error) {
    alert(NAME.error);
  }
  
  if (EMAIL.data) {
    userObj.emailAddress = EMAIL.data;
    
  } else if (EMAIL.error) {
    alert(EMAIL.error);
    
  }
  
  if (GITHUB.data) {
    userObj.username = GITHUB.data
  } else if (GITHUB.error) {
    alert(GITHUB.error);
  }
  
  
  if (userObj.name != undefined && userObj.emailAddress != undefined && userObj.avatar != undefined && userObj.username != undefined) {
    renderTicket();
  }
})