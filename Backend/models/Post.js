const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userId: { type: String, require: true },
    dateCreate:{type : String, require: false},
    lastName: { type: String, require: false },
    firstName: { type: String, require: false },
    description: { type: String, require: false },
    imageUrl: { type: String, require: false },
    likes: { type: Number, require: true, default: 0 },
    usersLiked: { type: [String], require: true, default: [] },
}
)
module.exports = mongoose.model('Post', PostSchema);
