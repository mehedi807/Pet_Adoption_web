import User from '../models/users_model.js';
import Pet from '../models/pet_details_model.js';
import bcrypt from 'bcrypt';

export const getSession = async (req, res) => { 
    console.log('Session Data:', req.session);
    if (req.session.user) {
        res.status(200).json({ loggedIn: true, user: req.session.user });
    } else {
        res.status(200).json({ loggedIn: false });
    }
};

export const search_pet = async (req, res) => {
    try {
      const { name, breed, location, type } = req.query;
  
      // Build a dynamic query
      const query = {};
      if (name) query.name = new RegExp(name, 'i'); // Case-insensitive
      if (breed) query.breed = new RegExp(breed, 'i');
      if (location) query.location = new RegExp(location, 'i');
      if (type) query.type = new RegExp(type, 'i');
  
      const result = await Pet.find(query);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  };

  export const user_add = async (req, res) => {
    const {name , email ,pass ,role} = req.body;
    if (!name || !email || !pass) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(pass, saltRounds);
    const newuser = new User({name, email, pass: hashedPass, role});

    try {
        await newuser.save();
        res.status(200).json({ success: true, date: newuser });
    } catch (error) {
        console.error("Error adding user", error.message)
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const user_login = async (req, res) => {
    const { email, pass } = req.body;
    if (!email || !pass) {
        return res.status(400).json({ success: false, message: "Please provide both email and password" });
    }
    try {
        const user = await User.findOne({ email }); // Find the user by email
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(pass, user.pass);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        res.status(200).json({ success: true, message: "Login successful", user });
        
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const getRole = async (req,res) => {
    const {name} = req.query;
    try {
        const user = await User.findOne({ name }); // Find the user by name
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json(user.role)
    } catch (error) {
        
    }
};

export const user_logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Failed to log out" });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ success: true, message: "Logged out successfully" });
    });
};

export const add_pet = async (req, res) => {
    const { name, type, breed, age, location } = req.body;

    if (!name || !type || !breed || !age || !location) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    let imageUrl = '';
    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        } catch (error) {
            console.error("Error uploading image:", error);
            return res.status(500).json({ success: false, message: "Error uploading image" });
        }
    }
    const newPet = new Pet({
        name,
        type,
        breed,
        age,
        location,
        image: imageUrl,
    });
    try {
        await newPet.save();
        res.status(200).json({ success: true, date: newPet });
    } catch (error) {
        console.error("Error adding pet:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const get_pets = async (req, res) => {
    try {
        const pets = await Pet.find(); // Fetch all pets from the database
        res.status(200).json(pets); // Send pet details as JSON response
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const delete_pet = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Pet name is required' });
        }
        const deletedPet = await Pet.findOneAndDelete({ name });

        if (!deletedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json({ message: ` ${name} has been deleted.` });

    } catch (error) {
        console.error('Error deleting pet:', error);
        res.status(500).json({ error: 'An error occurred while deleting the pet.' });
    }
};

