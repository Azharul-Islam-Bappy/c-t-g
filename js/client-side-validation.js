
import {userObj, isSubmited, isValid} from './dom.js';



let emailRegex =  /^([a-z\d\.\-a-z]+)@([a-z]+)([\.a-z]{2,8})([\.a-z]{2,8})?$/;
let nameRegex = /^[a-zA-Z]{3,}$/;
const githubRegex = /^(?!-)[a-zA-Z\d-]{1,39}(?<!-)$/;


const avatarFile = document.getElementById('avatar');
const submitBtn = document.getElementById('generate-ticket');


avatarFile.addEventListener("change", () => {
  
  // checking if there's a file inputted
  if (!this.files || this.files.length === 0) {
    alert('Msg: Plz select a image');
    isValid = false;
  }
  
  const file = this.files[0];
  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  
  if (!allowedExtensions.exec(file)) {
    alert("Error: Invalid file extension!! \nOnly jpg, jpeg, png are allowed");
    this.value = '';
    isValid = false;
    return;
  } else if (file.size > 500 * 1024) {
    alert("Error: file size is larger than 500KB");
    this.value = '';
    isValid = false;
    return;
  } else {
    userObj.avatar = this.value;
  }
});

submitBtn.addEventListener("click", function(e) {
  const fullName = document.getElementById('full-name');
  const emailAddress = document.getElementById('email-address');
  const githubUsername = document.getElementById('github-username');
  
  // throwing error if there's empty field
  if (fullName.value == '' || emailAddress.value == '' || githubUsername.value == '') {
    alert('Error: \nPlz fill in the details !!');
    isValid = false;
  } else if (!nameRegex.test(fullName.value)) {
    // alert("Numbers aren't allowed in name!");
    // isValid = false;
  } else if (!emailRegex.test(emailAddress.value)) {
    alert("Plz enter a valid email!");
    isValid = false;
  } else if (!githubRegex.test(githubUsername.value)) {
    alert('Plz enter a valid username');
    isValid = false;
  } else {
    if (isValid) {
      userObj.fullName = fullName.value;
      userObj.emailAddress = emailAddress.value;
      userObj.username = githubUsername.value;
      
      alert('Successfully, Submited');
      isSubmited = true;
      renderTicket();
    }
  }
});