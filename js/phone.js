
const loadPhone = async(searchfield, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchfield}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll)
}


const displayPhones = (phones, isShowAll) => {
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }

    if(!isShowAll){
        phones = phones.slice(0, 12)
    }

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
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpiner(false)
}

const handleSearch = (isShowAll) => {
    toggleLoadingSpiner(true)
   const searchField = document.getElementById('search-field').value;
    console.log(searchField);
    loadPhone(searchField, isShowAll);
   
}

const toggleLoadingSpiner = (isLoading) => {
    const loadingSpner = document.getElementById('loading-spiner');
    if(isLoading){
        loadingSpner.classList.remove('hidden');
    }
    else{
        loadingSpner.classList.add('hidden');
    }
}

// Handle show details
const handleShowDetails = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phone);
    showPhoneDetails(phones)
} 

// show the Modal

const showPhoneDetails = (phones) => {
    console.log(phones);
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <figure><img src="${phones.image}" alt="Shoes" /></figure>
    <h2 class="text-4xl font-bold">${phones.name}</h2>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <h3><span class="text-xl font-semibold">Storage: </span>${phones.mainFeatures.storage}</h3>
    <h3><span class="text-xl font-semibold">name: </span>${phones.name}</h3>
    <h3><span class="text-xl font-semibold">releasedate: </span>${phones.releaseDate}</h3>
    `
    
    show_details_modal.showModal()
}

// Handle show all
const handleShowAll = () => {
    handleSearch(true)
    console.log('ok vai')
}

// loadPhone()