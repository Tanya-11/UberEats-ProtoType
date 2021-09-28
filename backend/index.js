const express = require("express");

const PORT = 3001;
//process.env.PORT || 3001;
// const bodyParser = require('body-parser');
const router = express.Router();
const db = require('./utils/database');
const app = express();
const cors = require('cors');
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());

app.use(
  cors(
    //   {
    //   origin: 'http://localhost:3000',
    //   credentials: true,
    // }
  )
);

// db.connect((err)=>{
//   if(err) throw err;
//   console.log('Connection to DB established');
// })
const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * All Get Calls
 */


/**
 * All POST Calls
 */
app.post('/login', (req, res) => {
  console.log("email-", typeof (req.body.password));
  // let sql = `SELECT * FROM customer WHERE UPPER(email) = '${req.body.email}'`;
  db.query('SELECT * from customer WHERE email=?', [req.body.email],
    async (err, result) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      if (result) {
        console.log("result-", typeof (result[0].password));
        const validPassword = await bcrypt.compare(req.body.password, result[0].password);
        console.log("com", validPassword);
        if (validPassword) res.status(200).json("Valid User, Successfully loggedIn");
        else res.status(400).send("Wrong Password");
      }
      else res.json({});
    })
});

//Route to handle Post Request Call
app.post('/signup', async (req, res) => {
  console.log(req.body);
  const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
  console.log("encryptedPassword", encryptedPassword);
  db.query('INSERT INTO customer(name,email,password) VALUES (?,?,?)',
    [req.body.name, req.body.email, encryptedPassword],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      }
      else {
        res.status(200).json(result);
        console.log(result);
      }
    })
});

app.post('/getDataBySearchTabTextForDish', (req, res) => {
  //  if(req?.body?.searchTabText!=='') {
  let sql = `SELECT DISTINCT  d.dishName, d.restRef, r.restName 
  FROM dishes as d JOIN restaurant as r
  ON r.restId = d.restRef AND r.city LIKE "%${req.body.city}%" 
  AND r.deliveryMode LIKE "%${req.body.mode}%" 
  AND d.dishName LIKE "%${req.body.searchTabText}%" 
  LIMIT 4`;
  db.query(sql, (err, resp) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    else {
      res.status(200).json(resp);
      console.log(resp);
    }
  });
  //  }

});

app.post('/getDataForRestDish', (req, res) => {
  console.log(req.body);
  //  if(req?.body?.searchTabText!=='') {
  let sql = `SELECT   d.dishId, d.dishName, d.ingredients, d.price, r.restName, r.restId, r.addressLine,
  r.description, r.openHrs
  FROM dishes as d JOIN restaurant as r
  ON r.restId = d.restRef AND r.city LIKE "%${req.body.city}%" 
  AND r.deliveryMode LIKE "%${req.body.mode}%" 
  AND r.restId LIKE "%${req.body.searchTabText}%"`;
  db.query(sql, (err, resp) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    else {
      res.status(200).json(resp);
      console.log("!!!!", resp);
    }
  });
  //  }

})

app.post('/getDataForRest', (req, res) => {
  console.log(req.body);
  //  if(req?.body?.searchTabText!=='') {
  let sql = `SELECT DISTINCT restName, restId
  FROM  restaurant WHERE
 city LIKE "%${req.body.city}%" 
  AND deliveryMode LIKE "%${req.body.mode}%" 
 `;
  db.query(sql, (err, resp) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    else {
      res.status(200).json(resp);
      console.log("!!!!", resp);
    }
  });
  //  }

})

app.post('/dashboard', (req, res) => {
  console.log(req.body);
  let sql = `SELECT * FROM restaurant
    WHERE city LIKE "%${req.body.city}%" 
    AND deliveryMode LIKE "%${req.body.mode}%" LIMIT 2`;
  db.query(sql, (err, resp) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    }
    else {
      res.status(200).json(resp);
      // result.push(resp);
      //.json(result);
      //console.log("res2",result);
    }
  })
});

app.post('/favorites-add', (req, res) => {
  console.log("fav", req.body);
  const [user, restaurant] = req.body;
  console.log(user, restaurant);
  let sql = `INSERT fav_restaurant (custID, restID) values(?,?)`;
  db.query(sql, [user, restaurant], (err, result) => {
    if (err) {
      res.status(400).json(err);
      console.log(`Invalid User or Restaurant Name${err}`);
    }
    else {
      res.status(200).json(result);
      console.log(result);
    }
  })
});
app.post('/favorites-delete', (req, res) => {
  const [user, restaurant] = req.body;
  let sql = `DELETE FROM fav_restaurant WHERE custId = ? AND restId = ?`;
  db.query(sql, [user, restaurant], (err, result) => {
    console.log(res);
    if (err) {
      res.status(400).json(err);
      console.log(`Invalid User or Restaurant Name${err}`);
    }
    else {
      res.status(200).json(result);
      console.log(result);
    }
  })
});

app.post('/get-favorites', (req, res) => {
  let sql = `SELECT * FROM fav_restaurant WHERE custId = ?`;
  db.query(sql, [req.body.user, req.body.restaurant], (err, result) => {
    if (err) {
      res.status(400).json(err);
      console.log(`Invalid User Name:${err}`);
    }
    else {
      res.status(200).json(result);
      console.log(result);
    }
  })
});







//   'INSERT INTO  order-status (order-status-id, order-status-title) VALUES (??,??)',
// [1,'New']




// db.execute('SELECT * FROM customer').then( res=>{
//   console.log("success"
//   + JSON.stringify(res[0]));
// }
// )


// db.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


// db.connect((err) => {
//   if (err) throw err;
//   let sql = `SELECT * FROM ??`;
//   const values = ['customer'];

//   // sends queries and receives results
//   db.query(sql, values, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     db.end();
//   });
// });






// app.post('/create',(req,res)=>{
//   console.log("request made"+JSON.stringify(req.body));
//   const name =req.body.name;
//   const dob = req.body.dob;
//   const email = req.body.email;
//   const phoneNo = req.body.phoneNo;
//   const city = req.body.city;
//   const state = req.body.state;
//   const country= req.body.country;
//   const imageUrl = req.body.imageUrl;
//  // var sql = `INSERT INTO user_profile_table (email, name, password) VALUES ('${req.body.email.toUpperCase()}', '${req.body.name}', '${passwordHash.generate(req.body.password)}');`;
//   db.query
//   (
//     'INSERT INTO customer(name,dob,email,phone, city, state, country, image) VALUES (?,?,?,?,?,?,?,?)',
// [name, dob, email, phoneNo, city, state, country,imageUrl],
//   (err,result)=>{
//     if(err){
//       console.log(err);
//     }
//     else{
//       res.send("Values inserted");
//     }
//   })
// })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});