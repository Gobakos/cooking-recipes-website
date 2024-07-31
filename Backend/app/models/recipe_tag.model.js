module.exports = (sequelize, DataTypes) => {
    const RecipeTags = sequelize.define("recipe_tags",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        }
    })
    return RecipeTags
}