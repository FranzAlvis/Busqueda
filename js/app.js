//variables

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transimision = document.querySelector('#transimision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;

//generar un objeto con la busqueda
const datosBusqueda = {
    marca: "",
    year: "",
    minimo: "",
    maximo: "",
    puertas: "",
    transmision: "",
    color: "",
}


//eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);//muestra automoviles

    //llena las opciones de años
    llenarSelect();

})

//eventos listener para los select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    filtarAuto();
})

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;
    filtarAuto();
})

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtarAuto();
})

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtarAuto();
})

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;
    filtarAuto();
})

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtarAuto();
})

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtarAuto();
})

console.log(datosBusqueda);

//funciones
function mostrarAutos(autos) {
    limpiarHTML();

    autos.forEach(auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: 
            ${precio} - Color: ${color}
        
        `;

        //insertar en el html
        resultado.appendChild(autoHTML);
    })
}

//limpiar HTML
function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//genera los años del select
function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

//filtar auto en base a la busqueda

function filtarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'No hay Resultado, intenta con otros terminos de busqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    if (datosBusqueda.year) {
        return auto.year === parseInt(datosBusqueda.year);
    }
    return auto;
}

function filtrarMinimo(auto) {
    if (datosBusqueda.minimo) {
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
}
function filtrarMaximo(auto) {
    if (datosBusqueda.maximo) {
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    if (datosBusqueda.puertas) {
        return auto.puertas === parseInt(datosBusqueda.puertas);
    }
    return auto;
}

function filtrarTransmision(auto) {
    if (datosBusqueda.transmision) {
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}
function filtrarColor(auto) {
    if (datosBusqueda.color) {
        return auto.color === datosBusqueda.color;
    }
    return auto;
}