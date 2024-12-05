// Comentario
// Variable
// var
// let nombre;
// console.log(nombre);
// nombre = "Aby";

// Hola mundo
// console.log("Hola mundo! desde la consola")

// Hola mundo! desde un alert
// alert("Hola mundo desde un alert");

// // Tipo de datos
// // string
// let texto = "Soy un texto";
// // Number
// let numero = 42;
// // Bolean 2 datoa, ejemplo: True o False 
// let verdadero = true;
// // Indefinido
// let undefined;
// // null
// let vacio = null;

// Definir mis constantes y mis variables 
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('#input');
const botonagregar = document.querySelector('#botonagregar');
const check = 'be-record-circle';
const tachado = 'tachado';
const uncheck = 'be-circle';
let LIST;
let id;

const FECHA = new Date ();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{
    weekday: 'long',
    month: 'short',
    day: 'numeric', 
});

function agregartarea(tarea, id, hecho, eliminar) {
    if (eliminar) {
        return
    }
    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : '';
    const elemento = `<li id="elemento">
    <i id="${id}" data="hecho" class="bi ${realizado}"></i>
    <p class="tarea-lista ${LINE}">${tarea}</p>
    <i id="${id}" data="eliminar" class="bi bi-trash3"></i>
</li>`
lista.insertAdjacentHTML("beforeend",elemento);
};

function tarearealizada(element) {
    element.classlist.toggle(check);
    element.classlist.toggle(uncheck);
    element.parentNode.querySelector('.text').classlist.toggle(tachado);
    LIST[element.id].realizado = LIST[element.id].realizado ? false :true;
};

function tareaeliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminar = true;
};

botonagregar.addEventListener ("click",() => {
    const tarea = input.value;
    if (tarea) {
        agregartarea(tarea, id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            hecho: false,
            eliminar: false,
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
        input.value = "";
    }
});

lista.addEventListener("click", function (event) {
const element = event.target;
const elementData = element.attributes.data.value;
if (elementData == "hecho") {
    tareaRealizada(element);
} else if (elementData == "eliminar")
{
    tareaEliminada(element);
};
localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem ("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;
};

function cargarlista(array) {
    array.forEach(
        function (item) {
            agregartarea(item.nombre, item.id, item.hecho, item.eliminar);
        }
    );
};