module.exports = (sequelize, DataTypes) => {
    const Subcategory = sequelize.define("subcategories",{
        subcategory_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        subcategory_name:{
            type: DataTypes.STRING
        }
    })
    return Subcategory
}