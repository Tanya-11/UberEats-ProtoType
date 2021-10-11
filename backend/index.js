const express = require("express");
const path = require("path")
const session = require("express-session");
const db = require('./utils/database');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const multer = require('multer')
const fs = require('fs')
const PORT = 3001;
//process.env.PORT || 3001;
// const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});
const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: filefilter,
  // limits: { fileSize: 1000000 }
});

app.use('/images', express.static('images'));
app.use(
  cors(
    {
      origin: 'http://3.19.240.173:3000',
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
  duration: 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
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
  db.query(api, [req.body.email],
    async (err, result) => {
      try {
        console.log(result);
        if (result && result?.length > 0) {
          console.log("result-", typeof (result[0].password));
          const validPassword = await bcrypt.compare(req.body.password, result[0].password);
          console.log("com", validPassword);
          if (validPassword) {
            req.session.user = result;
            res.status(200).json(result);
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
  }
  else {
    api = 'SELECT * from restaurant WHERE restId=?';
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
  console.log(req.body);
  let sql = `SELECT DISTINCT r.restId, r.restName ,r.image, r.deliveryMode
  FROM dishes as d JOIN restaurant as r
  ON r.restId = d.restRef AND r.city LIKE "%${req.body.city}%" 
  AND r.deliveryMode LIKE "%${req.body.mode}%" 
  AND d.category LIKE "%${req.body.category}%"
  AND (d.dishName LIKE "%${req.body.searchTabText}%"
  OR r.restName LIKE "%${req.body.searchTabText}%")`;
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

// app.post('/dashboard', (req, res) => {
//   console.log(req.body);
//   let sql = `SELECT * FROM restaurant
//     WHERE city LIKE "%${req.body.city}%" 
//     AND deliveryMode LIKE "%${req.body.mode}%" LIMIT 2`;
//   db.query(sql, (err, resp) => {
//     if (err) {
//       res.status(400).json(err);
//       console.log(err);
//     }
//     else {
//       res.status(200).json(resp);
//       // result.push(resp);
//       //.json(result);
//       //console.log("res2",result);
//     }
//   })
// });

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
  let sql = `INSERT INTO orders(orderStatus, custId, dishId,dishName,restId, quantity, price, date, address) Values
   (?,?,?,?,?,?,?,?,?)`;
  db.query(sql, [req.body.orderStatus, req.body.custId, req.body.dishId, req.body.dishName, req.body.restId, req.body.quantity, req.body.price, req.body.date, req.body.address], (err, result) => {
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
  let sql = ''
  if (req.body.user === 'restId')
    sql = `SELECT
    count(orderId) as quantity, dishName, custId, sum(price) as price, date, orderStatus
    FROM orders WHERE restId = ? group by date`;
  if (req.body.user === 'custId')
    sql = `SELECT 
    count(orderId) as quantity, dishName, custId, sum(price) as price, date, orderStatus
     FROM orders WHERE custId = ?  group by date`;
  db.query(sql, [req.body.email], (err, result) => {
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
  console.log(req.body);
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

  let sql = `UPDATE customer SET name = ?, email= ?, phone = ?, city = ?, state = ?, country = ?, nickName = ? WHERE (email = ?)`;
  db.query(sql, [req.body.name, req.body.email, req.body.phone, req.body.city, req.body.state, req.body.country, req.body.nickName, req.body.custId],
    (err, result) => {
      if (err) {
        res.status(400).json(err);

        console.log(`Error in fetching data:${err}`);
      }
      else {
        res.status(200).json(result);
        // console.log(result);
      }
    })
});



app.post('/get-rest-data', (req, res) => {
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

app.post('/set-rest-data', (req, res) => {
  console.log(req.body.restData);
  const {
    restName, restId,
    phoneNo,
    addressLine,
    city,
    state,
    country,
    description,
    openHrs,
    deliveryMode
  } = req.body.restData;
  let sql = `UPDATE restaurant SET
    restName = ?,
    restId  = ?,
    phoneNo  = ?,
    addressLine = ?,
    city = ?,
    state = ?,
    country = ?,
    description = ?,
    openHrs = ?,
    deliveryMode = ?
  WHERE restId= ?`;
  db.query(sql, [restName,
    restId,
    phoneNo,
    addressLine,
    city,
    state,
    country,
    description,
    openHrs,
    deliveryMode, restId], (err, result) => {
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

app.get('/get-orderStatus', (req, res) => {
  let sql = `SELECT * FROM orderStatus`;
  db.query(sql, (err, result) => {
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


app.post('/set-order-status', (req, res) => {
  console.log(req.body.orderStatus);
  let sql = `UPDATE orders SET orderStatus = ?, date= ?  where orderId=?`;
  db.query(sql, [req.body.orderStatus, req.body.date, req.body.orderId], (err, result) => {
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

app.post('/get-dishes', (req, res) => {
  console.log(req.body.orderStatus);
  let sql = `SELECT * FROM dishes  where restRef=?`;
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

app.post('/update-dishData', (req, res) => {
  console.log(req.body);
  let sql = '';
  if (req.body.dishId && req.body.dishId > 0) {
    sql = `UPDATE dishes SET dishName = ?,  ingredients = ?, price= ?, description= ?, category= ?
   where dishId=${req.body.dishId}`;
  }
  else {
    sql = `INSERT INTO dishes(dishName,ingredients,price,description,category,restRef) VALUES(?,?,?,?,?,?)`;
  }

  console.log(sql)

  db.query(sql, [req.body.dishName, req.body.ingredients, req.body.price, req.body.description, req.body.category, req.body.restRef], (err, result) => {
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
/**
 */
app.post('/get-orders-list', (req, res) => {
  let sql = `SELECT count(o.orderId) as quantity, o.dishName, o.custId, sum(o.price) as price, r.restName, o.date, o.orderStatus, s.orderStatusTitle
  FROM orders as o 
  JOIN orderStatus as s on o.orderStatus = s.orderStatusId 
  JOIN restaurant as r on r.restId = o.restId
  group by o.date;`;
  db.query(sql, [req.body.email], (err, result) => {
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

app.post('/get-view-receipt', (req, res) => {
  console.log(req.body.date);
  let sql = `SELECT sum(price) as total, price, dishName,quantity FROM orders WHERE date=?`;
  db.query(sql, [req.body.date], (err, result) => {
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

app.post('/upload-pic', upload.single('image'), (req, res) => {
  console.log('print' + req.body.custId);
  let param = '';
  let sql = ''
  if (req.body.custId) {
    sql = "UPDATE customer SET image=? where email=?"
    param = req.body.custId
  }
  else {
    sql = "UPDATE restaurant SET image=? where restId=?"
    param = req.body.restId
  }
  console.log('file' + req.file.path);
  console.log(param);
  console.log(sql);
  //param = "food@gmail.com"
  db.query(sql, [req.file.path, param], (err, result) => {
    if (err) {
      res.status(400).json(err);
      console.log(`Error in setting data:${err}`);
    }
    else {
      res.status(200).json(req.file.path);
      console.log(JSON.stringify(result));
    }
  })
});






app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});