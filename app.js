//* input by the user 

let originalLink = "";
const urlInput = document.getElementById("urlInput");
urlInput.addEventListener("change", (event) => {
  originalLink = event.target.value;
});

//! function to check if url is valid or not

function isValidURL(url) {
  var RegExp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  if (RegExp.test(url)) {
    return true;
  } else {
    return false;
  }
}

//* Fetching data from api and outputting it...

const output = document.getElementById("output");
const shorten = document.getElementById("shorten_url");
shorten.addEventListener("click", () => {
  if (isValidURL(originalLink)) {
    urlInput.value = "";
    const shorten_url = async () => {
      let URL = `https://api.shrtco.de/v2/shorten?url=${originalLink}`;
      try {
        const response = await fetch(URL);
        const data = await response.json();

        let toAdd = `
            <div class="output">
                <p class="original_link">${originalLink}</p>
                <p class="short_link">${data.result["short_link"]}</p>
                <button class="copy" id=copybtn${parseInt(Math.random() * 100)} onclick="copy(this)">copy</button>
                <button class="delete" id = delbtn${parseInt( Math.random() * 100)} onClick ="deleteFunc(this)"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            `;
        output.insertAdjacentHTML("beforeend", toAdd);
      } catch (err) {
        console.log(err);
      }
    };

    shorten_url();
  } else {
    alert("Enter a valid Url");
    urlInput.value = "";
  }
});

//* function for copying shorten url

const copy = (e) => {
  const copybtn = document.getElementById(e.id);
  let txt = e.innerText;
  e.innerText = txt === "copy" ? "copied" : "copy";
  const shortlink = copybtn.previousElementSibling;
  const value = shortlink.textContent;
  navigator.clipboard.writeText(value);
};

//* delete func

const deleteFunc = (e) => {
  const delButton = document.getElementById(e.id);
  delButton.parentElement.remove();
};

//* hamburger toggle func
const toggle = () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('show');
}
