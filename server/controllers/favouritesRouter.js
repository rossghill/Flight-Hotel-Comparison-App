const express = require('express');
const favouritesRouter = new express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, function(err, client){
  const db = client.db('go_app_db');
  console.log('Connected To go_app_');

//get favourites
  favouritesRouter.get('/favourites', function(req, res) {
    const collection = db.collection('favourite_packages');
    collection.find({}).toArray(function(err, docs) {
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(docs);
    });
  });

//add favourite
favouritesRouter.post('/favourites', function(req, res){
  const collection = db.collection('favourite_packages');
  const favouriteToSave = req.body;
  console.log(req);
  collection.save(favouriteToSave, function(err, result){
    if(err){
      console.log(err);
      res.status(500);
      res.send();
    }
    res.status(201);
    res.json(result.ops[0]);
    res.send();
    console.log('Saved to Database');
  });
});

//update favourite:
  favouritesRouter.put('/favourites/:id', function(req, res){
    const collection = db.collection('favourite_packages');
    const objectId = new ObjectID(req.params.id);
    const filterObject = {_id: objectId};
    const updatedData = req.body;
    collection.update(filterObject, updatedData, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.send();
    });
  });


//delete favourite
  favouritesRouter.delete('/favourites/:id', function(req, res){
    const collection = db.collection('favourite_packages');
    const objectId = new ObjectID(req.params.id);
    const filterObject = {_id: objectId};
    collection.deleteMany(filterObject, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    });
  });

//delete all favourites
  favouritesRouter.delete('/favourites', function(req, res){
    const collection = db.collection('favourite_packages');
    const filterObject = {};
    collection.deleteMany(filterObject, function(err, result){
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


module.exports = favouritesRouter;
