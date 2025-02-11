
export let isValid = true;
export let isSubmited = false;
export const userObj = {
  avatar: undefined,
  fullname: undefined,
  emailAddress: undefined,
  username: undefined
};


function renderTicket() {
  if (isValid && isSubmited) {
    
    // selecting dom element
    
    const topSection = document.querySelector('.top-sec');
    const bottomSection = document.querySelector('.bottom-sec');
    
    topSection.innerHTML = '';
    bottomSection.innerHTML = '';
    
    topSection.innerHTML = `
     <span class="logo-container">
        <img class="logo" src="assets/images/logo-mark.svg" alt="logo icon" />
        <h6>Coding Conf</h6>
      </span>
      <h3 class="heading-title">Congrats, <span>${userObj.fullname}!</span> Your ticket is ready.</h3>
      <p>We've emailed your ticket to your Email Address  and will send updates in the run up to the event.</p>`;
      
    bottomSection.innerHTML = `
      <section class="">
        <section class="">
          <img src="" alt="logo">
          <section class="">
            <h3>Coding Conf</h3>
            <span> Jan 31, 2025 / Austin, TX </span>
          </section>
        </section>
        <section class="">
          <section class="">
          <img src="${userObj.avatar}" alt="avatar">
          <section class="">
            <h5>${userObj.fullname}</h5>
            <span>
              <img src="../assets/images/icon-github.svg" alt="github-icon" id="github-icon">
              <span class="">${userObj.username}</span>
            </span>
          </section>
        </section>
        </section>
      </section>
    `;
  }
}

