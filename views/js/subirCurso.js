const formulario = document.getElementById('formulario');
const tituloInput = document.getElementById('titulo');
const descripcionInput = document.getElementById('descripcion');
let levelNamesInputs = [];
let levelPriceInputs = [];

let levelFileInput = document.getElementById('subir-archivo');
let urlInput = document.getElementById('subir-url');

//inputs
const imageFileInput = document.getElementById('file');
const priceInput = document.getElementById('costo');
const addLevelBtn = document.getElementById('add-level-button');

//arreglo de botones de archivo (para el index)
//cada vez que se agrega un nuevo nivel, tambien un nuevo boton con un id en incremento, asi podemos saber el indice del nivel que estamos manejando, principalmente con lo archivos
let levelButtons = [];
levelButtons[0] = document.getElementById(`upload-content-btn-1`)
checkButtonIndex();

//Archivos de los niveles
let currentLevel = 1;
//cantidad de archivos por nivel
let amountFiles = [];
amountFiles[0] = 0;
//archivos
let filesArray = [];
filesArray.push([]);

//level index (ultimo)
let levelIndex = 1;

//Contenedor de elementos
let divArchivos = document.getElementById('levelContent')

addLevelBtn.addEventListener('click', function () {
    console.log('click');
    levelIndex += 1;
    let newLevel = document.createElement('li');
    newLevel.innerHTML = `
                            <div class="level">
                                <input class="input-title" name="titulo-nivel" type="text" placeholder="Nombre del nivel" style="margin-bottom: 0;" required>
                               <input name="up-cont-btn" type="button" id="upload-content-btn-${levelIndex}" onclick="tooglePopup()"
                                    style="display: none;">
                                <label for="upload-content-btn-${levelIndex}">
                                    <span id="icon" class="material-symbols-outlined">
                                        attach_file
                                    </span>
                                </label>
                                 <div>
                                    <label for="precio-${levelIndex}">Precio: $</label>
                                    <input name="precio" id="precio-${levelIndex}" class="precio" type="text" placeholder="00.00"
                                        style="width: 100px; height: 25px;">
                                </div>
                                <div class="level-content">
                                </div>
                            </div>
                        `;
    let list = document.getElementById('level-list');
    list.appendChild(newLevel);
    //agregamos botón y actualizamos eventos
    let newButton = document.getElementById(`upload-content-btn-${levelIndex}`)
    levelButtons.push(newButton);
    filesArray.push([]);
    amountFiles.push(0);
    checkButtonIndex();
});

formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Previene el envío automático del formulario debido a que no redirige por el submit
})

levelFileInput.addEventListener('change', function () {
    console.log('archivo subido')
    addFile();
    tooglePopup();
})

urlInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        urlInput.setCustomValidity('');

        if (urlInput.value == '') {
            urlInput.setCustomValidity('Campo vacío');
            urlInput.reportValidity();
        } else {
            if (urlInput.checkValidity()) {
                console.log('url subida');
                tooglePopup();
            }
            else {
                urlInput.setCustomValidity('URL no valida');
                urlInput.reportValidity();

            }

        }

    }
})

function uploadCourse() {
    levelNamesInputs = document.getElementsByName('titulo-nivel');
    console.log(levelNamesInputs.length);

    levelPriceInputs = document.getElementsByName('precio');
    console.log(levelPriceInputs.length);

    if (!validateCourse()) {
        return;
    }

    alert('El curso se ha subido correctamente');
    window.location.href = 'ventasGeneral.view.php';

}

function validateCourse() {
    //limpiamos las validaciones
    for (var i = 0, length = levelNamesInputs.length; i < length; i++) {
        levelNamesInputs[i].setCustomValidity('');
    }

    for (var i = 0, length = levelPriceInputs.length; i < length; i++) {
        levelPriceInputs[i].setCustomValidity('');
    }
    tituloInput.setCustomValidity('');
    descripcionInput.setCustomValidity('');
    priceInput.setCustomValidity('');

    //Validaciones generales (type, required)
    if (!formulario.checkValidity()) {
        console.log('validaciones generales no validas')
        formulario.reportValidity();
        return false;
    }

    console.log('primer filtro pasado');

    //Validaciones del nivel
    if (!validateLevels()) {
        console.log('Error de nivel');
        return false;
    }

    //Validacion del titulo
    if (tituloInput.value.length > 80) {
        tituloInput.setCustomValidity('El titulo no puede exceder de 80 caracteres');
        tituloInput.reportValidity();
        return false;
    }

    //validacion de la descripcion
    if (descripcionInput.value.length > 200) {
        descripcionInput.setCustomValidity('La descripcion no puede exceder de 200 caracteres');
        descripcionInput.reportValidity();
        return false;
    }

    //validacion de la imagen del curso
    if (!validateImage()) {
        return false;
    }

    //validacion precio
    if (!validatePrice(priceInput)) {
        return false;
    }

    console.log('Curso añadido correctamente');

    return true;
}

function validateLevels() {

    //Revisamos cada uno de los inputs de nombre
    for (var i = 0, length = levelNamesInputs.length; i < length; i++) {
        if (levelNamesInputs[i].value.length > 80) {
            levelNamesInputs[i].setCustomValidity('El titulo no puede exceder de 80 caracteres');
            levelNamesInputs[i].reportValidity();
            return false;
        }
    }

    //Revisamos cada uno de los inputs de precio
    for (var i = 0, length = levelPriceInputs.length; i < length; i++) {
        if (!validatePrice(levelPriceInputs[i])) {
            console.log('error precio de nivel')
            return false;
        }
        console.log('error precio de nivel')
    }
    return true;
}

function validateImage() {

    if (!imageFileInput.files.length) {
        alert('No se ha subido una imagen de curso');
        return false;
    }
    return true;
}

function validatePrice(_priceInput) {


    //verificamos si está vacío
    if (_priceInput.value === "") {
        _priceInput.value = '0.0';
        console.log('0.0');
    }

    //verificamos que sea numero
    if (isNaN(_priceInput.value)) {
        console.log("no es un numero")
        _priceInput.setCustomValidity('Precio no válido, el precio debe de ser un número')
        return false;
    }

    return true;

}

let pop1active = false;
function tooglePopup() {
    if (pop1active) {
        document.getElementById('popup-1').classList.remove('active');
        pop1active = false;
        console.log('active')
        return;
    }
    console.log('no active')
    document.getElementById('popup-1').classList.add('active');
    pop1active = true;
    return;
}

function checkButtonIndex() {
    levelButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            let cadena = btn.id;
            let partes = cadena.split('-');
            cadena = partes[3];
            currentLevel = Number(cadena);
        });
    });
}

function addFile() {
    console.log(filesArray);

    amountFiles[currentLevel - 1] += 1;
    //se empieza desde la posicion 0
    let primerIndice = currentLevel - 1;

    console.log(primerIndice);

    filesArray[primerIndice].push('hola');

    console.log('En el nivel: ' + (primerIndice + 1) + ' hay: ' + amountFiles[currentLevel - 1] + ' archivos');

}