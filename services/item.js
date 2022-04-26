const Item = require('../models/Item');

async function getAll(){
    return Item.find({});
}


async function create(item) {
    const result = new Item(item);

    await result.save();
    return result;
}

function getById(id){
    return Item.findById(id);;
}

async function update(id, item) {
    const existing = await Item.findById(id);
        existing.title = item.title;
        existing.description = item.description;
        existing.price = item.price;
        existing.img = item.img;
        
        await existing.save();

        return existing;
}

async function deleteById(id) {
  await Item.findByIdAndDelete(id);
    
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteById
};