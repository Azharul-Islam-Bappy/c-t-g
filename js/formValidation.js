
// exporting functionalities
export {fileTypeCheck, fileSizeCheck, fileReader, validateUsername, validateEmail, validateGithub}

// form validator functionalities

function fileTypeCheck(file, allowedType) {
  if (!Array.isArray(allowedType)) {
    throw new Error('allowedType must be array');
  }
  
  if (!allowedType.includes(file.type)) return `file must be of ${allowedType.join(', ')} type`;
  
  return true;
}

function fileSizeCheck(file, maxSize) {
  if  (file.size > maxSize) return `file size crossed ${maxSize/1024}KB limits!`; // size should be in bytes
  
  return true;
}

function fileReader(elem, allowedType, maxSize, callback) {
  elem.addEventListener("change", (e) => {

    const file = e.target.files[0]; // selecting the file
    
    if (!file) {
      callback({error: 'No file selected!'});
      return;
    }
    
    const sizeCheck = fileSizeCheck(file, maxSize); // size should be in bytes
    
    const typeCheck = fileTypeCheck(file, allowedType);
    
    if (typeCheck !== true) {
      callback({error: typeCheck});
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      callback({data: e.target.result, fileName: file.name});
      return;
    }
    reader.readAsDataURL(file);
  });
}


// validation for username
function validateUsername(elem) {
  const value = elem.value.trim();
  
  if (value !== '' && value.length < 3 ) return {error: 'Name must be 3 characters long'};
  
  if (value !== '' && value.length > 40) return {error: 'Name must be less than 40 characters'};
  
  return {data: value};
}

// validation for email address
function validateEmail(elem) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const value = elem.value.trim();
  
  if (value !== '' && emailRegex.test(elem.value)) {
    elem.value = '';
    elem.placeholder = 'Enter email';
    return {data: value};
  } else {
    elem.value = '';
    elem.placeholder = 'Enter email';
    return {error: 'Invalid email!!'};
  }
}

function validateGithub(elem) {
  const githubRegex = /^(?!-)[a-zA-Z\d-@]{1,39}(?<!-)$/;
  
  if (!githubRegex.test(elem.value.trim()))  return {error: 'please enter a valid username :('};
  
  return  {data: elem.value.trim()};
}