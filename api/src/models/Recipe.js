const { DataTypes, Sequelize } = require('sequelize');


 module.exports = (sequelize) => {
  

  // defino el modelo
  sequelize.define('recipe', {
    id: {
     type: DataTypes.UUID,
     defaultValue: DataTypes.UUIDV4,
     allowNull: false,
     primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
     type: DataTypes.FLOAT,
      allowNull: false,
},
    healthScore: {
     type: DataTypes.FLOAT,
     allowNull: false,
   },
   image: {
     type: DataTypes.STRING,
   },
     steps: {
     type:DataTypes.STRING,

   }

   
 }, {timestamps:false});
};
