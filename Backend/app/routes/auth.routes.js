const controller = require("../controllers/auth.controller")

module.exports=function(app){

    app.post("/api/auth/register",controller.register)
    app.post("/api/auth/login",controller.login)
}