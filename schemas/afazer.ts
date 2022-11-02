/**
 * @swagger
 * components:
 *  schemas:
 *      ToDo:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              authorId:
 *                  type: integer
 *              done:
 *                  type: boolean
 */

import { ToDo } from "prisma/prisma-client";