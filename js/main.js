

const state = {
  isValid: false,
  isSubmited: false
}

let userObj = {
  avatar: undefined,
  name: undefined,
  emailAddress: undefined,
  username: undefined
};

let emailRegex =  /^([a-z\d\.\-a-z]+)@([a-z]+)([\.a-z]{2,8})([\.a-z]{2,8})?$/;
let nameRegex = /^[a-zA-Z]{3,}$/;
const githubRegex = /^(?!-)[a-zA-Z\d-@]{1,39}(?<!-)$/;


const avatarFile = document.querySelector("#avatar");
const submitBtn = document.querySelector("#generate-ticket");
const imgHolder = document.querySelector(".upload-icon")
const imgName = imgHolder.nextElementSibling;


console.log(avatarFile, submitBtn, imgName);


function renderTicket() {
  if (state.isValid === true && state.isSubmited === true) {
    
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
}



// form validation
avatarFile.addEventListener("change", function (event) {
    const file = event.target.files[0]; // Get the file
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            userObj.avatar = e.target.result;
            imgHolder.src = e.target.result; // Display the image
            imgName.innerText = file.name;
        };
        reader.readAsDataURL(file); // Convert file to data URL
    } else {
        imgHolder.src = "../assets/images/icon-upload.svg"; // Reset to default
    }
});


submitBtn.addEventListener("click", function(e) {
  console.log(e);
  console.log(userObj);
  console.log(state);
  const fullName = document.getElementById('full-name');
  const emailAddress = document.getElementById('email-address');
  const githubUsername = document.getElementById('github-username');
  
  // throwing error if there's empty field
  if (fullName.value == '' || emailAddress.value == '' || githubUsername.value == '') {
    alert('Error: \nPlz fill in the details !!');
  } else if ( !emailRegex.test(emailAddress.value)) {
    alert("Plz enter a valid email!");
  } else if (!githubRegex.test(githubUsername.value)) {
    alert('Plz enter a valid username');
  } else {
    userObj.name = fullName.value;
    userObj.emailAddress = emailAddress.value;
    userObj.username = githubUsername.value;
    
    alert(userObj.avatar)
    alert(userObj.name)
    alert(userObj.emailAddress)
    alert(userObj.username)
    state.isSubmited = true;
    state.isValid = true;
    renderTicket();
    alert('Successfully, Submited');
  }
});