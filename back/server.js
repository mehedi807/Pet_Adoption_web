import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import allroutes from './routes/all_route.js';
dotenv.config();
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
    next();
});
app.use(express.json());

app.use("/api",allroutes);

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

app.listen(process.env.PORT, () => {
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