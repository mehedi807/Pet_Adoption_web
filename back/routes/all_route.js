import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { getRole, getSession, get_user,search_pet, user_add, add_pet, user_login, user_logout, get_pets, delete_pet, user_update_fav ,get_user_fav} from '../controller/all_controler.js';

const router = express.Router();

cloudinary.config({
    cloud_name: 'drsk232ss',
    api_key: '765244396375859',
    api_secret: 'w-lr1uQpx0B-XQZHu8XyfVkxDEw',
});
const upload = multer({ dest: 'uploads/' });

router.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // Your MongoDB connection string
        collectionName: 'sessions',
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        //development
        secure: false,
        sameSite: 'Lax',

        //production
        // secure: true,            
        // sameSite: 'none',
    },
}));

router.get("/session", getSession);
router.get('/search', search_pet);
//handle signup
router.post("/users", user_add)
router.post("/login", user_login);
router.post("/logout", user_logout);
router.post('/pets', upload.single('image'), add_pet);
router.get('/pets', get_pets);
router.delete('/pets', delete_pet);
router.get("/role", getRole);
router.post('/users/:usrID/favorites', user_update_fav);
router.get('/users', get_user_fav);
router.post('/users/find', get_user);

export default router;