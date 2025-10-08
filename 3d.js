 /*
  const apiKey = '3470e35e33d7de71fab86081';  
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/ARS`;  
*/

/*

async function convertirPesosADolares(pesos) {
   

  const apiKey = 'bac9841317f0675504197f71';  
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/ARS`;  


  try {
      const response = await fetch(url);
      const data = await response.json();

      
      if (data.result === 'success') {
          const tasaDeCambio = data.conversion_rates.USD;  
          const cantidadEnDolares = pesos * tasaDeCambio;
          return cantidadEnDolares.toFixed(2); 
      } else {
          console.error('Error al obtener la tasa de cambio');
          return 0;
      }
  } catch (error) {
      console.error('Error en la solicitud:', error);
      return 0;
  }
}


async function actualizarPrecios() {
  const items = document.querySelectorAll('.item');

  for (const item of items) {
      const precioARS = parseFloat(item.getAttribute('data-price'));  
      const precioUSD = await convertirPesosADolares(precioARS);  
      const priceUSDElement = item.querySelector('.price-usd');
      priceUSDElement.textContent = `USD $${precioUSD}`;  
  }
}

actualizarPrecios();

document.getElementById('toggle-price-btn').addEventListener('click', function() {
  const precioARS = document.querySelectorAll('.price-ars');
  const precioUSD = document.querySelectorAll('.price-usd');
  
  precioARS.forEach((precio) => {
      precio.style.display = (precio.style.display === 'none' || precio.style.display === '') ? 'block' : 'none';
  });
  precioUSD.forEach((precio) => {
      precio.style.display = (precio.style.display === 'none' || precio.style.display === '') ? 'block' : 'none';
  });

  const isUSDVisible = precioUSD[0].style.display === 'block';
  document.getElementById('toggle-price-btn').textContent = isUSDVisible ? 'Ocultar Precios en USD' : 'Mostrar precios en USD';
});

*/