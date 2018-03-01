const express = require('express');
const parser = require('body-parser');
const server = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function(err, client){
  if(err){
    console.log(err);
    return;
  }
  const db = client.db('bucket_list');
  console.log('Connected to Database');

//Create:
  server.post('/api/bucketlist', function(req, res){
    const destinationCollection = db.collection('destinations');
    const destinationToSave = req.body;
    destinationCollection.save(destinationToSave, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(201);
      res.json(result.ops[0]);
      console.log('Saved to Database');
    });
  });

//Read:
  server.get('/api/bucketlist', function(req, res){
    const destinationCollection = db.collection('destinations');
    destinationCollection.find().toArray(function(err, allDestinations){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(allDestinations);
    });
  });

//Update:
  server.put('/api/bucketlist/:id', function(req, res){
    const destinationCollection = db.collection('destinations');
    const objectId = new ObjectID(req.params.id);
    const filterObject = {_id: objectId};
    const updatedData = req.body;
    destinationCollection.update(filterObject, updatedData, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.send();
    });
  });

//Delete (all):
  server.delete('/api/bucketlist', function(req, res){
    const destinationCollection = db.collection('destinations');
    const filterObject = {};
    destinationCollection.deleteMany(filterObject, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    });
  });

//Delete (individual):
  server.delete('/api/bucketlist/:id', function(req, res){
    const destinationCollection = db.collection('destinations');
    const objectId = new ObjectID(req.params.id);
    const filterObject = {_id: objectId};
    destinationCollection.deleteMany(filterObject, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    });
  });


});





server.listen(3000, function () {
  console.log('App running on port ' + this.address().port);
});
