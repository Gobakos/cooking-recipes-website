module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define("tags",{
        tag_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        tag_name:{
            type: DataTypes.STRING
        }
    })
    return Tag
}
