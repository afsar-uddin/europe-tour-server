const express = require('express');

const { MongoClient } = require('mongodb');

const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

// MIDDLEWARE
app.use(cors())
app.use(express.json())

// DB CONNECTION
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cmhhb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function europeTour() {
    try {
        await client.connect();

        const database = client.db('europeTour');
        const bannerCollection = database.collection("banner");
        const quotesCollection = database.collection("quotes");
        const coverageCollection = database.collection("coverageArea");
        const tripTypesCollection = database.collection("tripTypes");
        const tripCollection = database.collection("trips");

        // GET BANNER API
        app.get('/banner', async (req, res) => {
            const cursor = bannerCollection.find({});
            const bannerArray = await cursor.toArray();
            res.json(bannerArray);
        });

        // GET QUOTES API
        app.get('/quotes', async (req, res) => {
            const cursor = quotesCollection.find({});
            const quotesArray = await cursor.toArray();
            res.json(quotesArray);
        });

        // GET COVERAGE AREA API
        app.get('/coverage-area', async (req, res) => {
            const cursor = coverageCollection.find({});
            const coverageArray = await cursor.toArray();
            res.json(coverageArray);
        });

        // GET TRIP-TYPES API
        app.get('/trip-types', async (req, res) => {
            const cursor = tripTypesCollection.find({});
            const coverageArray = await cursor.toArray();
            res.json(coverageArray);
        });

        // SINGLE POST API FOR TRIP-TYPES
        app.get('/trip-types/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const singleTrip = await tripTypesCollection.findOne(query);
            res.send(singleTrip);
        });

        // POST API FOR TRIP-TYPES
        app.post('/trip-types', async (req, res) => {
            const newUser = req.body;
            const result = await tripTypesCollection.insertOne(newUser);
            res.json(result)
        });

        // GET TRIPS API
        app.get('/trips', async (req, res) => {
            const cursor = tripCollection.find({});
            const tripArray = await cursor.toArray();
            res.send(tripArray);
        });

        // ADD API FOR TRIP
        app.post('/trips', async (req, res) => {
            const trip = req.body;
            const result = await tripCollection.insertOne(trip);
            res.json(result);
        });

        // TRIPS SINGLE API
        app.get('/trips/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const findStatus = await tripCollection.findOne(query);
            res.send(findStatus);
        });

        // UPDATE TRIPS API
        app.put('/trips/:id', async (req, res) => {
            const id = req.params.id;
            const updatedStatus = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {
                    status: updatedStatus.status,
                    tripName: updatedStatus.tripName
                },
            };
            const result = await tripCollection.updateOne(filter, updateDoc)
            res.send(result)
        });

        // DELETE API FOR TRIPS
        app.delete('/trips/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await tripCollection.deleteOne(query);
            res.json(result);
        })
    } finally {
        // await client.close();  
    }
}
europeTour().catch(console.dir);

// ENSURE SERVER RUNNING
app.get('/', (req, res) => {
    res.send('Server running for Europe Tour')
});

// WHICH PORT SERVER ON
app.listen(port, () => {
    console.log('server running for Europe Tour port ', port)
});
