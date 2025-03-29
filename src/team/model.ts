import ITeamModel from './interface';
import sequelizeDb from '../config/sequelizeDb';  
import { DataTypes, Model } from 'sequelize';

class Team extends Model<ITeamModel> implements ITeamModel {
  public teamId!: Number;
  public teamName!: String;
  public teamMember!: String;
  public createdDateTime!: Date;
  public createdBy!: String;
  public updatedDateTime!: Date;
  public updatedBy!: String
}

Team.init(
  {
    teamId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamMember: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdDateTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedDateTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeDb,
    tableName: 'team',
    timestamps: false,
  }
);

export default Team;