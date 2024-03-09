function fetchAndDisplayItem(itemId, containerId) {
  fetch(`https://api.kedufront.juniortaker.com/item/${itemId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data.item) {
        throw new Error('Not Item');
      }
      const container = document.getElementById(containerId);
      const item = data.item;
      container.innerHTML = `
        <img id="itemImg${itemId}" class="item-img">
        <h2>${item.name}</h2>
        <a href="produit.html?itemId=${itemId}" class="item-button">Voir le produit: ${item.price}€</a>
        <p>Date de création: ${item.createdIn}</p>
      `;

      return itemId;
    })
    .then(itemId => {
      const imageUrl = `https://api.kedufront.juniortaker.com/item/picture/${itemId}`;
      document.getElementById(`itemImg${itemId}`).src = imageUrl;
    });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchAndDisplayItem(1, 'item1');
  fetchAndDisplayItem(2, 'item2');
  fetchAndDisplayItem(3, 'item3');
  fetchAndDisplayItem(4, 'item4');
  fetchAndDisplayItem(5, 'item5');
  fetchAndDisplayItem(6, 'item6');
});

