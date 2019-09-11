const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


//GET
router.get('/', async(request, response) => {
    const posts = await loadPostCollection();
    response.send(await posts.find({}).toArray());
});

//POST
router.post('/', async(request, response) => {
    const posts = await loadPostCollection();
    //from mongoDB driver
    await posts.insertOne({
        text: request.body.text,
        createdAt: new Date()
    });
    response.status(201).send();
});

//DELETE
router.delete('/:id', async (request, response) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(request.params.id)});
    response.status(200).send();
});


async function loadPostCollection(){
    const client = await mongodb.MongoClient.connect('mongo DB user connection string goes here', {
        useNewUrlParser: true
    });

    return client.db('VueTwitterApp').collection('posts');
}

module.exports = router;