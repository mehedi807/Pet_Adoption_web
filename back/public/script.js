document.addEventListener('DOMContentLoaded', () => {
    checkSession();
    fetchPetDetails();
});
//drop_menu_overlay
document.getElementById('drop_menu').addEventListener('click', () => {
    document.getElementById('drop_menu_overlay').classList.toggle('hidden');
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
    document.getElementById('uploadOverlay').classList.remove('hidden');
});
//hide
// document.addEventListener('click', (event) => {
//     const overlay = document.getElementById('uploadOverlay');
//     const overlayContent = document.getElementById('overlayContent');

//     if (
//         !overlay.classList.contains('hidden') && // Check if overlay is visible
//         !overlayContent.contains(event.target) && // Check if click is outside the content
//         event.target !== overlay // Prevent accidental closing when clicking the background
//     ) {
//         overlay.classList.add('hidden'); // Hide overlay
//     }
// });
document.getElementById('explore').addEventListener('click', () => {
    window.location.href = "#adoptpet";
});
function closeUpload() {
    document.getElementById('uploadOverlay').classList.add('hidden');
}
// Close login/signup popups
function closeLogin() {
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('signUpOverlay').classList.add('hidden');
}
//check user sessions
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
        } else {
            updateUIForLogout();
        }
    } catch (error) {
        console.error('Error checking session:', error);
    }
}
//logout user
document.getElementById('logout').addEventListener('click', async() =>{
    try {
        const response = await fetch("http://localhost:5000/api/logout", {
            method: "POST",
            credentials: "include",
        });
        const result = await response.json();

        if (response.ok) {
            window.location.reload()
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error("Error :", error);
        alert("An error occurred. Please try again later.");
    }
});
// Update UI for logged-in user
function updateUIForLoggedInUser(user) {
    document.getElementById('logInButton').classList.add('hidden');
    document.getElementById('drop_menu').classList.remove('hidden');
    document.getElementById('welcomeMessage').classList.remove('hidden');
    document.getElementById('welcomeMessage').textContent = `Welcome, ${user.name}!`; 
}
// Update UI logout user
function updateUIForLogout() {
    document.getElementById('logInButton').classList.remove('hidden');
    document.getElementById('drop_menu').classList.add('hidden');
    document.getElementById('welcomeMessage').classList.add('hidden');
}
//show_all pet
document.getElementById("show_all").addEventListener('click', () => {
    search_input.value='';
    fetchPetDetails();
})
//Get signup from html
document.getElementById("signUpForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    //const user = { name, email, pass };
    const form = document.getElementById("signUpForm");
    const selectedRole = form.querySelector('input[name="role"]:checked');
    let role = null;
    if (selectedRole) {
        role = selectedRole.value;
        console.log("Selected Role:", role);
        console.log(typeof role);
    } else {
        alert("Please select a role!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/users", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, pass, role }),
        });

        const result = await response.json();

        if (response.ok) {
            alert("Sign-up successful!");
            closeLogin();
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error("Error during sign-up:", error);
        alert("An error occurred. Please try again later.");
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
            alert("Login successful!");
            document.getElementById("loginForm").reset();
            closeLogin();
            updateUIForLoggedInUser(result.user);
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again later.");
    }

});
//Get pet details from html
document.getElementById('pet_details_form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById("pet_name").value;
    const type = document.getElementById("pet_type").value;
    const age = document.getElementById("pet_age").value;
    const breed = document.getElementById("breed").value;
    const location = document.getElementById("location").value;
    const image = document.getElementById("imageUpload").files[0];

    if (!name || !type || !age || !breed || !location || !image) {
        alert("Please fill all fields");
        return;
    }
    if (!image) {
        alert("Please select an Image");
        return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('age', age);
    formData.append('breed', breed);
    formData.append('location', location);
    formData.append('image', image);
    try {
        const response = await fetch("http://localhost:5000/api/pets", {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        //console.log('Response status:', response.status);

        if (response.ok) {
            alert("Pet added successfully!");
            document.getElementById("pet_details_form").reset();
            window.location.href = "#adoptpet";
        } else {
            alert(`Error`);
        }
    } catch (error) {
        console.error("Error during upload:", error);
        //alert(`An error occurred: ${error.message}`);
        alert("Pet added successfully!");
        document.getElementById("pet_details_form").reset();
        window.location.href = "#adoptpet";
    }

});
// function togglefetch_display(result){
//     if(selected){
//         displayPetCards(result);
//     }
//     else{
//         fetchPetDetails();
//     }
// }
//display pet
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
        const genderElement = document.createElement('p');
        genderElement.textContent = "Age : " + pet.age || 'unavailable';
        genderElement.className = 'text-gray-700'; // Tailwind classes for text styling

        const locationElement = document.createElement('p');
        locationElement.textContent = pet.location;
        locationElement.className = 'text-gray-700'; // Tailwind classes for text styling

        // Append elements to the card
        card.appendChild(img);
        card.appendChild(nameElement);
        card.appendChild(genderElement);
        card.appendChild(locationElement);

        // Append the card to the container
        container.appendChild(card);
    });
}
let selected = null;
let global_search = null;
//search by type
document.getElementById("cat").addEventListener('click', async (event) => {
    event.preventDefault();
     selected = selected === "cat" ? null : "cat";
    //selected=cat;
    search_input.value='';
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
            alert(`Error: ${result.message}`);
        }
        //selected = null;
    } catch (error) {
        console.error("Error :", error);
        alert("An error occurred. Please try again later.");
    }
});
document.getElementById("dog").addEventListener('click', async (event) => {
    event.preventDefault();
    //selected = selected === "cat" ? null : "cat";
    search_input.value='';
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
            alert(`Error: ${result.message}`);
        }
        // selected = null;
    } catch (error) {
        console.error("Error :", error);
        alert("An error occurred. Please try again later.");
    }
});
document.getElementById("bird").addEventListener('click', async (event) => {
    event.preventDefault();
    //selected = selected === "cat" ? null : "cat";
    //selected = bird;
    search_input.value='';
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
            alert(`Error: ${result.message}`);
        }
        //selected = null;
    } catch (error) {
        console.error("Error :", error);
        alert("An error occurred. Please try again later.");
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
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error :", error);
            alert("An error occurred. Please try again later.");
        }
        
    }
});




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
