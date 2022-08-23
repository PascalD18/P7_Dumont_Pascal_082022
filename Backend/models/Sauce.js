const mongoose = require('mongoose');

const SauceSchema = mongoose.Schema({
    userId: { type: String},
    name: { type: String},
}
)
module.exports = mongoose.model('Sauce', SauceSchema);