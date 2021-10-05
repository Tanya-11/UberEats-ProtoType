const express = require("express");
const session = require("express-session");
const db = require('./utils/database');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const PORT = 3001;
//process.env.PORT || 3001;
// const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
//app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());

app.use(
  cors(
    {
      origin: 'http://localhost:3000',
      methods: ["GET", "POST"],
      credentials: true,
    }
  )
);
app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "some-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 200000000000000
  }
}))

// db.connect((err)=>{
//   if(err) throw err;
//   console.log('Connection to DB established');
// })
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const saltRounds = 10;
/**
 * All Get Calls
 */


/**
 * All POST Calls
 */



app.post('/signin', (req, res) => {
  console.log("email-", (req.body));
  let api = '';
  if (req.body.persona === 'customer') api = 'SELECT * from customer WHERE email=?';
  else api = 'SELECT * from restaurant WHERE restId=?'
  // let sql = `SELECT * FROM customer WHERE UPPER(email) = '${req.body.email}'`;
  db.query(api, [req.body.email],
    async (err, result) => {
      console.log('%%%%%%', result);
      console.log('######', err);
      try {
        // if (err) {
        //   console.log(err, "%%%%%%%%%%%%%");
        //   res.status(400).json('Wrong Username or password');
        //   return;
        // }
        if (result && result?.length > 0) {
          console.log("result-", typeof (result[0].password));
          const validPassword = await bcrypt.compare(req.body.password, result[0].password);
          console.log("com", validPassword);
          if (validPassword) {
            req.session.user = result;
            console.log("rrrr", req.session.user);
            res.status(200).json("Valid User, Successfully loggedIn");
          }
          else res.status(401).json("Wrong Password");
        }
        else res.status(400).json('Wrong Username or password');
      }
      catch (error) {
        console.log(error);
        throw error;
      }
    })

});

//Route to handle Post Request Call
app.post('/signup', async (req, res) => {
  let api = '';
  let response = [];
  const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);

  if (req.body.persona === 'customer') {
    api = 'SELECT * from customer WHERE email=?';
    // response = [req.body.email]
  }
  else {
    api = 'SELECT * from restaurant WHERE restId=?';
    // response = [req.body.email]
  }
  db.query(api, [req.body.email],
    (err, result) => {
      if (result && result.lenth > 0) {
        return res.status(409).json('User Exists');
      }
      else {
        if (req.body.persona === 'customer') {
          api = 'INSERT INTO customer(name,email,password) VALUES (?,?,?)';
          response = [req.body.name, req.body.email, encryptedPassword]
        }
        else {
          api = 'INSERT INTO restaurant(restName,restId,password) VALUES (?,?,?)';
          response = [req.body.name, req.body.email, encryptedPassword, req.body.city]
        }

        console.log(req.body);
        console.log("encryptedPassword", encryptedPassword);
        db.query(api, [...response],
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
  const { user, restaurant } = req.body;
  console.log("fav", user);
  console.log("fav", restaurant);
  //console.log(user, restaurant);
  let sql = `INSERT INTO fav_restaurant (custId, restId) values(?,?)`;
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
  const { user, restaurant } = req.body;
  let sql = `DELETE FROM fav_restaurant WHERE custId = ? AND restId = ?`;
  db.query(sql, [user, restaurant], (err, result) => {
    //  console.log(res);
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
  db.query(sql, [req.body.email], (err, result) => {
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
app.post('/place-orders', (req, res) => {
  let sql = `INSERT INTO orders(orderStatus, custId, dishId,restId, quantity) Values
   (?,?,?,?,?)`;
  db.query(sql, [req.body.orderStatus, req.body.custId, req.body.dishId, req.body.restId, req.body.quantity], (err, result) => {
    if (err) {
      res.status(400).json(err);
      console.log(`Error in Inserting Order:${err}`);
    }
    else {
      res.status(200).json('Updated Successfully');
      console.log(result);
    }
  })
});

app.post('/get-orders', (req, res) => {
  let sql = `SELECT * FROM orders WHERE custId = ?`;
  db.query(sql, [req.body.custId], (err, result) => {
    if (err) {
      res.status(400).json(err);
      console.log(`Error in fetching data:${err}`);
    }
    else {
      res.status(200).json(result);
      console.log(result);
    }
  })
});


app.post('/get-address', (req, res) => {
  let sql = `SELECT address1, address2 FROM customer WHERE email = ?`;
  db.query(sql, [req.body.custId], (err, result) => {
    if (err) {
      res.status(400).json(err);
      console.log(`Error in fetching data:${err}`);
    }
    else {
      res.status(200).json(result);
      console.log(result);
    }
  })
});

app.post('/set-address', (req, res) => {
  let sql = `UPDATE customer SET address1 = ?, address2= ? WHERE (email = ?)`;
  db.query(sql, [req.body.address1 || '', req.body.address2 || '', req.body.custId], (err, result) => {
    if (err) {
      res.status(400).json(err);
      console.log(`Error in fetching data:${err}`);
    }
    else {
      res.status(200).json(result);
      console.log(result);
    }
  })
});


app.post('/get-profile', (req, res) => {
  let sql = `SELECT * FROM customer WHERE email = ?`;
  db.query(sql, [req.body.custId], (err, result) => {
    if (err) {
      res.status(400).json(err);

      console.log(`Error in fetching data:${err}`);
    }
    else {
      res.status(200).json(result);
      console.log(result);
    }
  })
});
app.post('/set-profile', (req, res) => {
  console.log(req.body);
  // const [name, val] = [{ ...req.body }, custId];

  let sql = `UPDATE customer SET name = ?, email= ?, phone = ?, city = ?, state = ?, country = ?  WHERE (email = ?)`;
  db.query(sql, [req.body.name, req.body.email, req.body.phone, req.body.city, req.body.state, req.body.country, req.body.custId],
    (err, result) => {
      if (err) {
        res.status(400).json(err);

        console.log(`Error in fetching data:${err}`);
      }
      else {
        res.status(200).json(result);
        console.log(result);
      }
    })
});



app.post('/get-rest-fav', (req, res) => {
  let sql = `SELECT * FROM restaurant WHERE restId = ?`;
  db.query(sql, [req.body.restId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    }
    else {
      console.log(result);
      res.status(200).json(result);
    }
  })
})








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