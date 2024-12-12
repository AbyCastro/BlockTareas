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
const botonAgregar = document.querySelector('#botonAgregar');
const check = 'bi-record-circle';
const tachado = 'tachado';
const uncheck = 'bi-circle';
let LIST;
let id;

const FECHA = new Date ();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{
    weekday: 'long',
    month: 'short',
    day: 'numeric'
});
// DOM 

// Función agregar tarea
function agregarTarea(tarea,id,hecho,eliminar) {
    if (eliminar) {
        return
    };

    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : '' ;
    const elemento = `<li id="elemento">
                    <i id="${id}" data="hecho" class="bi ${realizado}"></i>
                    <p class="tarea-lista text ${LINE}">${tarea}</p>
                    <i id="${id}" data="eliminar" class="bi bi-trash3"></i>
                </li> `
                lista.insertAdjacentHTML("beforeend",elemento);

};

function tareaRealizada(element) {

    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    
    element.parentNode.querySelector('.text').classList.toggle(tachado);
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true;
}
function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminar = true;
    
};

botonAgregar.addEventListener("click", () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false)
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

lista.addEventListener("click", function (event){
    const element = event.target;
    const elementData = element.attributes.data.value;
    if (elementData == "hecho") {
        tareaRealizada(element);
    } else if (elementData == "eliminar") { 
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
}

function cargarLista(array) {
    array.forEach(
        function (item){
            agregarTarea(item.nombre, item.id, item.hecho, item.eliminar);
        }
    )
};