import { FastifyReply, FastifyRequest } from "fastify";
import { loginService } from "./auth.service";
import { loginRequestDto } from "./auth.dto";
import { errorMessage } from "../utils/helperFunctions";
import { listOfErrorCodes } from "../utils/globalVariables";


export async function loginController(
    request: FastifyRequest<{ Body: loginRequestDto }>, 
    reply: FastifyReply
) {
try {
    const loginRequestDto = request.body;
    const newLogin = await loginService(loginRequestDto);
    return reply.code(201).send(newLogin);
  } catch (error) {
    console.error('Error logging in: ', error);

  await errorMessage(error, listOfErrorCodes, reply);
  }
}