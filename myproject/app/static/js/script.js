// Authentication Functions
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    
    if (!username || !password) {
        alert('Please fill in all fields!');
        return;
    }
    
    if (localStorage.getItem(username)) {
        alert('Username already exists!');
        return;
    }
    
    localStorage.setItem(username, password);
    alert('Account created successfully! Please log in.');
    showPage('login');
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    if (!username || !password) {
        alert('Please enter valid credentials!');
        return;
    }
    
    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
        localStorage.setItem('currentUser', username);
        showPage('home');
        updateUsername();
    } else {
        alert('Invalid username or password!');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    showPage('login');
}

// Navigation Functions
function showPage(page) {
    // Update body background
    document.body.className = page + "-bg";
    
    // Hide all pages
    const pages = [
        'login-page', 
        'signup-page', 
        'home-page', 
        'exhibit-page', 
        'paintings-page', 
        //'sculptures-page', 
        'artifacts-page', 
        'saved-page',
        'account-page',
        'product-details-page'
    ];
    
    pages.forEach(p => {
        const element = document.getElementById(p);
        if (element) {
            element.style.display = 'none';
        }
    });
    
    // Show selected page
    const selectedPage = document.getElementById(page + '-page');
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }
    
    // Special handling for home page
    if (page === 'home') {
        updateUsername();
    }
}

function updateUsername() {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        showPage('login');
    } else {
        const userElement = document.getElementById('user');
        if (userElement) {
            userElement.textContent = user;
        }
    }
}

// Product Details Functions
const productDatabase = {
    'Mona Lisa': {
        title: 'Mona Lisa',
        artist: 'Leonardo da Vinci',
        price: '$1 Billion',
        description: 'The Mona Lisa is a 16th-century portrait painted in oil on a poplar panel by Leonardo da Vinci during the Italian Renaissance.',
        location: 'Louvre Museum, Paris, France',
        year: 'Painted c. 1503–1519',
        technique: 'Oil painting on poplar panel',
        image: '/img/Mona_Lisa.jpg'  // Ensure relative path is correct

    },
    'Starry Night': {
        title: 'Starry Night',
        artist: 'Vincent van Gogh',
        price: '$500 Million',
        description: 'The Starry Night is an oil-on-canvas painting depicting the view from the east-facing window of his asylum room.',
        location: 'Museum of Modern Art (MoMA), New York, USA',
        year: 'Painted in 1889',
        technique: 'Oil impasto',
        image: '/img/Starry_Night.jpg'
    },
    'The Scream': {
        title: 'The Scream',
        artist: 'Edvard Munch',
        price: '$119.9 Million',
        description: 'The Scream is a composition symbolizing the anxiety of the human condition.',
        location: 'National Gallery, Oslo, Norway',
        year: 'Painted in 1893',
        technique: 'Oil, tempera, and pastel on cardboard',
        image: '/img/the_scream.jpg'
    },
    'Girl with a Pearl Earring': {
        title: 'Girl with a Pearl Earring',
        artist: 'Johannes Vermeer',
        price: '$30 Million',
        description: 'Girl with a Pearl Earring is a famous portrait painting by Johannes Vermeer, created around 1665. It features a young girl wearing an exotic dress and a striking pearl earring, often referred to as the "Mona Lisa of the North."',
        location: 'Mauritshuis, The Hague, Netherlands',
        year: 'Painted c. 1665',
        technique: 'Oil on canvas',
        image: '/img/Pearl_Earring.jpg'
    },
    'Guernica': {
        title: 'Guernica',
        artist: 'Pablo Picasso',
        price: '$30 Million',
        description: 'Guernica is a large oil painting by Pablo Picasso, created in 1937. It depicts the horrors of war and the suffering of civilians, inspired by the bombing of Guernica during the Spanish Civil War.',
        location: 'Museo Reina Sofía, Madrid, Spain',
        year: 'Painted c. 1937',
        technique: 'Oil painting on canvas',
        image: '/img/Guernica.jpg'
    },
    'The Kiss': {
        title: 'The Kiss',
        artist: 'Gustav Klimt',
        price: 'Estimated over $100 Million',
        description: 'The Kiss is a famous painting by Gustav Klimt, created between 1907 and 1908. It depicts a couple embracing, wrapped in elaborate golden robes, representing love and intimacy in Klimt’s signature Art Nouveau style.',
        location: 'Österreichische Galerie Belvedere, Vienna, Austria',
        year: 'Painted in 1907–1908',
        technique: 'Oil and gold leaf on canvas',
        image: '/img/The Kiss.jpg'
    },
    'American Gothic': {
        title: 'American Gothic',
        artist: 'Grant Wood',
        price: 'Priceless',
        description: 'American Gothic is a 1930 painting by Grant Wood. It depicts a stern-looking farmer holding a pitchfork alongside a woman, symbolizing rural American life during the Great Depression.',
        location: 'Art Institute of Chicago, Chicago, USA',
        year: 'Painted in 1930',
        technique: 'Oil painting on beaverboard',
        image: '/img/American Gothic.jpg'
    },
    'Night Watch': {
        artist: 'Rembrandt van Rijn',
        price: 'Priceless',
        description: 'The Night Watch is a famous painting by Rembrandt, completed in 1642. It depicts a dynamic and dramatic scene of a militia company led by Captain Frans Banning Cocq, showcasing Rembrandt’s mastery of light and shadow.',
        location: 'Rijksmuseum, Amsterdam, Netherlands',
        year: 'Painted in 1642',
        technique: 'Oil painting on canvas',
        image: '/img/Night_Watch.jpg'
    },

    //<!-- Sculptures Page -->
       'David': {
        title: 'David',
        artist: 'Michelangelo',
        price: '$1 Billion',
        description: 'A masterpiece of Renaissance sculpture created between 1501-1504',
        location: 'Galleria dell\'Accademia, Florence, Italy',
        year: 'Created 1501-1504',
        technique: 'Marble sculpture',
        image: '../../../../img/David.jpg'
    },
    'The Thinker': {
        title: 'The Thinker',
        artist: 'Auguste Rodin',
        price: '$1 Billion',
        description: 'One of Rodin\'s most famous works depicting a man in contemplation',
        location: 'Rodin Museum, Paris, France',
        year: 'Created 1880',
        technique: 'Bronze sculpture',
        image: '../../../../img/The Thinker.jpg'
    }
};

function showProductDetailsPage(productName) {
    const product = productDatabase[productName];
    if (!product) {
        console.log("Product not found in database:", productName); // Debugging statement
        return;
    }

    // Update all product details
    document.getElementById('product-details-title').textContent = product.title;
    document.getElementById('product-details-artist').textContent = `By ${product.artist}`;
    document.getElementById('product-details-price').textContent = `Price: ${product.price}`;
    document.getElementById('product-details-description').textContent = product.description;
    document.getElementById('product-details-location').textContent = `Location: ${product.location}`;
    document.getElementById('product-details-year').textContent = `Created: ${product.year}`;
    document.getElementById('product-details-technique').textContent = `Technique: ${product.technique}`;
    
    // Update image with proper path
    const imgElement = document.getElementById('product-details-image');
    imgElement.src = product.image;
    imgElement.alt = product.title;

    // Show the details page
    showPage('product-details');
}

// Favorites Functions
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

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('currentUser');
    showPage(user ? 'home' : 'login');
});
