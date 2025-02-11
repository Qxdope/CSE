// Product Database (Move this from script.js if needed)
const productDatabase = {
    'David': {
        title: 'David',
        artist: 'Michelangelo',
        price: '$1 Billion',
        description: 'A masterpiece of Renaissance sculpture created between 1501-1504',
        location: 'Galleria dell Accademia, Florence, Italy',
        year: 'Created 1501-1504',
        technique: 'Marble sculpture',
        image: 'img/David.jpg'
    },
    'The Thinker': {
        title: 'The Thinker',
        artist: 'Auguste Rodin',
        price: '$1 Billion',
        description: 'One of Rodin s most famous works depicting a man in contemplation',
        location: 'Rodin Museum, Paris, France',
        year: 'Created 1880',
        technique: 'Bronze sculpture',
        image: 'img/The Thinker.jpg'
    }
    // Add other products as needed
};

// Function to show product details
function showProductDetailsPage(productName) {
    const product = productDatabase[productName];
    if (!product) {
        alert('Product not found');
        return;
         {
            // Pass product name to the details page via URL
            window.location.href = `product-details.html?product=${encodeURIComponent(productName)}`;
        }
    }

    // Update the product details on the page
    document.getElementById('product-details-title').textContent = product.title;
    document.getElementById('product-details-artist').textContent = `By ${product.artist}`;
    document.getElementById('product-details-price').textContent = `Price: ${product.price}`;
    document.getElementById('product-details-description').textContent = product.description;
    document.getElementById('product-details-location').textContent = `Location: ${product.location}`;
    document.getElementById('product-details-year').textContent = `Created: ${product.year}`;
    document.getElementById('product-details-technique').textContent = `Technique: ${product.technique}`;

    // Update the product image
    const imgElement = document.getElementById('product-details-image');
    imgElement.src = product.image;
    imgElement.alt = product.title;
}

// Function to handle adding to favorites
function addToFavorites() {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        alert('Please log in to add to favorites');
        return;
    }

    const productTitle = document.getElementById('product-details-title').textContent;
    let favorites = JSON.parse(localStorage.getItem(`favorites_${user}`) || '[]');

    if (!favorites.includes(productTitle)) {
        favorites.push(productTitle);
        localStorage.setItem(`favorites_${user}`, JSON.stringify(favorites));
        alert(`${productTitle} added to favorites!`);
    } else {
        alert('This product is already in your favorites');
    }
}