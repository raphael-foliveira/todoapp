import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { exclude } from "../../../services/prisma.services";


/**
 * @swagger
 * /api/usuarios/[userId]:
 *  get:
 *      tags: [User]
 *      summary: Retorna um Usuario
 *      responses:
 *          200:
 *              content:
 *                  application.json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/User'
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
    const { userId } = Array.isArray(req.query) ? req.query[0] : req.query;
    if (userId && req.method === "GET") {
        const user = await prisma.user.findFirst({
            where: {
                id: parseInt(userId),
            },
            include: {
                toDos: true,
            },
        });
        if (user) {
            const userWithoutPassword = exclude(user, "password");
            res.status(200).json(userWithoutPassword);
        } else {
            res.status(404).json({
                message: "Não encontrado",
            });
        }
    }
}
