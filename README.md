# PetNest - Pet Adoption Website

## Project Overview

The **Pet Adoption Website** is an online platform that allows users to adopt pets or list pets available for adoption. The website offers features for browsing available pets, viewing detailed profiles, and adopting pets. Additionally, users can list their pets for adoption. This project is built with **HTML**, **CSS** (using **Tailwind CSS**), and **JavaScript** for the front end. The back-end is powered by **Node.js**, **Express** and **MongoDB** for data storage.

## Features

- **User Authentication**: Allows users to register and sign in.
- **Pet Adoption**: Users can browse available pets, view pet profiles and adopt pets.
- **Pet Listing**: Users can list their pets for adoption by filling out a form.
- **Pet Searching**: Users can search pet for adoption.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)

## Installation

To set up this project locally, follow the steps below:

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (Version 14 or higher) - [Download Node.js](https://nodejs.org/)
- **MongoDB** (MongoDB Atlas for cloud hosting) - [Download MongoDB](https://www.mongodb.com/products/platform/atlas-database)
- **Git** (For cloning the repository) - [Download Git](https://git-scm.com/)

### Steps

 **Clone the Repository**
   ```bash
   git clone https://github.com/mehedi807/Pet_adoption.git
   cd Pet_adoption
   npm run dev
```

## Usage

### User Registration and Login

1. **Sign Up**: To sign up, click on the "Register" link on the homepage. Fill in your details (name, email, password, etc.), and click "Submit" to create a new account.
2. **Log In**: To log in, click on the "Sign In" link, enter your credentials, and click "Login."
3. **Profile**: After logging in, users can view their profile information, including name, email, phone number and role (rescuer or adopter).

### Pet Adoption

1. **Browse Pets**: After logging in, go to the "Adopt Pet" section to view available pets. You can filter and browse the pet listings.
2. **Pet Details**: Click on any pet's name to view more details, including images, location and contact details.
3. **Favourite Collwction**: To add a pet to favourite, click on the "Add to Favourite" button on the pet's profile page.

### Pet Listing

1. **List a Pet**: If you're a rescuer, you can list a pet for adoption by clicking on the "List Your Pet" section. Fill in the required details (pet name, type, description, etc.) and submit.


## Folder Structure

```plaintext
├── back/                   # Backend code directory
│   ├── server.js           # Entry point for the server
│   ├── config/             # Configuration files
│   │   └── db.js           # Database connection configuration
│   ├── models/             # MongoDB models
│   │   ├── users_model.js  # User schema
│   │   └── pet_details_model.js # Pet details schema
│   ├── controller/         # Logic for API requests
│   │   └── all_controler.js # All controller logic
│   ├── routes/             # API routes
│   │   └── all_route.js    # All application routes
│   ├── public/             # Public assets
│   │   ├── script.js       # JavaScript logic for the front end
│   │   ├── output.css      # Compiled CSS
│   │   ├── input.css       # Tailwind source CSS
│   │   └── index.html      # Main HTML file
│   ├── drawable/           # Static assets like images and icons
├── node_modules            # All installed Node.js dependencies
├── uploads                 # Store uploaded images
├── package.json            # Project dependencies, scripts, and metadata
├── tailwind.config.js      # Tailwind CSS configuration file
└── README.md               # Project documentation

```




## Technologies Used

- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Hosting**: Hosted on render for testing.


