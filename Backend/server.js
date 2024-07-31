const express = require('express');
const app = express();
const fs = require('fs');
const db = require('./app/models');
const {initialize} = require('./app/help/help');
const http = require('http');
var cors = require('cors')



db.sequelize.sync({force:true, alter:true}).then(async ()=>{
  await initialize();
  console.log('Synced db')
}).catch((err)=>{
    console.log(err)
})
var corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST','DELETE']
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.static('uploads')); //Serves for static folders


require('./app/routes/recipes.routes')(app)
require('./app/routes/auth.routes')(app)
app.get("*", function(req, res, next) {
  res.redirect("http://" + req.headers.host + req.path);
});




http.createServer(app).listen(3000, function() {
  console.log("Express TTP server listening on port 3000");
});
