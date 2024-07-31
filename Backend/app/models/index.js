const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX),
      min: parseInt(process.env.DB_POOL_MIN),
      acquire: process.env.DB_POOL_ACQUIRE,
      idle: process.env.DB_POOL_IDLE
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./user.model.js")(sequelize, Sequelize);
db.Recipe = require("./recipe.model.js")(sequelize, Sequelize);
db.Ingredient = require("./ingredient.model.js")(sequelize, Sequelize);
db.Category = require("./category.model.js")(sequelize, Sequelize);
db.Subcategory = require("./subcategory.model.js")(sequelize, Sequelize);
db.recipe_ingredients = require("./recipe_ingredients.model.js")(sequelize, Sequelize);
db.Tag = require("./tag.model.js")(sequelize, Sequelize);
db.recipe_tags = require("./recipe_tag.model.js")(sequelize, Sequelize);

User = db.User
Recipe = db.Recipe
Ingredient = db.Ingredient
Category = db.Category
Subcategory = db.Subcategory
recipe_ingredients = db.recipe_ingredients
recipe_tags = db.recipe_tags
Tag = db.Tag


db.User.hasMany(db.Recipe, { foreignKey: 'fuser_id',as:'recipes' });
db.Recipe.belongsTo(db.User, { foreignKey: 'fuser_id',as:'user' });

db.Category.hasMany(db.Recipe, { foreignKey: 'fcategory_id',as:'recipes' });
db.Recipe.belongsTo(db.Category, { foreignKey: 'fcategory_id',as:'category' });

db.Category.hasMany(db.Subcategory, { foreignKey: 'fcategory_id',as:'subcategories' });
db.Subcategory.belongsTo(db.Category, { foreignKey: 'fcategory_id',as:'category' });

db.Subcategory.hasMany(db.Recipe, { foreignKey: 'fsubcategory_id',as:'recipies' });
db.Recipe.belongsTo(db.Subcategory, { foreignKey: 'fsubcategory_id',as:'subcategory' });

db.Recipe.belongsToMany(db.Ingredient, { through: 'recipe_ingredients', foreignKey: 'frecipe_id',as:'ingredients'});
db.Ingredient.belongsToMany(db.Recipe, { through: 'recipe_ingredients', foreignKey: 'fingredient_id',as:'recipies' } );

db.Recipe.belongsToMany(db.Tag, { through: 'recipe_tags', foreignKey: 'frecipe_id',as:'tags' });
db.Tag.belongsToMany(db.Recipe, { through: 'recipe_tags', foreignKey: 'ftag_id',as:'recipies' });

module.exports = db;