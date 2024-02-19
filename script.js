let files = [];

const dropArea = document.querySelector(".drop-area");
const dragDropText = document.querySelector("h2");
const button = document.querySelector("button");
const input = document.getElementById("input-file");
const preview = document.getElementById("preview");

// Invalidar la acción por defecto para los eventos de drag & drop
["dragover", "dragleave", "drop"].forEach((evt) => {
  dropArea.addEventListener(evt, preventDefault);
});

function preventDefault(e) {
  e.preventDefault();
}

dropArea.addEventListener("dragover", function () {
  dropArea.classList.add("active");
  dragDropText.textContent = "Drop files here";
});

dropArea.addEventListener("dragleave", function () {
  dropArea.classList.remove("active");
  dragDropText.textContent = "Drag & Drop files";
});

dropArea.addEventListener("drop", function (event) {
  event.preventDefault();

  // Recoger los archivos soltados
  const droppedFiles = event.dataTransfer.files;

  // Convertir FileList a Array y agregarlos a la lista de archivos
  files = files.concat(Array.from(droppedFiles));

  // Mostrar la previsualización de las imágenes
  showFiles();

  // Devolver la apariencia de la zona de soltar a su estado original
  dropArea.classList.remove("active");
  dragDropText.textContent = "Drag & Drop files";
});

//punt 7
function showFiles() {
  preview.innerHTML = "";

  if (files.length > 0) {
    // Iterar sobre cada archivo y llamar a la función processFile
    files.forEach((file, index) => {
      processFile(file, index);
    });
  }
}

//punt 8
function processFile(file, index) {
  const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  const docType = file.type;
  if (!validExtensions.includes(docType)) {
    console.error("Archivo no válido:", file.name);
    files.splice(index, 1);
    return;
  }

  let reader = new FileReader();
  reader.readAsDataURL(file);

  // Callback cuando se complete la lectura del archivo
  reader.onload = function () {
    let prev = `<div class="previewImage">
        <img src="${reader.result}" />
        <span>${file.name}</span>
        <span onclick="removeBtn(${index})" class="material-symbols-outlined removeBtn">c</span>
    </div>`;

    preview.insertAdjacentHTML("beforeend", prev);
  };
}

//punt 9
function removeBtn(index) {
  files.splice(index, 1);

  showFiles();
}

//punt 10
button.addEventListener("click", function (e) {
  e.preventDefault();
  input.click();
});

//punt 11
input.addEventListener("change", function () {
  const selectedFiles = input.files;

  files = files.concat(Array.from(selectedFiles));

  showFiles();

  input.value = null;
});
