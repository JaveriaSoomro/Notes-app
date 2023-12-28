// Add Notes
const addIcon = document.getElementById("add-icon");
const addNotes = document.getElementById("add-notes");

addIcon.addEventListener("click", () => {
  if ((addNotes.style.display = "none")) addNotes.style.display = "block";
  addIcon.style.display = "none";
});

// Adding notes to list
const plusIcon = document.getElementById("plus-icon");
const notesDisplay = document.getElementById("notes-display");

plusIcon.addEventListener("click", () => {
  let notesDisplay = document.getElementById("notes-display");
  let note = document.querySelector(".note");
  let newElement = document.createElement("li");
  let title = document.createElement("h3");
  let description = document.createElement("p");
  let addTitle = document.getElementById("add-title");
  let addDescription = document.getElementById("add-description");

  newElement.style.cursor = "pointer";
  title.value = addTitle.value;
  description.value = addDescription.value;

  title.innerHTML = title.value;
  description.innerHTML = description.value;

  notesDisplay.appendChild(newElement);
  newElement.appendChild(title);
  newElement.appendChild(description);

  //  Saving Notes to local Storage
  var existingData = localStorage.getItem("note");
  var dataArray = existingData ? JSON.parse(existingData) : [];

  dataArray.push({ title: title.value, description: description.value });
  localStorage.setItem("note", JSON.stringify(dataArray));

  showNotes();

  addTitle.value = "";
  addDescription.value = "";
  addNotes.style.display = "none";
  addIcon.style.display = "block";
});

let cut = document.getElementById("fa-xmark");

cut.addEventListener("click",()=>{
    addNotes.style.display = "none";
    addIcon.style.display = "block";
})
// Getting Notes from local Storage
function showNotes() {
  let note = document.getElementById("notes-display");
  let existingData = localStorage.getItem("note");
  let dataArray = existingData ? JSON.parse(existingData) : [];

  let html = "";
  dataArray.forEach(function (data, index) {
    html += ` <li class="display-flex list" id="list">
      <div id= "note-values">
        <h3>${data.title}</h3>
        <p>${data.description}</p>
      </div>
        <div id= "note-icon">
        <i class="fa-solid fa-pen-to-square cursor-pointer" onclick="editNote(${index})"></i>
        <i class="fa-solid fa-trash cursor-pointer"  onclick="deleteNote(${index})"></i>
        </div>
      </li>`;
  });
  note.innerHTML = html;
}
showNotes();

//Show Delete All
const ellipsisVertical = document.getElementById("fa-ellipsis-vertical");
const deleteAll = document.getElementById("delete-all");

ellipsisVertical.addEventListener("click", () => {
  deleteAll.classList.toggle("display-none");

  //   Deleting all notes
  deleteAll.addEventListener("click", () => {
    let notesDisplay = document.getElementById("notes-display");
    localStorage.clear();
    notesDisplay.innerHTML = "";
    deleteAll.classList.add("display-none");
  });
});
// Delete Note

const deleteNote = (index) => {
  let notes = localStorage.getItem("note");
  if (notes) {
    notes = JSON.parse(notes);
  } else {
    notes = [];
  }

  notes.splice(index, 1);

  localStorage.setItem("note", JSON.stringify(notes));
  showNotes();
};

// Editing Note

const editNote = (index) => {
  let addTitle = document.getElementById("add-title");
  let addDescription = document.getElementById("add-description");
  let addNotes = document.getElementById("add-notes");
  let notes = localStorage.getItem("note");
  if (notes) {
    notes = JSON.parse(notes);
  } else {
    notes = [];
  }
  addNotes.style.display = "block";
  addTitle.value = notes[index].title;
  addDescription.value = notes[index].description;

  notes.splice(index, 1);

  localStorage.setItem("note", JSON.stringify(notes));
  showNotes();
};

// Searching

let search = document.querySelector("#search-bar");

search.addEventListener("input", (e) => {
  let notes = localStorage.getItem("note");
  let notesDisplay = document.getElementById("notes-display");
  let existingData = localStorage.getItem("note");
  let dataArray = existingData ? JSON.parse(existingData) : [];

  let value = e.target.value.toLowerCase();
  if (notes) {
    notes = JSON.parse(notes);
  } else {
    notes = [];
  }

  let html = "";

  dataArray.forEach(function (data, index) {
    if (
      data.title.toLowerCase().includes(value) ||
      data.description.toLowerCase().includes(value)
    ) {
      html += ` <li class="display-flex list" id="list">
          <div id= "note-values">
            <h3>${data.title}</h3>
            <p>${data.description}</p>
          </div>
            <div id= "note-icon">
            <i class="fa-solid fa-pen-to-square cursor-pointer" onclick="editNote(${index})"></i>
            <i class="fa-solid fa-trash cursor-pointer"  onclick="deleteNote(${index})"></i>
            </div>
          </li>`;
        }
         notesDisplay.innerHTML = html;
        });
  let newValue = notesDisplay.innerHTML;
  console.log(newValue);

  if(newValue == '') {
    let html='';
    html += `
    <h3 style ="padding:100px">${value} not Found</h3>
    `
    notesDisplay.innerHTML = html;
  }
});
