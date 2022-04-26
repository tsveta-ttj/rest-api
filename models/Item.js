const { model, Schema, Types: {ObjectId} } = require('mongoose');

const schema = new Schema({
    title: {type: String, required: [true, 'Title is requiered']},
    description: {type: String, minlength: [10, 'Description must be at least 10 characters']},
    price: {type: Number, required: true},
    img: {type: String, required: true},
    owner: {type: ObjectId, ref: 'User'}
});

const Item = model('Item', schema);

module.exports = Item