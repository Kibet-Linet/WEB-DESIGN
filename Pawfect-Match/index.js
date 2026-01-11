let dogs = [];
let dogsContainer;
let searchInput;
let modal;
let closeModal;
let adoptionForm;
let successMessage;
let closeSuccess;

let currentDogForAdoption = null;

/* -------------------- LOAD DOGS -------------------- */
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

/* -------------------- FALLBACK DATA -------------------- */
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

/* -------------------- DISPLAY DOGS -------------------- */
function displayDogs(dogsToDisplay) {
    dogsContainer.innerHTML = '';
    dogsToDisplay.forEach(dog => {
        dogsContainer.appendChild(createDogCard(dog));
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
                    <p><strong>Name:</strong> ${dog.name}</p>
                    <p><strong>Age:</strong> ${dog.age}</p>
                    <p><strong>Weight:</strong> ${dog.weight}</p>
                    <p><strong>Height:</strong> ${dog.height}</p>
                    <p><strong>Temperament:</strong> ${dog.temperament}</p>
                </div>
                <button class="adopt-btn" data-id="${dog.id}">Adopt Me!</button>
            </div>
        </div>
    `;
    return card;
}

/* -------------------- EVENTS -------------------- */
document.addEventListener('DOMContentLoaded', () => {
    dogsContainer = document.getElementById('dogs-container');
    searchInput = document.getElementById('search-input');
    modal = document.getElementById('adoption-modal');
    closeModal = document.querySelector('.close-modal');
    adoptionForm = document.getElementById('adoption-form');
    successMessage = document.getElementById('success-message');
    closeSuccess = document.getElementById('close-success');

    loadDogs();

    searchInput.addEventListener('input', e => {
        const term = e.target.value.toLowerCase();
        displayDogs(
            dogs.filter(d =>
                d.name.toLowerCase().includes(term) ||
                d.breed.toLowerCase().includes(term)
            )
        );
    });

    closeModal.addEventListener('click', () => modal.style.display = 'none');
    closeSuccess.addEventListener('click', () => successMessage.style.display = 'none');

    adoptionForm.addEventListener('submit', e => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            dogId: document.getElementById('dog-id').value,
            dogBreed: document.getElementById('modal-dog-breed').textContent,
            timestamp: new Date().toISOString()
        };

        const submissions = JSON.parse(localStorage.getItem('adoptionSubmissions') || '[]');
        submissions.push(formData);
        localStorage.setItem('adoptionSubmissions', JSON.stringify(submissions));

        adoptionForm.reset();
        modal.style.display = 'none';
        successMessage.style.display = 'flex';
    });
});

/* -------------------- DELEGATED CLICK -------------------- */
document.addEventListener('click', e => {
    if (e.target.classList.contains('adopt-btn')) {
        const dogId = Number(e.target.dataset.id);
        currentDogForAdoption = dogs.find(d => d.id === dogId);

        if (!currentDogForAdoption) return;

        document.getElementById('modal-dog-breed').textContent = currentDogForAdoption.breed;
        document.getElementById('modal-dog-age').textContent = currentDogForAdoption.age;
        document.getElementById('modal-dog-sex').textContent = currentDogForAdoption.sex;
        document.getElementById('dog-id').value = currentDogForAdoption.id;

        modal.style.display = 'flex';
    }

    if (e.target === modal) modal.style.display = 'none';
    if (e.target === successMessage) successMessage.style.display = 'none';
});
