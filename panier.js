document.addEventListener('DOMContentLoaded', fetchAndDisplayCartItems);

function fetchAndDisplayCartItems() {
    const productDetails = document.getElementById('productDetails');
    productDetails.innerHTML = '';
    const quantities = JSON.parse(localStorage.getItem('itemQuantities')) || {};
    let hasItems = false;

    Object.keys(quantities).forEach(itemId => {
        if (quantities[itemId] > 0) {
            hasItems = true;
            fetch(`https://api.kedufront.juniortaker.com/item/${itemId}`)
                .then(response => response.json())
                .then(data => {
                    const item = data.item;
                    productDetails.innerHTML += `
                        <div class="cart_item" id="item-${itemId}">
                            <img src="https://api.kedufront.juniortaker.com/item/picture/${itemId}" alt="Image de ${item.name}" class="item_img_panier">
                            <h2 class="title_item_panier">${item.name}</h2>
                            <p class="item_size_police">Prix: ${item.price}€</p>
                            <div class="quantity_button">
                                <button class="button_moin" onclick="adjustQuantity('${itemId}', -1)">-</button>
                                <span class="quantity" id="quantity-${itemId}">${quantities[itemId]}</span>
                                <button class="button_plus" onclick="adjustQuantity('${itemId}', 1)">+</button>
                            </div>
                        </div>
                    `;
                })
                .catch(error => {
                    console.error(`Erreur lors du chargement du produit ${itemId}: ${error.message}`);
                });
        }
    });

    cleanUpQuantities();

    if (hasItems) {
        appendCheckoutButton();
    } else {
        removeCheckoutButton();
    }
}

function adjustQuantity(itemId, change) {
    let quantities = JSON.parse(localStorage.getItem('itemQuantities')) || {};
    let currentQuantity = quantities[itemId] || 0;
    let newQuantity = Math.max(currentQuantity + change, 0);
    if (newQuantity > 0) {
        quantities[itemId] = newQuantity;
    } else {
        delete quantities[itemId];
    }
    localStorage.setItem('itemQuantities', JSON.stringify(quantities));
    fetchAndDisplayCartItems();
}

function cleanUpQuantities() {
    let quantities = JSON.parse(localStorage.getItem('itemQuantities')) || {};
    Object.keys(quantities).forEach(itemId => {
        if (quantities[itemId] <= 0) {
            delete quantities[itemId];
        }
    });
    localStorage.setItem('itemQuantities', JSON.stringify(quantities));
}

function appendCheckoutButton() {
    let checkoutButton = document.getElementById('checkoutButton');
    if (!checkoutButton) {
        const tabItem2 = document.querySelector('.tab_item2');
        checkoutButton = document.createElement('button');
        checkoutButton.id = 'checkoutButton';
        checkoutButton.textContent = 'Valider ma commande';
        checkoutButton.addEventListener('click', function() {
            window.location.href = 'commande.html';
        });
        tabItem2.appendChild(checkoutButton);
    }
}

function removeCheckoutButton() {
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.remove();
    }
}
