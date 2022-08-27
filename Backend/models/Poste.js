const mongoose = require('mongoose');

const PosteSchema = mongoose.Schema({
    userId: { type: String, require: true },
    name: { type: String, require: true },
    description: { type: String, require: true },
    imageUrl: { type: String, require: false },
    likes: { type: Number, require: true, default: 0 },
    usersLiked: { type: [String], require: true, default: [] },
}
)
module.exports = mongoose.model('Poste', PosteSchema);
