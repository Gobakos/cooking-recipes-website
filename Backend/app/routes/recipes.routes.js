const controller = require("../controllers/recipes.controller")
const controller2 = require("../controllers/categories.controller")

module.exports=function(app){

    app.get("/api/v1/getrecipes",controller.getRecipes) //Returns all recipes 
    app.get("/api/v1/getrecipe",controller.getRecipe)
    app.get("/api/v1/getcategory",controller2.getCategory)
    app.get("/api/v1/getcategories",controller2.getCategories)
    app.get("/api/v1/getsubcategories",controller2.getSubCategories)
    app.get("/api/v1/getsubcategory",controller2.getSubCategory)
    app.get("/api/v1/getingredients",controller.getIngredients)
    app.get("/api/v1/gettags",controller.getTags)
    app.get("/api/v1/getrecipeingredientdescriptions",controller.getRecipeIngredientDescriptions)
    app.get("/api/v1/getmyrecipes",controller.getMyRecipes) //Return user's recipes
    app.get("/api/v1/getrecipesfromtag", controller.getRecipesFromTag)
    app.get("/api/v1/getrecipesbyname",controller.getRecipesByName)
    app.get("/api/v1/getphoto",controller.getPhoto)
    app.post("/api/v1/addrecipe",controller.addRecipe)
    app.post("/api/v1/photoupload",controller.uploadPhoto)
    app.post("/api/v1/editrecipe",controller.editRecipe)
    app.delete("/api/v1/getmyrecipes",controller.deleteRecipe)
}