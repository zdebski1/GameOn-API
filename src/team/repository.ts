import ITeamModel from "./interface";
import Team from "./model";
import { Op, Sequelize } from "sequelize";
import sequelizeDb from "../config/sequelizeDb";

export async function createTeam(teamModel: Omit<ITeamModel, "teamId">) {
  return Team.create(teamModel);
}

export async function getTeamsOwnedByUser(userId: number, teamName: String) {
  return Team.findOne({
    where: {
      [Op.and]: [
        Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("teamName")),
          teamName.toLowerCase()
        ),
        { createdBy: userId },
      ],
    },
  });
} 

export async function getAllTeamsForUser(userId: number) {
  const results = await sequelizeDb.query(
    `
      SELECT 
        t."teamId",
        t."teamName",
        t."isOwner",
        t."createdBy"
      FROM public.team t
      WHERE t."createdBy" = :userId
  
      UNION
  
      SELECT 
        t."teamId",
        t."teamName",
        CASE WHEN tm."userFk" = t."createdBy" THEN true
        ELSE false
        END AS "isOwner",
        t."createdBy"
      FROM public."teamMember" tm
      INNER JOIN public.team t ON tm."teamFk" = t."teamId"
      WHERE tm."userFk" = :userId;
      `,
    {
      replacements: { userId },
      type: sequelizeDb.QueryTypes.SELECT,
    }
  );

  return results;
}
