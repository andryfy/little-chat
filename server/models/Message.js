const mongoose = require("mongoose");

// Définir le schéma pour les messages
const messageSchema = new mongoose.Schema({
  // ID de l'expéditeur (référence à l'utilisateur)
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Référence au modèle User
    required: [true, "L'expéditeur est obligatoire"],
  },
  // ID du destinataire (référence à l'utilisateur)
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Référence au modèle User
    required: [true, "Le destinataire est obligatoire"],
  },
  // Contenu du message
  content: {
    type: String,
    required: [true, "Le contenu du message est obligatoire"],
    trim: true,
    maxlength: [500, "Le contenu ne doit pas dépasser 500 caractères"],
  },
  // Statut de livraison du message
  deliveryStatus: {
    type: String,
    enum: ["sent", "delivered", "read"], // Statuts possibles
    default: "sent",
  },
  // Date et heure d'envoi
  sentAt: {
    type: Date,
    default: Date.now,
  },
  // Date et heure de lecture
  readAt: {
    type: Date,
    default: null, // Null par défaut, mis à jour lorsque le message est lu
  },
  // Champ pour indiquer si le message est un message texte ou un fichier (ex: image, vidéo)
  messageType: {
    type: String,
    enum: ["text", "image", "video", "file"], // Types de messages possibles
    default: "text",
  },
  // URL du fichier (s'il s'agit d'un fichier ou d'une image)
  fileUrl: {
    type: String,
    default: null, // Null par défaut, utilisé uniquement si messageType est 'file' ou 'image'
  },
});

// Créer le modèle basé sur le schéma
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
