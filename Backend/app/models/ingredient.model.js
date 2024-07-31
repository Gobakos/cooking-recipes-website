module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define("ingredients",{
        ingredient_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        ingredient_name:{
            type: DataTypes.STRING
        }
    })
    return Ingredient
}