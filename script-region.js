const formulario = document.querySelector('form');
const inputNombre = document.getElementById('inputNombre');
const tablaResultados = document.getElementById('tablaResultados');
const estado = document.getElementById('estado');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = inputNombre.value.trim();
    if (nombre === '') {
        alert('Por favor, ingresa el nombre del personaje');
        return;
    }
    tablaResultados.innerHTML = '';
    estado.innerText = 'Buscando personajes...';

    try {
        const respuesta = await fetch(`https://restcountries.com/v3.1/region/${inputNombre}`);
        if (respuesta.ok) {
            const data = await respuesta.json();
            const resultados = data.results;

            if (resultados.length === 0) {
                estado.innerText = 'No se encontro la region';
            } else {
                resultados.forEach((personaje) => {
                    const row = document.createElement('tr');
                    const idCell = document.createElement('td');
                    idCell.textContent = pais.value;
                    const nombreCell = document.createElement('td');
                    nombreCell.textContent = pais.name.official;
                    const especieCell = document.createElement('td');
                    especieCell.textContent = pais.capital[0];
                    const imagenCell = document.createElement('td');
                    const imagen = document.createElement('img');
                    imagen.src = pais.flags.png;
                    imagen.alt = pais.name.official;
                    imagenCell.appendChild(imagen);

                    row.appendChild(valueCell);
                    row.appendChild(paisCell);
                    row.appendChild(capitalCell);
                    row.appendChild(imagenCell);

                    tablaResultados.appendChild(row);
                });
                estado.innerText = `Mostrando ${resultados.length} paises`;
            }
        } else {
            estado.innerText = 'Error en la consulta a la API';
        }
    } catch (error) {
        estado.innerText = 'Error en la consulta a la API';
        console.log(error);
    }
});
