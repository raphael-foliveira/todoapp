import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

/**
 * @swagger
 * /tarefas:
 *  get:
 *      tags: [ToDo]
 *      summary: Retorna todos as tarefas
 *      responses:
 *          200:
 *              content:
 *                  application.json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/ToDo'
 *  post:
 *      tags: [ToDo]
 *      summary: Cria uma nova tarefa
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          description:
 *                              type: string
 *                          authorId:
 *                              type: integer              
 *      responses:
 *          201:
 *              content:
 *                  application.json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/ToDo'
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const newToDo = await prisma.toDo.create({
            data: req.body,
        });
        res.status(201).json(newToDo);
    }
    if (req.method === "GET") {
        const allToDos = await prisma.toDo.findMany();
        res.status(200).json(allToDos);
    }
}
