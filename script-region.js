const regionForm = document.getElementById('regionForm');
const tablaPaisesRegion = document.getElementById('regionTabla');

const buscarPaisesPorRegion = async (e) => {
    e.preventDefault();
    let region = document.getElementById('regionInput').value;
    if (region === '') {
        alert('Debe ingresar el nombre de una región.');
        return;
    }

    const url = `https://restcountries.com/v3.1/region/${region}`;

    try {
        const respuesta = await fetch(url);

        if (respuesta.ok) {
            const data = await respuesta.json();

            tablaPaisesRegion.innerHTML = '';

            if (data.length > 0) {
                const titulo = document.createElement('tr');
                const th = document.createElement('th');
                th.textContent = `Países en la región ${region}:`;
                titulo.appendChild(th);
                tablaPaisesRegion.appendChild(titulo);

                data.forEach(pais => {
                    const tr = document.createElement('tr');
                    const td = document.createElement('td');
                    td.textContent = pais.name.common;
                    tr.appendChild(td);
                    tablaPaisesRegion.appendChild(tr);
                });
                document.getElementById('estadoRegion').innerText = '';
                tablaPaisesRegion.style.display = 'table';
            } else {
                document.getElementById('estadoRegion').innerText = 'No se encontraron países en esa región.';
                tablaPaisesRegion.style.display = 'none';
            }
        } else {
            document.getElementById('estadoRegion').innerText = 'No se encontraron países en esa región.';
            tablaPaisesRegion.style.display = 'none';
        }
    } catch (error) {
        console.log(error);
    }
}

regionForm.addEventListener('submit', buscarPaisesPorRegion);
