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
const uri = "mongodb+srv://europTour:jOVs9sdKvzAchg2F@cluster0.cmhhb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function europeTour() {
    try {
        await client.connect();

        const database = client.db('europeTour');
        const bannerCollection = database.collection("banner");

        // GET API
        app.get('/banner', async (req, res) => {
            const cursor = bannerCollection.find({});
            const usersArray = await cursor.toArray();
            res.send(usersArray);
        });

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
