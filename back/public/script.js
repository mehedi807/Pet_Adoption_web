import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.0/dist/esm-browser/index.js';
let loggdUser = null;
document.addEventListener('DOMContentLoaded', () => {
   
    checkSession();
    fetchPetDetails();
});
//add hiddent to class list if clicked outside container
const loginOverlay = document.getElementById('loginOverlay');
loginOverlay.addEventListener('click', (event) => {
    if (event.target === loginOverlay) {
        loginOverlay.classList.add('hidden');
    }
});
const signUpOverlay = document.getElementById('signUpOverlay');
signUpOverlay.addEventListener('click', (event) => {
    if (event.target === signUpOverlay) {
        signUpOverlay.classList.add('hidden');
    }
});
const uploadOverlay = document.getElementById('uploadOverlay');
uploadOverlay.addEventListener('click', (event) => {
    if (event.target === uploadOverlay) {
        uploadOverlay.classList.add('hidden');
    }
});
const drop_menu_overlay = document.getElementById('drop_menu_overlay');
drop_menu_overlay.addEventListener('click', (event) => {
    if (event.target === drop_menu_overlay) {
        drop_menu_overlay.classList.add('hidden');
    }
});

//drop_menu_overlay
document.getElementById('drop_menu').addEventListener('click', () => {
    document.getElementById('drop_menu_overlay').classList.toggle('hidden');
    window
});
// Show login popup
document.getElementById('logInButton').addEventListener('click', () => {
    document.getElementById('loginOverlay').classList.remove('hidden');
});
// Show signup popup
document.getElementById('signUpbutton').addEventListener('click', () => {
    document.getElementById('signUpOverlay').classList.remove('hidden');
    document.getElementById('loginOverlay').classList.add('hidden');
});
//shop upload popup
document.getElementById('show_uoload_overlay').addEventListener('click', () => {
    document.getElementById('uploadOverlay').classList.toggle('hidden');
});
//view profile
document.getElementById('viewprofile').addEventListener('click', async () => {
    const div1 = document.getElementById('div1');
    if (!div1) {
        console.error("div1 not found in the DOM.");
        return;
    }
    div1.innerHTML = '';

    try {
        const user = await get_user();
       // console.log(user.name);
        
        if (user) {
            // Profile Container
            const profileContainer = document.createElement('div');
            profileContainer.className = 'bg-white rounded-lg p-6 max-w-md mx-auto space-y-4';

            // Name Section
            const nameContainer = document.createElement('div');
            nameContainer.className = 'flex items-center space-x-3';

            const nameIcon = document.createElement('i');
            nameIcon.className = 'fas fa-user-circle text-blue-500 text-2xl';

            const nameText = document.createElement('p');
            nameText.textContent = `Name: ${user.name}`;
            nameText.className = 'text-lg font-medium text-gray-700';

            nameContainer.appendChild(nameIcon);
            nameContainer.appendChild(nameText);
            profileContainer.appendChild(nameContainer);

            // Email Section
            const emailContainer = document.createElement('div');
            emailContainer.className = 'flex items-center space-x-3';

            const emailIcon = document.createElement('i');
            emailIcon.className = 'fas fa-envelope text-green-500 text-2xl';

            const emailText = document.createElement('p');
            emailText.textContent = `Email: ${user.email}`;
            emailText.className = 'text-lg font-medium text-gray-700';

            emailContainer.appendChild(emailIcon);
            emailContainer.appendChild(emailText);
            profileContainer.appendChild(emailContainer);

            // Role Section
            const roleContainer = document.createElement('div');
            roleContainer.className = 'flex items-center space-x-3';

            const roleIcon = document.createElement('i');
            roleIcon.className = 'fas fa-user-tag text-purple-500 text-2xl';

            const roleText = document.createElement('p');
            roleText.textContent = `Role: ${user.role}`;
            roleText.className = 'text-lg font-medium text-gray-700';

            roleContainer.appendChild(roleIcon);
            roleContainer.appendChild(roleText);
            profileContainer.appendChild(roleContainer);

            // Phone Section
            const phoneContainer = document.createElement('div');
            phoneContainer.className = 'flex items-center space-x-3';

            const phoneIcon = document.createElement('i');
            phoneIcon.className = 'fas fa-phone text-orange-500 text-2xl';

            const phoneText = document.createElement('p');
            phoneText.textContent = `Phone: ${user.phone || 'N/A'}`;
            phoneText.className = 'text-lg font-medium text-gray-700';

            phoneContainer.appendChild(phoneIcon);
            phoneContainer.appendChild(phoneText);
            profileContainer.appendChild(phoneContainer);
            div1.appendChild(profileContainer);
        } else {
            console.error('No user data found.');
        }
    } catch (error) {
        console.error('Error fetching user:');
        
    }
});
//call view favourite
document.getElementById('viewfavourite').addEventListener('click', async () => {
    const div1 = document.getElementById('div1');
    div1.innerHTML = ''
    console.log(loggdUser);
    //get favourite pets
    const url = "http://localhost:5000/api/users?usrID=" + loggdUser;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const pets = await response.json();

            pets.forEach(pet => {
                const card = document.createElement('div');
                card.className = 'bg-white shadow-md rounded-lg p-4 m-4 w-44 h-60 transition duration-300  ease-in-out hover:scale-105';

                const img = document.createElement('img');
                img.src = pet.image;
                //img.alt = "Image";
                img.className = 'w-32 h-36 object-cover rounded-md mb-4';

                const nameElement = document.createElement('h3');
                nameElement.textContent = pet.name;
                nameElement.className = 'text-xl font-bold mb-2';

                const locationElement = document.createElement('p');
                locationElement.textContent = pet.location;
                locationElement.className = 'text-gray-700';

                card.appendChild(img);
                card.appendChild(nameElement);
                card.appendChild(locationElement);

                div1.appendChild(card);

            });
        }
        else {
            const div = document.createElement('div');
            div.className='flex justify-center h-full w-full'
            const msg = document.createElement('h1')
            msg.textContent = 'Your Favourite is Empty !';
            msg.className='';
            div.appendChild(msg);

            div1.appendChild(div);
        }
    } catch (error) {
        console.error("Error:", error);
        display_alert("Error");
    }
});
//view user pet
document.getElementById('viewuserpet').addEventListener('click', async() => {
    const div1 = document.getElementById('div1');
    div1.innerHTML = ''
    //console.log(loggdUser);
    //get favourite pets
    const url = "http://localhost:5000/api/search?usrID=" + loggdUser;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const pets = await response.json();

            pets.forEach(pet => {
                const card = document.createElement('div');
                card.className = 'bg-white shadow-md rounded-lg p-4 m-4 w-44 h-60 transition duration-300  ease-in-out hover:scale-105';

                const img = document.createElement('img');
                img.src = pet.image;
                //img.alt = "Image";
                img.className = 'w-32 h-36 object-cover rounded-md mb-4';

                const nameElement = document.createElement('h3');
                nameElement.textContent = pet.name;
                nameElement.className = 'text-xl font-bold mb-2';

                const locationElement = document.createElement('p');
                locationElement.textContent = pet.location;
                locationElement.className = 'text-gray-700';

                card.appendChild(img);
                card.appendChild(nameElement);
                card.appendChild(locationElement);

                div1.appendChild(card);

            });
        }
        else {
            const div = document.createElement('div');
            div.className='flex justify-center h-full w-full'
            const msg = document.createElement('h1')
            msg.textContent = 'Your pet list is Empty !';
            msg.className='';
            div.appendChild(msg);

            div1.appendChild(div);
        }
    } catch (error) {
        console.error("Error:", error);
        display_alert("Error");
    }

});
document.getElementById('explore').addEventListener('click', () => {
    window.location.href = "#adoptpet";
});

//logout user
document.getElementById('logout').addEventListener('click', async () => {
    try {
        const response = await fetch("http://localhost:5000/api/logout", {
            method: "POST",
            credentials: "include",
        });
        const result = await response.json();

        if (response.ok) {
            window.location.reload()
        } else {
            display_alert(`Error`);
        }
    } catch (error) {
        console.error("Error :", error);
        display_alert("An error occurred. Please try again later.");
    }
});

//show_all pet
document.getElementById("show_all").addEventListener('click', () => {
    search_input.value = '';
    fetchPetDetails();
})
//Get signup from html
document.getElementById("signUpForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const usrID = uuidv4();

    //const user = { name, email, pass };
    const form = document.getElementById("signUpForm");
    const selectedRole = form.querySelector('input[name="role"]:checked');
    let role = null;
    if (selectedRole) {
        role = selectedRole.value;
        //console.log("Selected Role:", role);
        //console.log(typeof role);
    } else {
        display_alert("Please select a role!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/users", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, pass, role, usrID,phone }),
        });

        const result = await response.json();

        if (response.ok) {
            display_alert("Sign-up successful!");
           // window.location.reload();
            //closeLogin();
            document.getElementById('signUpOverlay').classList.add('hidden');
            document.getElementById('loginOverlay').classList.remove('hidden');

        } else {
            display_alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error("Error during sign-up:", error);
        display_alert("An error occurred. Please try again later.");
    }
    document.getElementById("signUpForm").reset();
});

//Get Login from html
document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("login_email").value;
    const pass = document.getElementById("login_password").value;

    const loginData = { email, pass };

    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        const result = await response.json();
        if (response.ok) {
            display_alert("Login successful!");
            document.getElementById("loginForm").reset();
            closeLogin();
            updateUIForLoggedInUser(result.user);
        } else {
            display_alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error("Error during login:", error);
        display_alert("An error occurred. Please try again later.");
    }

});

//Get pet details from html
document.getElementById('pet_details_form').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!loggdUser) {
        return display_alert('Login first!');
    }

    const user = await get_user();
    const phone = user.phone;
    const usrID = user.usrID;
    //console.log(phone);
    
    const name = document.getElementById("pet_name").value;
    const type = document.getElementById("pet_type").value;
    const age = document.getElementById("pet_age").value;
    const breed = document.getElementById("breed").value;
    const location = document.getElementById("location").value;
    const image = document.getElementById("imageUpload").files[0];
    
    const petID = uuidv4();
    //console.log(phone);
    if (!name || !type || !age || !breed || !location || !petID) {
        display_alert("Please fill all fields");
        return;
    }
    if (!image) {
        display_alert("Please select an Image");
        return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('age', age);
    formData.append('breed', breed);
    formData.append('location', location);
    formData.append('image', image);
    formData.append('petID', petID);
    formData.append('phone', phone);
    formData.append('usrID', usrID);

    //console.log(formData);
    try {
        const response = await fetch("http://localhost:5000/api/pets", {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        //console.log('Response status:', response.status);

        if (response.ok) {
            display_alert("Pet added successfully!");
            document.getElementById("pet_details_form").reset();
            window.location.href = "#adoptpet";
        } else {
            display_alert(`Error`);
        }
    } catch (error) {
        console.error("Error during upload:", error);
        //display_alert(`An error occurred: ${error.message}`);
        display_alert("Pet added successfully!");
        document.getElementById("pet_details_form").reset();
        window.location.href = "#adoptpet";
    }

});

let selected = null;
let global_search = null;
//search by type
document.getElementById("cat").addEventListener('click', async (event) => {
    event.preventDefault();
    selected = selected === "cat" ? null : "cat";
    //selected=cat;
    search_input.value = '';
    try {
        const response = await fetch("http://localhost:5000/api/search?type=cat", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result);
            // if(!global_search){
            displayPetCards(result);
            //}

            //togglefetch_display(result);
        } else {
            display_alert(`Error: ${result.message}`);
        }
        //selected = null;
    } catch (error) {
        console.error("Error :", error);
        display_alert("An error occurred. Please try again later.");
    }
});
document.getElementById("dog").addEventListener('click', async (event) => {
    event.preventDefault();
    //selected = selected === "cat" ? null : "cat";
    search_input.value = '';
    try {
        const response = await fetch("http://localhost:5000/api/search?type=dog", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result);
            //togglefetch_display(result);
            // if(!global_search){
            displayPetCards(result);
            //}
        } else {
            display_alert(`Error: ${result.message}`);
        }
        // selected = null;
    } catch (error) {
        console.error("Error :", error);
        display_alert("An error occurred. Please try again later.");
    }
});
document.getElementById("bird").addEventListener('click', async (event) => {
    event.preventDefault();
    //selected = selected === "cat" ? null : "cat";
    //selected = bird;
    search_input.value = '';
    try {
        const response = await fetch("http://localhost:5000/api/search?type=bird", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result);
            //togglefetch_display(result);
            //if(!global_search){
            displayPetCards(result);
            //}
        } else {
            display_alert(`Error: ${result.message}`);
        }
        //selected = null;
    } catch (error) {
        console.error("Error :", error);
        display_alert("An error occurred. Please try again later.");
    }
});
//search by Location
const search_input = document.getElementById("search_input");
search_input.addEventListener('keydown', async (event) => {
    if (event.key === "Enter") {
        global_search = true;
        const searchValue = search_input.value;
        const encodedValue = encodeURIComponent(searchValue);
        //console.log(selected);
        const url = 'http://localhost:5000/api/search?location=' + encodedValue;
        try {
            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (response.ok) {
                //console.log(result);
                //search_input.value='';
                displayPetCards(result);

            } else {
                display_alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error :", error);
            display_alert("An error occurred. Please try again later.");
        }

    }
});
async function checkSession() {
    try {
        const response = await fetch('http://localhost:5000/api/session', {
            method: 'GET',
            credentials: 'include', // Ensures cookies are sent with the request
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (result.loggedIn) {
            updateUIForLoggedInUser(result.user);
            loggdUser = result.user.usrID;
            //get_role(result.user);
        } else {
            updateUIForLogout();
        }
    } catch (error) {
        console.error('Error checking session:', error);
    }
}
async function get_role(username) {
    //const username = user.name;
    //console.log(username);
    const url = "http://localhost:5000/api/role?name=" + username;
    try {
        const response = await fetch(url);
        const role = await response.json();
        //console.log(role);
        return role;
    } catch (error) {
        console.error("Error getting role:", error);
        display_alert("Error getting role");
    }
};
function display_alert(message){
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = 'fixed top-14 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 1600);
}
function closeUpload() {
    document.getElementById('uploadOverlay').classList.add('hidden');
}
window.closeUpload = closeUpload;
// Close login/signup popups
function closeLogin() {
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('signUpOverlay').classList.add('hidden');
}
window.closeLogin = closeLogin;
async function fetchPetDetails() {
    try {
        const response = await fetch('http://localhost:5000/api/pets');
        const pets = await response.json();

        if (response.ok) {
            displayPetCards(pets);
        } else {
            console.error('Error fetching pet data:', pets.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
function displayPetCards(pets) {
    const container = document.getElementById('petContainer');
    container.innerHTML = '';
    pets.forEach(pet => {
        const card = document.createElement('div');
        card.className = 'bg-white shadow-md rounded-lg p-4 m-4 w-44 transition duration-300  ease-in-out hover:scale-105'; // Tailwind classes for card styling

        // Create an image element
        const img = document.createElement('img');
        img.src = pet.image; // Use the image URL from your pet object
        img.alt = pet.name;
        img.className = 'w-32 h-36 object-cover rounded-md mb-4'; // Tailwind classes for image styling

        // Create the pet name element
        const nameElement = document.createElement('h3');
        nameElement.textContent = pet.name;
        nameElement.className = 'text-xl font-bold mb-2'; // Tailwind classes for name styling

        // Create the pet details (gender and location)
        const ageElement = document.createElement('p');
        ageElement.textContent = "Age : " + pet.age || 'unavailable';
        ageElement.className = 'text-gray-700'; // Tailwind classes for text styling

        const locationElement = document.createElement('p');
        locationElement.textContent = pet.location;
        locationElement.className = 'text-gray-700'; // Tailwind classes for text styling

        // Append elements to the card
        card.appendChild(img);
        card.appendChild(nameElement);
        //scard.appendChild(ageElement);
        card.appendChild(locationElement);

        card.addEventListener('click', () => {
            CardClick(pet);
        });
        // Append the card to the container
        container.appendChild(card);
    });
}
//show ped details card
async function CardClick(pet) {
    console.log(pet.usrID);
    const container = document.getElementById('petdetailsOverlay');
    container.classList.remove('hidden');
    container.innerHTML = ''; 
    //container.className= '';

    const petdetails = document.createElement('div');
    petdetails.className = 'bg-white shadow-lg rounded-lg py-3 w-auto  space-y-4 relative px-8';

    // Close Button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.className = 'absolute top-0 right-3 text-2xl font-bold text-gray-500 hover:text-red-500';
    closeButton.onclick = () => container.classList.add('hidden');

    // Pet Image
    const img = document.createElement('img');
    img.src = pet.image || 'https://via.placeholder.com/300';
    img.alt = pet.name || 'Pet Image';
    img.className = 'w-96 h-64 object-cover rounded-md';

    // Pet Name
    const nameElement = document.createElement('h3');
    nameElement.textContent = pet.name || 'Unknown Name';
    nameElement.className = 'text-3xl font-bold text-gray-800';

    // Pet Details Section
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'flex justify-between pb-4';

    const detailLeft = document.createElement('div');
    const detailRight = document.createElement('div');

    // Breed, Age, Location
    const breedElement = createDetailElement('Breed', pet.breed || 'Unavailable');
    const ageElement = createDetailElement('Age', pet.age || 'Unavailable');
    const locationElement = createDetailElement('Location', pet.location || 'Unavailable');

    // Contact Information
    const contactElement = createDetailElement('Contact', pet.phone);

    //fav button
    const Favbtndiv = document.createElement('div');

    Favbtndiv.className = 'flex justify-center mt-4'; // Add 'hidden' class initially

    const favButton = document.createElement('button');
    favButton.id = 'favBtn';
    favButton.textContent = 'Add To Favourite';
    favButton.className = "h-9 text-sm w-36 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl  transition duration-200 ease-in-out transform hover:scale-105";
    Favbtndiv.appendChild(favButton);

    //document.body.appendChild(Favbtndiv);


    detailLeft.appendChild(breedElement);
    detailLeft.appendChild(ageElement);
    detailLeft.appendChild(locationElement);

    detailRight.appendChild(contactElement);
    let role = null
    if(loggdUser){
        const user = await get_user();
        role =await get_role(user.name);
    }
    //console.log(role);
    
    if(loggdUser && role=='adopter'){
        detailRight.appendChild(Favbtndiv);
    }

    detailsContainer.appendChild(detailLeft);
    detailsContainer.appendChild(detailRight);

    // Append all elements
    petdetails.appendChild(closeButton);
    petdetails.appendChild(img);
    petdetails.appendChild(nameElement);
    petdetails.appendChild(detailsContainer);

    container.appendChild(petdetails);

    // Add event listener for closing the overlay when clicking outside the details card
    container.addEventListener('click', (event) => {
        if (event.target === container) {
            container.classList.add('hidden');
        }
    });
    favBtn.addEventListener('click', async () => {
        try {
            //console.log(loggdUser);
            const petID = pet.petID;
            //console.log(pet.petId);
            const response = await fetch(`/api/users/${loggdUser}/favorites`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ petID })
            });

            if (response.ok) {
                display_alert('Added to favorites!');
                container.classList.add('hidden');
            } else {
                const error = await response.json();
                display_alert(error.message || 'Failed to add to favorites.');
            }
        } catch (error) {
            console.error(err);
            display_alert('Error adding to favorites.');
        }

    });
}

// Helper function to create detail elements
function createDetailElement(label, value) {
    const wrapper = document.createElement('div');
    wrapper.className = 'text-gray-700';

    const labelElement = document.createElement('span');
    labelElement.textContent = `${label}: `;
    labelElement.className = 'font-semibold';

    const valueElement = document.createElement('span');
    valueElement.textContent = value;
    valueElement.className = 'text-sm'

    wrapper.appendChild(labelElement);
    wrapper.appendChild(valueElement);
    return wrapper;
}

async function updateUIForLoggedInUser(user) {
   // window.location.reload();
    const role = await get_role(user.name);
    console.log(role);

    document.getElementById('logInButton').classList.add('hidden');
    document.getElementById('drop_menu').classList.remove('hidden');
    document.getElementById('welcomeMessage').classList.remove('hidden');
    document.getElementById('welcomeMessage').textContent = `Welcome, ${user.name}!`;

    if (role == 'adopter') {
        document.getElementById('show_uoload_overlay').classList.add('hidden');
        document.getElementById('viewuserpet').classList.add('hidden');
    }
    else if (role == 'rescuer') {
        document.getElementById('viewfavourite').classList.add('hidden');
        document.getElementById('show_uoload_overlay').classList.remove('hidden');
    }


}
// Update UI logout user
function updateUIForLogout() {
    document.getElementById('logInButton').classList.remove('hidden');
    document.getElementById('drop_menu').classList.add('hidden');
    document.getElementById('welcomeMessage').classList.add('hidden');
}
async function get_user() {
    try {
        
        const usrID = loggdUser;
       // console.log(usrID);
        const response = await fetch(`http://localhost:5000/api/users/find`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usrID })
        });
        const result = await response.json();
        //console.log(result);
        if (response.ok) {
            //console.log(result);
            const user = result[0];
            //console.log(user);  
            return user;
        } else {
           display_alert(result.message || 'Failed to add to favorites.');
        }
    } catch (error) {
        console.error(error);
        display_alert('Error adding to favorites.');
    }
}






// document.getElementById('uploadbutton').addEventListener('click', async (event) => {
//     event.preventDefault();

//     const name = document.getElementById("pet_name").value;
//     const type = document.getElementById("pet_type").value;
//     const age = document.getElementById("pet_age").value;
//     const breed = document.getElementById("breed").value;
//     const location = document.getElementById("location").value;

//     const pet_details = { name, type, age, breed, location };

//     try {
//         const response = await fetch("http://localhost:5000/api/pets", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(pet_details),
//         });
//         const result = await response.json();
//         if (response.ok) {
//             alert("Pet Added successfully!");
//             document.getElementById("pet_details_form").reset();
//             window.location.href = "#adoptpet";
//         } else {
//             alert(`Error: ${result.message}`);
//         }
//     } catch (error) {
//         console.error("Error during upload:", error);
//         alert("An error occurred. Please try again later.");
//     }
// });
