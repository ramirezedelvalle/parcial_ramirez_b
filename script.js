const formul = document.querySelector('form');
const tabla = document.querySelector('table');

tabla.style.display = 'none';

const consultarPais = async (evento) => {
  evento.preventDefault();
  let nombrePais = formul.pais.value;
  if (nombrePais === '') {
    alert("Ingrese el nombre de un país");
    return;
  }
    // CONFIGURANDO LA PETICIÓN y el url de API DE PAISES ATRAVEZ DEL MMTODO GET
    const url = `https://restcountries.com/v3.1/translation/${nombrePais}`;
    const config = {
      method: 'GET'
    };
    //prueba 

      // Consulta a la API SI SE ESTA BUSCANDO O NO
  document.getElementById('resultado').innerText = 'Operacion sin exito, intente otro dato';
  try {
    // CONSULTA A LA API
    const respuesta = await fetch(url, config);
    if (respuesta.status) {
      const data = await respuesta.json();
      const pais = data[0];
      console.log(data); 
      console.log(pais.name.common);
      console.log(pais.area);
      console.log(pais.capital);
      console.log(pais.region);
      console.log(pais.flag);

      document.getElementById('nombrePais').innerText = pais.name.official;
      document.getElementById('areaPais').innerText = pais.area;
      document.getElementById('capitalPais').innerText = pais.capital[0];
      document.getElementById('regionPais').innerText = pais.region;
      document.getElementById('banderaPais').src = pais.flags.png;
      document.getElementById('resultado').innerText = 'Fue Encontrado';
      tabla.style.display = '';
    } else {
      document.getElementById('resultado').innerText = 'No se encontró';
    }
  } catch (error) {
    console.log(error);
  }
};
//aqui se crea la consulta para la busqueda de consulta en php 
const consultarAPI = async (e) => {
  const url = `./consultar.php`
  const config = {
      method : 'GET'
  }
  try {
      // CONSULTA A LA API
      const resulta = await fetch(url, config);   
      
      const data = await resulta.text()

      alert(data)

      console.log(data)
       
     
  } catch (error) {
      alert('ESTO NO ES METODO GET' + error)
      console.log(error)
  }
}

formul.addEventListener('submit', consultarPais);
