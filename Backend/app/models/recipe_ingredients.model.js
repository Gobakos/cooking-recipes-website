module.exports = (sequelize, DataTypes) => {
    const RecipeIngredients = sequelize.define("recipe_ingredients",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        quantity:{
            type:DataTypes.INTEGER
        },
        description:{
            type: DataTypes.STRING
        }
    })
    return RecipeIngredients
}