/*
europTour
jOVs9sdKvzAchg2F
*/

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 4000;

require('dotenv').config();

// middleware
app.use(cors())
app.use(express.json())

// DB connection
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

        // GET API
        app.get('/banner', async (req, res) => {
            const cursor = bannerCollection.find({});
            const bannerArray = await cursor.toArray();
            res.json(bannerArray);
        });

        app.get('/quotes', async (req, res) => {
            const cursor = quotesCollection.find({});
            const quotesArray = await cursor.toArray();
            res.json(quotesArray);
        });

        app.get('/coverage-area', async (req, res) => {
            const cursor = coverageCollection.find({});
            const coverageArray = await cursor.toArray();
            res.json(coverageArray);
        });

        app.get('/trip-types', async (req, res) => {
            const cursor = tripTypesCollection.find({});
            const coverageArray = await cursor.toArray();
            res.json(coverageArray);
        });

        // SINGLE POST API
        app.get('/trip-types/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const singleTrip = await tripTypesCollection.findOne(query);
            res.send(singleTrip);
        });

        // POST TRIP
        app.post('/trip-types', async (req, res) => {
            const newUser = req.body;
            const result = await tripTypesCollection.insertOne(newUser);
            res.json(result)
        });

        // GET TRIP API
        app.get('/trips', async (req, res) => {
            const cursor = tripCollection.find({});
            const tripArray = await cursor.toArray();
            res.send(tripArray);
        });

        // ADD TRIP API
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

        // UPDATE API
        app.put('/trips/:id', async (req, res) => {
            const id = req.params.id;
            const updatedStatus = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {
                    status: updatedStatus.status,
                },
            };
            const result = await tripCollection.updateOne(filter, updateDoc)
            res.send(result)
        });

        // DELETE API
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

app.get('/', (req, res) => {
    res.send('Server running for Europe Tour')
});

app.listen(port, () => {
    console.log('server running for Europe Tour port ', port)
});
