import { prisma } from "../../../db";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /tarefas/[toDoId]:
 *  delete:
 *      tags: [ToDo]
 *      summary: Deleta uma tarefa
 *      responses:
 *          200:
 *              content:
 *                  application.json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/ToDo'
 *  patch:
 *      tags: [ToDo]
 *      summary: Modifica uma tarefa existente
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                         $ref: '#/components/schemas/ToDo'
 *      responses:
 *          201:
 *              content:
 *                  application.json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/ToDo'
 *  get:
 *      tags: [ToDo]
 *      summary: Retorna uma tarefa
 *      responses:
 *          200:
 *              content:
 *                  application.json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/ToDo'
 *          404:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { toDoId } = Array.isArray(req.query) ? req.query[0] : req.query;
    if (toDoId && req.method === "DELETE") {
        const deletedToDo = await prisma.toDo.delete({
            where: {
                id: parseInt(toDoId),
            },
        });
        res.status(200).json(deletedToDo);
    }
    if (toDoId && req.method === "PATCH") {
        const updatedToDo = await prisma.toDo.update({
            where: {
                id: parseInt(toDoId),
            },
            data: req.body,
        });
        res.status(200).json(updatedToDo);
    }
    if (toDoId && req.method === "GET") {
        const toDo = await prisma.toDo.findUnique({
            where: {
                id: toDoId,
            },
        });
        if (toDo) {
            res.status(200).json(toDo);
        } else {
            res.status(404).json({
                mensagem: "Não encontrado.",
            });
        }
    }
}
