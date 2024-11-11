const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// // Schéma pour les compteurs
// const counterSchema = new mongoose.Schema({
//   sequenceValue: {
//     type: Number,
//     default: 0,
//   },
// });

// const Counter = mongoose.model("Counter", counterSchema);

// Définir le schéma pour les utilisateurs
const userSchema = new mongoose.Schema({
  // Nom de l'utilisateur
  username: {
    type: String,
    required: [true, "Le nom est obligatoire"],
    trim: true,
    minlength: [2, "Le nom doit comporter au moins 2 caractères"],
    maxlength: [50, "Le nom ne doit pas dépasser 50 caractères"],
  },
  // Adresse email
  email: {
    type: String,
    required: [true, "L'email est obligatoire"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "L'email est invalide"],
  },
  // Mot de passe de l'utilisateur
  password: {
    type: String,
    required: [true, "Le mot de passe est obligatoire"],
    minlength: [6, "Le mot de passe doit comporter au moins 6 caractères"],
  },
  // Avatar (URL de l'image de profil)
  avatar: {
    type: String,
    default: "https://example.com/default-avatar.png", // URL de l'avatar par défaut
  },
  // Statut en ligne (true = en ligne, false = hors ligne)
  isOnline: {
    type: Boolean,
    default: false,
  },
  // Dernière date de connexion
  lastSeen: {
    type: Date,
    default: Date.now,
  },
  // Champ pour indiquer si l'utilisateur a un statut personnalisé
  statusMessage: {
    type: String,
    maxlength: [150, "Le statut ne doit pas dépasser 150 caractères"],
    default: "",
  },
  // Age de l'utilisateur
  age: {
    type: Number,
    min: [0, "L'âge ne peut pas être négatif"],
    max: [120, "L'âge maximum est de 120 ans"],
    default: 0,
  },
  // Adresse de l'utilisateur (sous-document)
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    zipCode: {
      type: String,
      trim: true,
      match: [/^\d{5}$/, "Le code postal est invalide"],
    },
  },
  // Rôle de l'utilisateur (par exemple, utilisateur ou admin)
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"], // Valeurs possibles
    default: "user",
  },
  // Date de création du compte
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hachage du mot de passe avant de sauvegarder l'utilisateur
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); // Hachage du mot de passe
  next();
});

// // Avant de sauvegarder un nouvel utilisateur, obtenir l'ID auto-incrémenté
// userSchema.pre("save", async function (next) {
//   if (this.isNew) {
//     this.id = await getNextSequenceValue("userId"); // Assigner l'ID auto-incrémenté
//   }
//   next();
// });

// Méthode pour comparer le mot de passe lors de la connexion
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Créer le modèle basé sur le schéma
const User = mongoose.model("User", userSchema);

// // Créer un document de compteur au démarrage si nécessaire
// async function initializeCounter() {
//   await Counter.findOneAndUpdate(
//     { _id: "userId" },
//     { $setOnInsert: { sequenceValue: 0 } },
//     { upsert: true }
//   );
// }

// // Initialiser le compteur lors du démarrage de l'application
// initializeCounter().catch((error) =>
//   console.error("Erreur lors de l'initialisation du compteur:", error)
// );

module.exports = User;
