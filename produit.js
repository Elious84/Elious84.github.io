document.addEventListener('DOMContentLoaded', fetchAndDisplayProduct);

function fetchAndDisplayProduct() {
    const productDetails = document.getElementById('productDetails');
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('itemId');

    fetch(`https://api.kedufront.juniortaker.com/item/${itemId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const item = data.item;
            const quantities = JSON.parse(localStorage.getItem('itemQuantities')) || {};
            const existingQuantity = quantities[itemId] || 0;

            productDetails.innerHTML = `
                <img src="https://api.kedufront.juniortaker.com/item/picture/${itemId}" alt="Image de ${item.name}" class="item-img_produit">
                <h2 class="title_item">${item.name}</h2>
                <p class="item_size_police">Description: ${item.description}</p>
                <p class="item_size_police">Prix: ${item.price}€</p>
                <p class="item_size_police">Date de création: ${item.createdIn}</p>
                <div class="quantity_button">
                    <button class="button_moin" id="decreaseQuantity">-</button>
                    <span class="quantity" id="itemQuantity">${existingQuantity}</span>
                    <button class="button_plus" id="increaseQuantity">+</button>
                </div>
                <button onclick="addToCart('${itemId}', '${item.name}')" class="item-button">Mettre dans le panier</button>
            `;

            document.getElementById('increaseQuantity').addEventListener('click', () => adjustQuantity(itemId, 1));
            document.getElementById('decreaseQuantity').addEventListener('click', () => adjustQuantity(itemId, -1));
        })
        .catch(error => {
            productDetails.innerHTML = `<p>Erreur lors du chargement du produit : ${error.message}</p>`;
        });
}

function adjustQuantity(itemId, change) {
    let quantities = JSON.parse(localStorage.getItem('itemQuantities')) || {};
    let currentQuantity = quantities[itemId] || 0;
    quantities[itemId] = Math.max(currentQuantity + change, 0);
    localStorage.setItem('itemQuantities', JSON.stringify(quantities));

    document.getElementById('itemQuantity').textContent = quantities[itemId];
}

function addToCart(itemId, itemName) {
    let quantities = JSON.parse(localStorage.getItem('itemQuantities')) || {};
    let quantity = quantities[itemId] || 0;

    if (quantity === 0) {
        alert(`${itemName} n'a pas été ajouté car la quantité est égale à 0.`);
    } else {
        alert(`${itemName} a été ajouté au panier avec une quantité de ${quantity}.`);
    }
}
