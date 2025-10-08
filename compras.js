let cart = [];

// Función para agregar productos al carrito
function addToCart(productId, productName, productPrice) {
    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1,
        });
    }

    updateCartCount();
    updateCartButtonDetails();
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    const index = cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartCount();
        updateCartButtonDetails();
    }
}

// Función para cambiar la cantidad de un producto
function updateProductQuantity(productId, change) {
    const product = cart.find((item) => item.id === productId);
    
    if (product) {
        product.quantity += change;
        
        // Si la cantidad llega a 0, eliminar el producto
        if (product.quantity <= 0) {
            removeFromCart(productId);
        }
        
        updateCartCount();
        updateCartButtonDetails();
    }
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Función para mostrar detalles del carrito en el botón
function updateCartButtonDetails() {
    const toggleCartButton = document.getElementById("toggle-cart");
    let cartDetails = "";

    if (cart.length === 0) {
        cartDetails = "El carrito está vacío.";
    } else {
        let total = 0;
        let productCount = 0;

        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity;
            cartDetails += `${item.quantity}x ${item.name} - $${itemTotal.toFixed(2)}\n`;
            total += itemTotal;
            productCount += item.quantity;
        });

        cartDetails += `\nTotal a pagar: $${total.toFixed(2)}\n`;
        cartDetails += `Cantidad de productos: ${productCount}`;
    }

    toggleCartButton.setAttribute("data-tooltip", cartDetails);
}

// Función para crear el contenido detallado del carrito
function createCartDetailsContent() {
    if (cart.length === 0) {
        return "El carrito está vacío.";
    }

    let content = `
        <div class="cart-details-wrapper">
            ${cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <span>${item.name}</span>
                    <div class="quantity-controls">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item" data-id="${item.id}">🗑️</button>
                </div>
            `).join('')}
            <div class="cart-summary">
                <strong>Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</strong>
            </div>
        </div>
    `;

    return content;
}

// Inicializar eventos
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".btn-add-cart");
    const toggleCartButton = document.getElementById("toggle-cart");
    let tooltipVisible = false;
    let tooltip = null;

    // Agregar productos al carrito
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productElement = button.closest(".item");
            const productId = productElement.dataset.title;
            const productName = productElement.querySelector(".name").textContent;
            const productPrice = productElement.dataset.price;

            addToCart(productId, productName, productPrice);
        });
    });

    // Mostrar/Ocultar detalles del carrito al hacer clic en el botón
    toggleCartButton.addEventListener("click", (event) => {
        event.stopPropagation();
        if (tooltipVisible) {
            if (tooltip) tooltip.remove();
            tooltipVisible = false;
        } else {
            tooltip = document.createElement("div");
            tooltip.id = "cart-tooltip";
            
            // Usar la nueva función para crear contenido detallado
            tooltip.innerHTML = createCartDetailsContent();
            
            tooltip.style.position = "absolute";
            tooltip.style.background = "#fff";
            tooltip.style.border = "1px solid #ddd";
            tooltip.style.padding = "10px";
            tooltip.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";
            tooltip.style.zIndex = "1000";
            tooltip.style.maxWidth = "300px";
            tooltip.style.fontSize = "14px";

            const rect = toggleCartButton.getBoundingClientRect();
            tooltip.style.top = `${rect.bottom + window.scrollY}px`;
            tooltip.style.left = `${rect.left + window.scrollX}px`;

            document.body.appendChild(tooltip);
            tooltipVisible = true;

            // Añadir eventos para los botones de control dentro del tooltip
            addCartControlEvents();

            // Cerrar el tooltip al hacer clic fuera de él
            const closeTooltip = (event) => {
                if (!tooltip.contains(event.target) && event.target !== toggleCartButton) {
                    tooltip.remove();
                    tooltipVisible = false;
                    document.removeEventListener("click", closeTooltip);
                }
            };
            document.addEventListener("click", closeTooltip);
        }
    });

    // Función para añadir eventos a los controles del carrito
    function addCartControlEvents() {
        // Botones de disminuir cantidad
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                updateProductQuantity(productId, -1);
                event.stopPropagation()
                // Regenerar el contenido del tooltip
                if (tooltip) {
                    tooltip.innerHTML = createCartDetailsContent();
                    addCartControlEvents();
                }
            });
        });

        // Botones de aumentar cantidad
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                updateProductQuantity(productId, 1);
                event.stopPropagation()
                // Regenerar el contenido del tooltip
                if (tooltip) {
                    tooltip.innerHTML = createCartDetailsContent();
                    addCartControlEvents();
                }
            });
        });

        // Botones de eliminar producto
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                removeFromCart(productId);
                event.stopPropagation()
                // Regenerar el contenido del tooltip
                if (tooltip) {
                    tooltip.innerHTML = createCartDetailsContent();
                    addCartControlEvents();
                }
            });
        });
    }
});