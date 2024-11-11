// routes.js
const express = require("express");
const router = express.Router();
const User = require("./models/User");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

// Fonction pour générer le JWT
function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérification de l'existence de l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Utilisateur non trouvé avec cet email." });
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Mot de passe incorrect." });
    }

    // Génération et envoi du token
    const token = generateToken(user);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 heure
      sameSite: "strict",
    });

    res
      .status(200)
      .json({ success: true, message: "Connexion réussie", token });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur serveur",
        error: error.message,
      });
  }
});

// Route pour l'inscription
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Vérification des champs obligatoires
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Tous les champs sont obligatoires." });
  }
  try {
    const newUser = new User({ username, email, password });
    await newUser.save(); // Enregistrer l'utilisateur dans la base de données
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error(error); // Afficher l'erreur dans les logs du serveur
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Nom d'utilisateur ou email déjà utilisé" });
    }
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la création de l'utilisateur" });
  }
});

// Obtenir tous les utilisateurs
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Obtenir un utilisateur spécifique
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Obtenir les conversations d'un utilisateur
router.get("/conversations", async (req, res) => {
  try {
    const conversations = await Conversation.find()
      .populate("participants")
      .populate("lastMessage");
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Obtenir une conversation spécifique
router.get("/conversations/:id", async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate("participants")
      .populate({ path: "lastMessage", populate: { path: "sender" } });
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Créer une nouvelle conversation
router.post("/conversations", async (req, res) => {
  try {
    const { participants } = req.body;
    const newConversation = new Conversation({ participants });
    await newConversation.save();
    res.json(newConversation);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Obtenir tous les messages d'une conversation
router.get("/conversations/:id/messages", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    }).populate("sender");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Envoyer un message
router.post("/conversations/:id/messages", async (req, res) => {
  try {
    const { sender, content } = req.body;
    const newMessage = new Message({
      conversationId: req.params.id,
      sender,
      content,
    });
    await newMessage.save();

    // Mettre à jour le dernier message dans la conversation
    await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage: newMessage._id,
    });

    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Mettre à jour le statut d'un utilisateur
router.patch("/users/:id/status", async (req, res) => {
  try {
    const { onlineStatus } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { onlineStatus },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Marquer les messages comme lus dans une conversation
router.post("/notifications/mark-as-read", async (req, res) => {
  try {
    const { conversationId, userId } = req.body;
    // Logique pour marquer les messages comme lus (par exemple, mettre à jour un champ "readBy" dans chaque message)
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
