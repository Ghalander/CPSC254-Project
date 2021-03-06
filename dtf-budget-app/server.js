const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());

const TABLE = 'shipment';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('bootlegger.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the bootlegger SQlite database.');
});

//this is just a test to retrieve all data from the database
//.all() makes a callback after all results are queried
//.each() makes a callback for each subsequent result from the query

app.put('/api/type', (req, res) =>{
  var type = req.body.drinkType;
  if(type === "any" ){
    var qry = 'SELECT * FROM '+ TABLE +';';
  }
  else{
    var qry = 'SELECT * FROM '+ TABLE +' WHERE type=\''+ type +'\';';
  }
  db.serialize(() => {
    db.all(qry, (err, row)=>{
      if(err){
        console.error(err.message);
      }
      res.send({ express: row });
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
