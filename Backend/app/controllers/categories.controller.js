const { encrypt,myDecrypt } = require('../help/help');
const { validateAddRecipe } = require('../help/validator');
const db = require('../models/index')
const Recipe = db.Recipe
const User = db.User
const SubCategory=db.Subcategory
const Category = db.Category
const Ingredients=db.Ingredient
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include:{
                model: SubCategory,
                as: 'subcategories',
                attributes: ['subcategory_name','subcategory_id']
            },
            attributes:{exclude:['createdAt','updatedAt']}
        });
        return res.status(200).send(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}


exports.getCategory=async(req,res) => {
    try {
        const category_id = req.query.id;
        if (typeof category_id != 'string') {
            return res.status(400).send("Invalid format of id");
        }
        const recipes = await Recipe.findAll({
            where: { fcategory_id: category_id },
            attributes: {
                exclude: [ 'createdAt', 'updatedAt']
            }
        })
        if(category_id==null){
            return res.status(404).send("Not found")
        }
        return res.status(200).send(recipes)
     } catch(error){
            console.error(error);
            return res.status(500).send("Server Error")
        }
    }

exports.getSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.findAll({
            attributes:{exclude:['createdAt','updatedAt','fcategory_id']}
        });
        return res.status(200).send(subCategories);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

exports.getSubCategory=async(req,res) => {
    try {
        const subcategory_id = req.query.id;
        if (typeof subcategory_id != 'string') {
            return res.status(400).send("Invalid format of id");
        }
        const recipes = await Recipe.findAll({
            where: { fsubcategory_id: subcategory_id },
            attributes: {
                exclude: [ 'createdAt', 'updatedAt']
            }
        })
        if(subcategory_id==null){
            return res.status(404).send("Not found")
        }
        return res.status(200).send(recipes)
     } catch(error){
            console.error(error);
            return res.status(500).send("Server Error")
        }
    }