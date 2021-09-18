const express = require("express");

const PORT = 3001;
//process.env.PORT || 3001;
const db = require('./utils/database');
const app = express();
const cors= require('cors');
app.use(cors());
app.use(express.json());



// db.execute( 'INSERT INTO customer(name,dob,email,phone, city, state, country, image) VALUES (?,?,?,?,?,?,?,?)',
// ['TANYA', '1995-12-20', 'tanya@getMaxListeners.com', 6676676667, 'San Jose', 'California', 'USA','']
// //   'INSERT INTO  order-status (order-status-id, order-status-title) VALUES (??,??)',
// // [1,'New']
// ).then( res=>{
//   console.log("success"
//  // + JSON.stringify(res[0])
//   );
// }
// )
// .catch(err => console.log(err)
// )
/** 
db.execute('SELECT * FROM customer').then( res=>{
  console.log("success"
  + JSON.stringify(res[0]));
}
)
*/

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






app.post('/create',(req,res)=>{
  console.log("request made"+JSON.stringify(req.body));
  const name =req.body.name;
  const dob = req.body.dob;
  const email = req.body.email;
  const phoneNo = req.body.phoneNo;
  const city = req.body.city;
  const state = req.body.state;
  const country= req.body.country;
  const imageUrl = req.body.imageUrl;
 // var sql = `INSERT INTO user_profile_table (email, name, password) VALUES ('${req.body.email.toUpperCase()}', '${req.body.name}', '${passwordHash.generate(req.body.password)}');`;
  db.query
  (
    'INSERT INTO customer(name,dob,email,phone, city, state, country, image) VALUES (?,?,?,?,?,?,?,?)',
[name, dob, email, phoneNo, city, state, country,imageUrl],
  (err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send("Values inserted");
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});