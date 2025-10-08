// Obtener los elementos necesarios
const searchInput = document.getElementById('search-input');
const items = document.querySelectorAll('.container-items .item');
function filterItems() {
    const searchTerm = searchInput.value.toLowerCase();   

    items.forEach(item => {
        const title = item.querySelector('.name').textContent.toLowerCase();  
        const priceText = item.querySelector('.price').textContent.trim();  
        const priceNumber = priceText.replace(/[^\d]/g, ''); 

        const matchesTitle = title.includes(searchTerm);
        const matchesPrice = priceNumber.includes(searchTerm);

        if (matchesTitle || matchesPrice) {
            item.style.display = 'block';  
        } else {
            item.style.display = 'none';   
        }
        
    });
}

searchInput.addEventListener('input', filterItems);
