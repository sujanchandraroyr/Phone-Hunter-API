
const loadPhone = async(searchfield) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchfield}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones)
}


const displayPhones = (phones) => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';

    phones.forEach(phone => {
        
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-6 bg-white shadow-xl text-center`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body text-center">
        <h2 class="card-title ">${phone.phone_name}</h2>
        <p>${phone.slug}</p>
        <h2>$999</h2>
        <div class="card-actions justify-center">
        <button class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    })
}

const handleSearch = () => {
   const searchField = document.getElementById('search-field').value;
    console.log(searchField);
    loadPhone(searchField);
}

loadPhone()