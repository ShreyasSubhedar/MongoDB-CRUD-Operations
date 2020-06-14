'use strict';

const INSERT="INSERT";
const DELETE="DELETE";
const UPDATE="UPDATE";
const READ="READ";

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/demo";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("demo");

  var input = process.argv[2];
  switch(input){

    case INSERT:
        var myCar = new Object();
        myCar.make = process.argv[3];
        myCar.model = process.argv[4];
        myCar.year = process.argv[5];
        console.log(myCar);
        dbo.collection("cars").insertOne(myCar, function(err, res) {
          if (err) throw err;
          console.log("Document inserted");
        });
        db.close();
        break;
    case UPDATE:
        break;
    case DELETE:
        var myQuery = { year: process.argv[3] };
        dbo.collection("cars").deleteOne(myQuery, function(err, obj) {
          if (err) throw err;
          console.log("Document deleted");
          db.close();
        });
        break;
    case READ:
        dbo.collection("cars").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
          db.close();
        });
        break;
    default:
        break;
        
  }
  db.close();
});