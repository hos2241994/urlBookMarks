//Variables
const bookmarkName = document.getElementById("bookmarkName");
const bookmarkUrl = document.getElementById("bookmarkUrl");
const submitBtn = document.querySelector("button[type=submit]");
const overlayMsg = document.querySelector(".overlayMsg");
const form = document.querySelector("form");
const closeBtn = document.querySelector("#close");
const tableBody = document.querySelector("#tableBody");
const bookmarkArr = localStorage.getItem("bookmarks")
  ? JSON.parse(localStorage.getItem("bookmarks"))
  : [];
const bookmarkNameRegex = /^[a-zA-Z0-9]{3,}/;
const bookmarkUrlRegex =
  /^(www.)(\w{3,}\.\w{2,}(\.\w{2,})?)(\/[\w\-._~:\/?#[\]@!$&'()*+,;=%]*)?$/;

//Check Input Function

function checkInputs(event, reg) {
  const test = reg.test(event.target.value);
  if (test === true) {
    event.target.classList.remove("invalid");
    event.target.classList.add("valid");
  } else {
    event.target.classList.remove("valid");
    event.target.classList.add("invalid");
  }
}

function addToLocalStorage(name, arr) {
  localStorage.setItem(name, JSON.stringify(arr));
}

//Draw UI Table
function drawTable() {
  tableBody.innerHTML = "";
  for (let i = 0; i <= bookmarkArr.length - 1; i++) {
    tableBody.innerHTML += `
    <tr>
                <td>${i + 1}</td>
                <td>${bookmarkArr[i].websiteName}</td>
                <td>
                  
                    
                    <a class="visit" href="https://${
                      bookmarkArr[i].websiteURL
                    }" target="_blank"
                      ><i class="fa-solid fa-eye"></i>visit</a
                    >
                   
                </td>
                <td>
                  <button class="delete" onClick='deleteBookmark(${i})'>
                    <i class="fa-solid fa-trash-can"></i>
                    delete
                  </button>
                </td>
              </tr>
    `;
  }
}
drawTable();

function deleteBookmark(id) {
  console.log(bookmarkArr);

  bookmarkArr.splice(id, 1);
  console.log(bookmarkArr);
  addToLocalStorage("bookmarks", bookmarkArr);
  drawTable();
}

//Events
bookmarkName.addEventListener("input", function (e) {
  checkInputs(e, bookmarkNameRegex);
});

bookmarkUrl.addEventListener("input", function (e) {
  checkInputs(e, bookmarkUrlRegex);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    bookmarkName.classList.contains("valid") &&
    bookmarkUrl.classList.contains("valid")
  ) {
    const websiteDta = {
      websiteURL: bookmarkUrl.value,
      websiteName: bookmarkName.value,
    };

    bookmarkArr.push(websiteDta);
    addToLocalStorage("bookmarks", bookmarkArr);
    bookmarkUrl.value = "";
    bookmarkName.value = "";
    bookmarkName.classList.remove("valid");
    bookmarkUrl.classList.remove("valid");
    drawTable();

    console.log(JSON.parse(localStorage.getItem("bookmarks")));
  } else {
    console.log("not valid data");
    overlayMsg.style.display = "flex";
  }
});

closeBtn.addEventListener("click", function () {
  overlayMsg.style.display = "none";
});
