document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orderForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitOrder();
    });
});

function submitOrder() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;

    const orderDetails = {
        email: email,
        name: name,
        address: address,
        cart: getCartItems()
    };

    fetch('https://api.kedufront.juniortaker.com/order/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails)
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert(`Commande validée! ID de la commande: ${data.command_id}`);
        } else {
            alert("Erreur lors de la création de la commande. Veuillez réessayer.");
        }
    })
    .catch(error => {
        console.error('Erreur lors de la soumission de la commande:', error);
        alert("Erreur lors de la connexion au serveur. Veuillez réessayer.");
    });
}

function getCartItems() {
    const quantities = JSON.parse(localStorage.getItem('itemQuantities')) || {};
    return Object.entries(quantities).map(([id, amount]) => ({ id: parseInt(id), amount }));
}
