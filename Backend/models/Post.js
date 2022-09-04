const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userId: { type: String, require: true },
    dateCreate: { type: String, require: true },
    lastName: { type: String, require: true },
    firstName: { type: String, require: true },
    description: { type: String, require: true },
    imageUrl: { type: String, require: false },
    likes: { type: Number, require: true, default: 0 },
    usersLiked: { type: [String], require: true, default: [] },
}
)
module.exports = mongoose.model('Post', PostSchema);
