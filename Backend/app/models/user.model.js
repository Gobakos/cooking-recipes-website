module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users",{
        user_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        first_name:{
            type: DataTypes.STRING
        },
        last_name:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING
        },
        username:{
            type:DataTypes.STRING,
            unique:true
        },
        password:{
            type:DataTypes.STRING
        }
    })
    return User
}