const mongoose = require("mongoose");

// Définir le schéma pour les conversations
const conversationSchema = new mongoose.Schema({
  // Participants de la conversation (références à des utilisateurs)
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Référence au modèle User
      required: [true, "Les participants sont obligatoires"],
    },
  ],
  // Dernier message de la conversation (référence au modèle Message)
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message", // Référence au modèle Message
    default: null, // Null par défaut, sera mis à jour avec le dernier message
  },
  // Date et heure de la dernière activité dans la conversation
  updatedAt: {
    type: Date,
    default: Date.now, // Initialisé à la date actuelle
  },
  // Statut de la conversation (par exemple, active ou archivée)
  status: {
    type: String,
    enum: ["active", "archived"], // Valeurs possibles
    default: "active",
  },
  // Nombre de messages non lus pour chaque participant
  unreadCount: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      count: {
        type: Number,
        default: 0, // Initialisé à 0
      },
    },
  ],
});

// Créer le modèle basé sur le schéma
const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
