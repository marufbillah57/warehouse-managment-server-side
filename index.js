const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.byvnp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db('foodExpress').collection('user');


        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const equipments = await cursor.toArray();
            res.send(equipments);
        });

        app.get('/product/:id', async(req, res) => {
            const id = req.params.id;
            const query={_id: ObjectId(id)};
            const equipment = await productCollection.findOne(query);
            res.send(equipment);
        });

        // POST
        app.post('/product', async(req, res) => {
            const newEquipment = req.body;
            const result = await productCollection.insertOne(newEquipment);
            res.send(result);
        });

        // DELETE
        app.delete('/product/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await productCollection.deleteOne(query);
            res.send(result);
        });

    }
    finally {

    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running server');
});

app.listen(port, () => {
    console.log('Listening to port 5000');
});

