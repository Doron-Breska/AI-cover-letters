module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Use ARRAY data type for arrays of strings
        allowNull: false,
      },
      education: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      work_experience: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      applications: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      timestamps: true, // Moved outside the attributes
    }
  );

  return Users;
};
