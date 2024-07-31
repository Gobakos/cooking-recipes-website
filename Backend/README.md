# Backend

This project was generated with [Node.js](https://nodejs.org/) version 20.12.2.

## Start Server

1. After installing dependencies, run `node server.js` to start the server.
2. Access the application via `http://localhost:3000` in your browser or API client.

## Endpoints

### Lists with ...

- **GET /api/v1/getrecipes**: 6 random recipes.
- **GET /api/v1/getcategories**: categories.
- **GET /api/v1/getsubcategories**: subcategories.
- **GET /api/v1/getingredients**: ingredients.
- **GET /api/v1/gettags**: tags.
- **GET /api/v1/getrecipeingredientdescriptions**: measures.

### Recipes with a specific  ...

- **GET /api/v1/getrecipe**: ID.
- **GET /api/v1/getrecipesbyname**: title.
- **GET /api/v1/getcategory**: category.
- **GET /api/v1/getsubcategory**: subcategory.
- **GET /api/v1/getrecipesfromtag**: tag.

### User

- **GET /api/v1/getmyrecipes**: Returns the recipes of a specific user.
- **POST /api/v1/addrecipe**: Adds a new recipe.
- **POST /api/v1/editrecipe**: Edits an existing recipe.
- **DELETE /api/v1/getmyrecipes**: Deletes an existing recipe.

### Authentication

- **POST /api/auth/register**: Adds a new user.
- **POST /api/auth/login**: Login of an existing user.
