import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const user = await prisma.user.findFirst({
            where: {
                username: req.body.username,
            },
            include: {
                toDos: true,
            },
        });

        if (user && user.password === req.body.password) {
            res.status(200).json(user);
        } else {
            res.status(401).json({
                mensagem: "Login não autorizado.",
            });
        }
    }
}
