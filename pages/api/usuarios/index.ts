import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { exclude } from "../../../services/prisma.services";

/**
 * @swagger
 * /usuarios:
 *  get:
 *      tags: [User]
 *      summary: Retorna todos os usuarios
 *      responses:
 *          200:
 *              content:
 *                  application.json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *  post:
 *      tags: [User]
 *      summary: Cria um novo usuario
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          201:
 *              content:
 *                  application.json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/User'
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {

            const newUser = await prisma.user.create({
                data: req.body,
            });
            res.status(201).json(newUser);
        } catch {
            res.status(409).json(null);
        }
    }
    if (req.method === "GET") {
        const allUsers = await prisma.user.findMany({
            include: {
                toDos: true,
            },
        });
        const allUsersWithouPasswords = allUsers.map((user) => {
            return exclude(user, "password");
        });
        res.status(200).json(allUsersWithouPasswords);
    }
}


