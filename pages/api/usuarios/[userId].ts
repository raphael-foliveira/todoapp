import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { exclude } from "../../../services/prisma.services";

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
