let dogs = [];

const dogsContainer = document.getElementById('dogs-container');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('adoption-modal');
const closeModal = document.querySelector('.close-modal');
const adoptionForm = document.getElementById('adoption-form');
const successMessage = document.getElementById('success-message');
const closeSuccess = document.getElementById('close-success');

let currentDogForAdoption = null;

async function loadDogs() {
    try {
        const response = await fetch('db.json');
        const data = await response.json();
        dogs = data.dogs;
        displayDogs(dogs);
    } catch (error) {
        console.error('Error loading dogs:', error);
        dogs = getMockDogs();
        displayDogs(dogs);
    }
}

function getMockDogs() {
    return [
        {
            id: 1,
            name: "Max",
            breed: "Golden Retriever",
            age: "2 years",
            sex: "Male",
            weight: "65 lbs",
            height: "24 inches",
            temperament: "Friendly, Intelligent, Devoted",
            image: "media/dog-images/golden retreiver.jpg"
        },
        {
            id: 2,
            name: "Bella",
            breed: "French Bulldog",
            age: "1.5 years",
            sex: "Female",
            weight: "22 lbs",
            height: "12 inches",
            temperament: "Adaptable, Playful, Smart",
            image: "media/dog-images/bulldog.jpg"
        },
        {
            id: 3,
            name: "Charlie",
            breed: "German Shepherd",
            age: "3 years",
            sex: "Male",
            weight: "75 lbs",
            height: "26 inches",
            temperament: "Confident, Courageous, Smart",
            image: "media/dog-images/german shephard.jpg"
        },
        {
            id: 4,
            name: "Luna",
            breed: "Labrador Retriever",
            age: "4 years",
            sex: "Female",
            weight: "55 lbs",
            height: "22 inches",
            temperament: "Gentle, Intelligent, Family-friendly",
            image: "media/dog-images/labrador.jpg"
        },
        {
            id: 5,
            name: "Rocky",
            breed: "Beagle",
            age: "5 years",
            sex: "Male",
            weight: "25 lbs",
            height: "15 inches",
            temperament: "Curious, Merry, Friendly",
            image: "media/dog-images/beagle.jpg"
        },
        {
            id: 6,
            name: "Daisy",
            breed: "Poodle",
            age: "2.5 years",
            sex: "Female",
            weight: "45 lbs",
            height: "18 inches",
            temperament: "Active, Proud, Very Smart",
            image: "media/dog-images/poodle.jpg"
        },
        {
            id: 7,
            name: "Bailey",
            breed: "Border Collie",
            age: "1 year",
            sex: "Female",
            weight: "35 lbs",
            height: "20 inches",
            temperament: "Energetic, Smart, Work-oriented",
            image: "media/dog-images/border-collie.jpg"
        },
        {
            id: 8,
            name: "Cooper",
            breed: "Siberian Husky",
            age: "3.5 years",
            sex: "Male",
            weight: "50 lbs",
            height: "23 inches",
            temperament: "Loyal, Outgoing, Mischievous",
            image: "media/dog-images/husky.jpg"
        }
    ];
}

function displayDogs(dogsToDisplay) {
    dogsContainer.innerHTML = '';
    
    dogsToDisplay.forEach(dog => {
        const dogCard = createDogCard(dog);
        dogsContainer.appendChild(dogCard);
    });
}

function createDogCard(dog) {
    const card = document.createElement('div');
    card.className = 'flip-card';
    
    card.innerHTML = `
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img src="${dog.image}" alt="${dog.breed}" class="dog-image">
                <div class="dog-info-front">
                    <h3 class="dog-breed">${dog.breed}</h3>
                    <p class="dog-sex">${dog.sex}</p>
                </div>
            </div>
            <div class="flip-card-back">
                <div class="dog-details-back">
                    <p><span>Name:</span> <span>${dog.name}</span></p>
                    <p><span>Age:</span> <span>${dog.age}</span></p>
                    <p><span>Weight:</span> <span>${dog.weight}</span></p>
                    <p><span>Height:</span> <span>${dog.height}</span></p>
                    <p><span>Temperament:</span> <span>${dog.temperament}</span></p>
                </div>
                <button class="adopt-btn" data-id="${dog.id}">Adopt Me!</button>
            </div>
        </div>
    `;
    
    return card;
}

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredDogs = dogs.filter(dog => 
        dog.name.toLowerCase().includes(searchTerm) || 
        dog.breed.toLowerCase().includes(searchTerm)
    );
    displayDogs(filteredDogs);
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('adopt-btn')) {
        const dogId = parseInt(e.target.dataset.id);
        currentDogForAdoption = dogs.find(dog => dog.id === dogId);
        
        if (currentDogForAdoption) {
            document.getElementById('modal-dog-breed').textContent = currentDogForAdoption.breed;
            document.getElementById('modal-dog-age').textContent = currentDogForAdoption.age;
            document.getElementById('modal-dog-sex').textContent = currentDogForAdoption.sex;
            document.getElementById('dog-id').value = currentDogForAdoption.id;
            modal.style.display = 'flex';
        }
    }
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
    if (e.target === successMessage) {
        successMessage.style.display = 'none';
    }
});

adoptionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        dogId: document.getElementById('dog-id').value,
        dogBreed: document.getElementById('modal-dog-breed').textContent,
        timestamp: new Date().toISOString()
    };
    
    console.log('Adoption form submitted:', formData);
    
    adoptionForm.reset();
    
    modal.style.display = 'none';
    successMessage.style.display = 'flex';
    
    const previousSubmissions = JSON.parse(localStorage.getItem('adoptionSubmissions') || '[]');
    previousSubmissions.push(formData);
    localStorage.setItem('adoptionSubmissions', JSON.stringify(previousSubmissions));
});

closeSuccess.addEventListener('click', () => {
    successMessage.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    loadDogs();
});