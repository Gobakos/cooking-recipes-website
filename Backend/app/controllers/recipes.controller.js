const { encrypt,myDecrypt } = require('../help/help');
const { validateAddRecipe, validateEditRecipe } = require('../help/validator');
const db = require('../models/index')
const { Op } = require('sequelize');
const { sequelize } = require('../models/index');
const Recipe = db.Recipe
const User = db.User
const SubCategory=db.Subcategory
const Tags=db.Tag
const Category = db.Category
const Ingredients=db.Ingredient
const RecipeIngredients=db.recipe_ingredients
const Tag = db.Tag;
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getRecipes=async (req,res)=>{
    const recipes=await Recipe.findAll({
        include:[
            {
                model:User,
                as:'user',
                attributes:['username','user_id']
            },
            {
                model:Category,
                as:'category',
                attributes:['category_name']
            },
            {
                model:SubCategory,
                as:'subcategory',
                attributes:['subcategory_name']
            },
            {
                model:Ingredients,
                as:'ingredients',
                through: { attributes: {
                    exclude:['id','createdAt','updatedAt','frecipe_id','fingredient_id']
                 } },
                attributes:{
                    exclude:['ingredient_id','createdAt','updatedAt']
                }
            }
        ],
        attributes:{
            exclude:['fuser_id','createdAt','updatedAt','fcategory_id','fsubcategory_id']
        }
    })
    const shuffledRecipes = recipes.sort(() => Math.random() - 0.5);


    const randomRecipes = shuffledRecipes.slice(0, 6);
   return res.status(200).send(randomRecipes)
}


exports.getRecipe=async(req,res) => {
    try {
        const id_recipe = req.query.id;
        const recipe = await Recipe.findOne({
            where: { recipe_id: id_recipe },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['username','user_id']
                },
                {
                    model: Ingredients,
                    as: 'ingredients',
                    through: { attributes: {
                        exclude:['id','createdAt','updatedAt','frecipe_id','fingredient_id']
                     } }, // Exclude through model attributes
                    attributes: { exclude: ['ingredient_id', 'createdAt', 'updatedAt'] }
                },
                {
                    model: Category,
                    as: 'category',
                    attributes: ['category_name']
                },
                {
                    model: SubCategory,
                    as: 'subcategory',
                    attributes: ['subcategory_name']
                },
                {
                    model: Tags,
                    as: 'tags',
                    attributes: ['tag_name']
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'fuser_id']
            }
        });
        
        if (!recipe) {
            return res.status(404).send("Recipe not found");
        }
        return res.status(200).send(recipe);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}


exports.getMyRecipes = async (req, res) => {
    try {
        const user_id = myDecrypt(jwt.decode(req.headers.accesstoken).id);
        if (req.query.id) {
            try{
            const id = req.query.id;
            const recipe = await Recipe.findOne({
                where: { fuser_id: user_id, id: id }
            });
            if(recipe.id==null){
                return res.status(404).send("Not found a recipe!")
            }
            return res.status(200).send(recipe);
        }catch(error){
            return res.status(403).send("Forbidden")
        }
        } else {
            const recipes = await Recipe.findAll({
                where: { fuser_id: user_id }
            });
            return res.status(200).send(recipes);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
}

exports.getRecipesFromTag = async (req, res) => {
    try {
        const tagName = req.query.tag_name;

        //Find the tag
        const tag = await db.Tag.findOne({ where: { tag_name: tagName } });
        if (!tag) {
            return res.status(404).send("Tag not found!");
        }

        //Find all recipes associated with the tag
        const recipes = await Recipe.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['username','user_id']
                },
                {
                    model: Ingredients,
                    as: 'ingredients',
                    through: { attributes: {
                        exclude:['id','createdAt','updatedAt','frecipe_id','fingredient_id']
                     } },
                    attributes: { exclude: ['ingredient_id', 'createdAt', 'updatedAt'] }
                },
                {
                    model: Category,
                    as: 'category',
                    attributes: ['category_name']
                },
                {
                    model: SubCategory,
                    as: 'subcategory',
                    attributes: ['subcategory_name']
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'fuser_id','fsubcategory_id','fcategory_id']
            },
            include: {
                model: Tag,
                as: 'tags',
                where: { tag_name: tag.tag_name }
            }
        });

        return res.status(200).send(recipes);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
};


exports.getIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredients.findAll({
            attributes:{exclude:['createdAt','updatedAt','ingredient_id']}
        });
        return res.status(200).send(ingredients);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

exports.getRecipeIngredientDescriptions = async (req, res) => {
    try {
        const descriptions = await RecipeIngredients.findAll({
            attributes:[
                [sequelize.fn('DISTINCT', sequelize.col('description')), 'description']
            ]
        });
        return res.status(200).send(descriptions);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

exports.getTags = async (req, res) => {
    try {
        //Retrieve all distinct tag_name values from tags table
        const tags = await Tags.findAll({
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.col('tag_name')), 'tag_name']
            ]
        });

        res.status(200).send(tags);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


exports.getRecipesByName=async(req,res)=>{
    try {
        const name = req.query.name;
        const recipes = await Recipe.findAll({
            where: {
                recipe_title: { [Op.like]: `%${name}%` }
            },include:[
                {
                    model:User,
                    as:'user',
                    attributes:['username','user_id']
                },
                {
                    model:Category,
                    as:'category',
                    attributes:['category_name']
                },
                {
                    model:SubCategory,
                    as:'subcategory',
                    attributes:['subcategory_name']
                },
                {
                    model:Ingredients,
                    as:'ingredients',
                    through: { attributes: {
                        exclude:['id','createdAt','updatedAt','frecipe_id','fingredient_id']
                     } },
                    attributes:{
                        exclude:['ingredient_id','createdAt','updatedAt']
                    }
                }
            ],
            attributes:{
                exclude:['fuser_id','id','createdAt','updatedAt','fcategory_id','fsubcategory_id']
            }
        });
        res.status(200).send(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}



exports.addRecipe=async(req,res)=>{
    
    try {
        const { error, value } = validateAddRecipe(req.body);
        if (error) {
            return res.status(400).send(error);
        }
        const user_id = myDecrypt(jwt.decode(req.headers.accesstoken).id);
        if (!user_id) {
            return res.status(400).send("User not found");
        }
        const category = await Category.findOne({ where: { category_name: value.category.category_name } });
        if (!category) {
            return res.status(400).send("Category not found");
        }
        let subcategory = null
        if (value.subcategory!=null){
            subcategory = await SubCategory.findOne({ where: { subcategory_name: value.subcategory } });
        }

        const newRecipe = {
            recipe_title: value.titlo,
            fcategory_id: category.category_id,
            recipe_description: value.perigrafh,
            recipe_portion: value.recipe_portion,
            level: value.level,
            recipe_time_create: value.time_create,
            recipe_time_prepare: value.time_prepare,
            fuser_id: user_id,
            ingredients: value.ingredients,
            tags: value.tags,
            fsubcategory_id: subcategory ? subcategory.subcategory_id : null
        };
        try{
            console.log(newRecipe);
            const createdRecipe = await Recipe.create(newRecipe);
            const photoPath = `http://localhost:3000/api/v1/getphoto?id=${createdRecipe.recipe_id}`;
            await createdRecipe.update({ path: photoPath });

            // Add ingredients to the recipe
            if (value.ingredients && value.ingredients.length > 0) {
                for (const ingredientObj of value.ingredients) {
                    const [ingredient, created] = await Ingredients.findOrCreate({
                        where: { ingredient_name: ingredientObj.ingredient_name },
                    });
                    await createdRecipe.addIngredient(ingredient, {
                        through: {
                            quantity: ingredientObj.quantity,
                            description: ingredientObj.description,
                        },
                    });
                }
            }

            // Add tags to the recipe
            if (value.tags && value.tags.length > 0) {
                for (const tagObj of value.tags) {
                    const [tag, created] = await Tags.findOrCreate({
                        where: { tag_name: tagObj.tag_name },
                    });
                    await createdRecipe.addTag(tag);
                }
            }

            return res.status(201).send({recipe_id:createdRecipe.recipe_id,path:photoPath});

        }catch(error){

            return res.status(500).send(error)
        }
    } catch (error) {

        console.error(error);
        return res.status(500).send("Server Error");
    }
}


exports.getPhoto=async(req,res)=> {
  const picturesDirectory = path.join(__dirname, '../../uploads');
  const id = req.query.id;

  const uuidRegex = /^[a-fA-F0-9-]+$/; //A simple regex for validation of the format of the ID
  if (!id || !id.match(uuidRegex)) {
      return res.status(400).send('Invalid or missing ID parameter');
  }

  fs.readdir(picturesDirectory, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading the directory");
    }

    const matchingFile = files.find((file) => file.startsWith(id)); //Find picture which stats with the same ID as the recipe's ID

    if (matchingFile) {
      const picturePath = path.join(picturesDirectory, matchingFile);
      res.sendFile(picturePath);
    } else {
      res.status(404).send("Picture not found");
    }
  });

  
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
    const destFolder = path.join(__dirname, '../../uploads');
      cb(null, destFolder)
    },
    filename: async (req, file, cb) => {
      cb(null, file.originalname)
    }
});

let uploadFile = multer({
  storage: storage
}).single("photoFile");



exports.uploadPhoto=async(req,res)=>{
        uploadFile(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
              return res.status(400).json({status: 'error', message: "Multer error." });
            } else if (err) {
              console.log(err)
              return res.status(500).json({status: 'error', message: err });
            }
            return res.status(201).send({message:"Upload successfully"})
      })
}

exports.editRecipe = async (req, res) => {
    try {
        // Validate the request
        const { error, value } = validateEditRecipe(req.body);
        if (error) {
            return res.status(400).send(error);
        }

        // Decrypt the userID from the access token
        const user_id = myDecrypt(jwt.decode(req.headers.accesstoken).id);
        if (!user_id) {
            return res.status(400).send("User not found");
        }

        // Find the existing recipe by ID
        const existingRecipe = await Recipe.findOne({ where: { recipe_id: value.recipe_id } });
        if (!existingRecipe) {
            return res.status(404).send("Recipe not found");
        }
        if (existingRecipe.fuser_id !== user_id) {
            return res.status(403).send("Unauthorized");
        }

        // Find the category and subcategory by name
        const category = await Category.findOne({ where: { category_id: value.category.category_id } });
        if (!category) {
            return res.status(400).send("Category not found");
        }

        let subcategory = null
        if (value.subcategory!=null){
            subcategory = await SubCategory.findOne({ where: { subcategory_name: value.subcategory } });
        }

        // Create a new recipe with the edited details
        const updatedRecipe = {
            recipe_title: value.titlo,
            recipe_description: value.perigrafh,
            recipe_portion: value.recipe_portion,
            level: value.level,
            recipe_time_create: value.time_create,
            recipe_time_prepare: value.time_prepare,
            fcategory_id: category.id,
            fsubcategory_id: subcategory ? subcategory.subcategory_id : null
        };

        await existingRecipe.update(updatedRecipe);

        // Remove existing ingredients and tags associations
        await existingRecipe.setIngredients([]);
        await existingRecipe.setTags([]);


        // Add updated ingredients to the recipe
        if (value.ingredients && value.ingredients.length > 0) {
            for (const ingredientObj of value.ingredients) {
                const [ingredient, created] = await Ingredients.findOrCreate({
                    where: { ingredient_name: ingredientObj.ingredient_name },
                });
                await existingRecipe.addIngredient(ingredient, {
                    through: {
                        quantity: ingredientObj.quantity,
                        description: ingredientObj.description,
                    },
                });
            }
        }

        // Add updated tags to the recipe
        if (value.tags && value.tags.length > 0) {
            for (const tagObj of value.tags) {
                const [tag, created] = await Tags.findOrCreate({
                    where: { tag_name: tagObj.tag_name },
                });
                await existingRecipe.addTag(tag);
            }
        }
        if (value.photo!=null){
            const photoPath = `http://localhost:3000/api/v1/getphoto?id=${existingRecipe.recipe_id}`; //First the recipe is created
            await existingRecipe.update({ path: photoPath }); //Then we update the path value to the path with the created recipe's ID
        }
        // Return the newly created recipe
        return res.status(200).send(existingRecipe);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
};


exports.deleteRecipe = async (req, res) => {
    try {
        //Decrypt the user ID from the access token
        const user_id = myDecrypt(jwt.decode(req.headers.accesstoken).id);
        if (!user_id) {
            return res.status(400).send("User not found");
        }

        //Find the existing recipe by ID
        const recipe_id = req.query.id;
        const existingRecipe = await Recipe.findOne({ where: { recipe_id: recipe_id } });
        if (!existingRecipe) {
            return res.status(404).send("Recipe not found");
        }

        //Check if the user is authorized to delete the recipe
        if (existingRecipe.fuser_id !== user_id) {
            return res.status(403).send("Unauthorized");
        }

        //Delete associations in recipe_ingredients table
        await db.recipe_ingredients.destroy({ where: { frecipe_id: recipe_id } });

        //Delete associations in recipe_tags table
        await db.recipe_tags.destroy({ where: { frecipe_id: recipe_id } });

        //Delete the recipe
        await existingRecipe.destroy();
        // const imagePath = __dirname + '/../../uploads/' + recipe_id + '.jpg';
        // fs.unlink(imagePath);

        return res.status(200).send("Recipe deleted successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
};
