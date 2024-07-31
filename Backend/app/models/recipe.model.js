module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define("recipes",{
        recipe_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        id:{
            type: DataTypes.INTEGER,
            unique: true
        },
        recipe_title:{
            type: DataTypes.STRING
        },
        recipe_description:{
            type:DataTypes.STRING
        },
        recipe_portion:{
            type: DataTypes.INTEGER
        },
        level:{
            type: DataTypes.INTEGER
        },
        recipe_time_create:{
            type: DataTypes.INTEGER
        },
        recipe_time_prepare:{
            type: DataTypes.INTEGER
        },
        path:{
            type:DataTypes.STRING,
            defaultValue:'test'

        }
    })
    return Recipe
}