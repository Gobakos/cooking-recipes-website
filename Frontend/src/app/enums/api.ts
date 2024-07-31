export enum ApiPath {
  // Base URL of the API server
  HOST = "http://localhost:3000",

  // Authentication endpoints
  REGISTER = "/api/auth/register", // User registration endpoint
  LOGIN = "/api/auth/login", // User login endpoint

  // Recipe endpoints
  GETRECIPES = "/api/v1/getrecipes", // Retrieve recipes endpoint
  GETRECIPE = "/api/v1/getrecipe", // Retrieve single recipe endpoint
  GETRECIPESBYNAME = "/api/v1/getrecipesbyname", // Retrieve recipes by name endpoint
  GETRECIPESBYTAGS = "/api/v1/getrecipesfromtag", // Retrieve recipes by tags endpoint
  GETRECIPESBYCATEGORY = "/api/v1/getcategory", // Retrieve recipes by category endpoint
  GETRECIPESBYSUBCATEGORY = "/api/v1/getsubcategory", // Retrieve recipes by subcategory endpoint

  // User's recipes endpoint
  MYRECIPES = "/api/v1/getmyrecipes",

  // Recipe management endpoints
  ADDRECIPE = "/api/v1/addrecipe", // Add new recipe endpoint
  EDITRECIPE = "/api/v1/editrecipe", // Edit existing recipe endpoint

  // Category endpoints
  GETGATEGORIES = "/api/v1/getcategories", // Retrieve categories endpoint

  // Ingredient endpoints
  GETINGREDIENTS = "/api/v1/getingredients", // Retrieve ingredients endpoint
  GETDESCRIPTIONS = "/api/v1/getrecipeingredientdescriptions", // Retrieve recipe ingredient descriptions endpoint

  // Tag endpoints
  GETTAGS = "/api/v1/gettags", // Retrieve tags endpoint

  // File upload endpoint
  FILEUPLOAD = "/api/v1/photoupload",
}
