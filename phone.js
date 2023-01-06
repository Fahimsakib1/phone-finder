document.getElementById('error-title-phone').style.display = 'none';
const loadPhoneData = (searchPhone, dataLimit) => {
    const URL = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
    fetch(URL)
        .then(res => res.json())
        .then(data => displayPhoneData(data.data, dataLimit))
}


const displayPhoneData = (phones, dataLimit) => {
    //console.log(phones);
    const getPhoneDiv = document.getElementById('phone-container');
    getPhoneDiv.innerHTML = '';
    const getShowAllButton = document.getElementById('show-all-button');

    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        getShowAllButton.classList.remove('d-none');
    }
    else {
        getShowAllButton.classList.add('d-none');
    }


    if (phones.length === 0) {
        document.getElementById('error-title-phone').style.display = 'block';
        loadingSpinner(false);
    }

    else {
        phones.forEach(phone => {
            //console.log(phone);
            const { brand, image, phone_name, slug } = phone
            const makePhoneDiv = document.createElement('div');
            makePhoneDiv.classList.add('col');

            makePhoneDiv.innerHTML = `
            <div class="card shadow-lg rounded-5 border border-primary mb-4">
                <img src="${image}" class="card-img-top rounded-5" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Brand: ${brand}</h5>
                    <h5 class="card-title">Model: ${phone_name}</h5>
                    <button id="viewPhoneDetailsButton" onclick ="viewPhoneDetails('${slug}')" class="btn btn-primary py-2 w-100" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">View Details</button>
                </div>
            </div>`;
            getPhoneDiv.appendChild(makePhoneDiv);
        })
        document.getElementById('error-title-phone').style.display = 'none';
        loadingSpinner(false);
    }
}

//Search Phone By Clicking Input Field Button
document.getElementById('search-phone-by-button').addEventListener('click', function () {
    // const getInputField = document.getElementById('phone-input-field');
    // const inputFieldText = getInputField.value;
    // loadPhoneData(inputFieldText);
    // loadingSpinner(true);
    processShowAllButtonClicked(10);
})


// Input Field e name type kore "ENTER" press korle search kaj korbe..
const getInputField = document.getElementById('phone-input-field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        //processAfterShowAllButtonClicked(10);
        // const getInputField = document.getElementById('phone-input-field');
        // const inputFieldText = getInputField.value;
        // loadPhoneData(inputFieldText);
        processShowAllButtonClicked(10);
    }
})


//Loading Spinner function
const loadingSpinner = (isLoading) => {
    const getSpinnerDiv = document.getElementById('loading-spinner');
    if (isLoading) {
        getSpinnerDiv.classList.remove('d-none');
    }

    else {
        getSpinnerDiv.classList.add('d-none');
    }
}

//View Phone Details
const viewPhoneDetails = (slugId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slugId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhonedetailsOnModal(data.data))

}

//Model er jonno jei code sehi gulo ei function er moddhe thakbe
const displayPhonedetailsOnModal = (phoneDetails) => {
    console.log(phoneDetails);
    const { brand, image, name, releaseDate } = phoneDetails;
    const getPhoneTitle = document.getElementById('phoneDetailsModalLabel');
    getPhoneTitle.innerText = brand + ' ' + name;

    const getModalBody = document.getElementById('modal-body-area');
    getModalBody.innerHTML = `
    <div class="text-center">
       <img src="${image}" alt="">
    </div>
    <h5>Model: ${name}</h5>
    <h6>Release Date: ${releaseDate ? releaseDate : "No Release Date Found"}</h6>
    <h6>Main Information</h6>
    <p>Processor / Chipset: ${phoneDetails.mainFeatures ? phoneDetails.mainFeatures.chipSet : "Processor Information Not Availabe"}</p>
    <p>Display: ${phoneDetails.mainFeatures ? phoneDetails.mainFeatures.displaySize : "Display Information Not Availabe"}</p>
    <p>RAM/ROM: ${phoneDetails.mainFeatures ? phoneDetails.mainFeatures.memory : "RAM-ROM Information Not Availabe"}</p>
    <p>Storage: ${phoneDetails.mainFeatures ? phoneDetails.mainFeatures.storage : "Storage Information Not Availabe"}</p>
    <p>Sensors: ${phoneDetails.mainFeatures ? phoneDetails.mainFeatures.sensors : "Sensor Information Not Availabe"}</p>
    <hp>Sensors</p>
        <ul>
            <li>${phoneDetails.mainFeatures.sensors[0]}</li>
            <li>${phoneDetails.mainFeatures.sensors[1]}</li>
            <li>${phoneDetails.mainFeatures.sensors[2]}</li>
            <li>${phoneDetails.mainFeatures.sensors[3]}</li>
            <li>${phoneDetails.mainFeatures.sensors[4]}</li>
        </ul>
    <h6>Other Informations</h6>
    <p>Bluetooth: ${phoneDetails.others ? phoneDetails.others.Bluetooth : "Bluetooth Information Not Availabe"}</p>
    <p>USB: ${phoneDetails.others ? phoneDetails.others.USB : "USB Information Not Availabe"}</p>`;
}



//Show all Button e click korle ja process hobe tar code
const processShowAllButtonClicked = (dataLimit) => {
    const getInputField = document.getElementById('phone-input-field');
    const inputFieldText = getInputField.value;
    loadPhoneData(inputFieldText, dataLimit);
    loadingSpinner(true);
}

//Code After the Show All Button is Clicked
document.getElementById('show-all-button').addEventListener('click', function () {
    processShowAllButtonClicked();
})

//loadPhoneData('apple');
