const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());
// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB Connecté"))
  .catch(err => console.log(err));

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));