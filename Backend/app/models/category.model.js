module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("categories",{
        category_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        category_name:{
            type: DataTypes.STRING
        }
    })
    return Category
}