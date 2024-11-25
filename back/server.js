import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import User from './models/users_model.js';
import Pet from './models/pet_details_model.js';
import cors from "cors";
import bcrypt from 'bcrypt';
import multer from 'multer';
import cloudinary from 'cloudinary';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: true, // Frontend URL
    credentials: true,           
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

//Sessin manager
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // Your MongoDB connection string
        collectionName: 'sessions',
    }),
    cookie: {
        //maxAge: 2000,
        maxAge: 24 * 60 * 60 * 1000, 
        httpOnly: false,
        secure: false,            
        sameSite: 'LAX', 
    },
}));
app.get("/api/session",(req, res) => {
    console.log('Session Data:', req.session);
    if (req.session.user) {
        res.status(200).json({ loggedIn: true, user: req.session.user });
    } else {
        res.status(200).json({ loggedIn: false });
    }
});

//search 
app.get('/api/search', async (req, res) => {
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
  });
// Search route
// app.get('/api/search', async (req, res) => {
//     try {
//       const { name, breed, location, type } = req.body;
  
//       // Build a dynamic query
//       const query = {};
//       if (name) query.name = new RegExp(name, 'i'); // Case-insensitive
//       if (breed) query.breed = new RegExp(breed, 'i');
//       if (location) query.location = new RegExp(location, 'i');
//       if (type) query.type = new RegExp(type, 'i');
  
//       const result = await Pet.find(query);
//       res.status(200).json(result);
//     } catch (err) {
//       res.status(500).json({ error: 'Server error', details: err.message });
//     }
//   });
//handle signup
app.post("/api/users", async (req, res) => {
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
})
//handle login
app.post("/api/login", async (req, res) => {
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
});
// Handle Logout
app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Failed to log out" });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ success: true, message: "Logged out successfully" });
    });
});


cloudinary.config({
    cloud_name: 'drsk232ss',
    api_key: '765244396375859',
    api_secret: 'w-lr1uQpx0B-XQZHu8XyfVkxDEw',
});
const upload = multer({ dest: 'uploads/' });

//Post pet details
app.post('/api/pets', upload.single('image'), async (req, res) => {
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
});
//fetch data
app.get('/api/pets', async (req, res) => {
    try {
        const pets = await Pet.find(); // Fetch all pets from the database
        res.status(200).json(pets); // Send pet details as JSON response
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//delete pet
app.delete('/api/pets', async (req, res) => {
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
});
app.listen(5000, () => {
    connectDB();
    console.log("Server Started at port 5000");
})















//delete user
// app.delete("/api/users", async (req, res) => {
//     try {
//         const { email } = req.body;

//         if (!email) {
//             return res.status(400).json({ error: 'Email is required' });
//         }
//         const deletedUser = await Pet.findOneAndDelete({ email });

//         if (!deletedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ message: ` User has been deleted.` });
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).json({ error: 'An error occurred while deleting the user.' });
//     }
// });
// app.delete('/api/users', async (req, res) => {
//     try {
//         const { name } = req.body;

//         if (!name) {
//             return res.status(400).json({ error: 'Pet name is required' });
//         }
//         const deletedPet = await Pet.findOneAndDelete({ name });

//         if (!deletedPet) {
//             return res.status(404).json({ message: 'Pet not found' });
//         }

//         res.status(200).json({ message: ` ${name} has been deleted.` });

//     } catch (error) {
//         console.error('Error deleting pet:', error);
//         res.status(500).json({ error: 'An error occurred while deleting the pet.' });
//     }
// });