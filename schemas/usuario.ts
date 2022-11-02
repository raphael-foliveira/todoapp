/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *              username:
 *                  type: string
 *              toDos:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/ToDo'
 *              done:
 *                  type: boolean
 */

import { UserWithToDos } from "../components/UserProfile/UserProfile";
