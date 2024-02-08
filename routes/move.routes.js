/**
 * @swagger
 * components:
 *   schemas:
 *     Move:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - typing
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the move.
 *           example: Thunderbolt
 *         description:
 *           type: string
 *           description: A description of the move.
 *           example: A powerful electric-type move that may paralyze the target.
 *         typing:
 *           type: string
 *           enum:
 *             - Normal
 *             - Fire
 *             - Water
 *             - Grass
 *             - Flying
 *             - Fighting
 *             - Poison
 *             - Electric
 *             - Ground
 *             - Rock
 *             - Psychic
 *             - Ice
 *             - Bug
 *             - Ghost
 *             - Steel
 *             - Dragon
 *             - Dark
 *             - Fairy
 *           description: The typing of the move.
 *           example: Electric
 *         type:
 *           type: string
 *           enum:
 *             - Physical
 *             - Special
 *             - Status
 *           description: The type of move.
 *           example: Special
 *         power:
 *           type: number
 *           minimum: 1
 *           description: The power of the move.
 *           example: 90
 *         accuracy:
 *           type: number
 *           minimum: 1
 *           maximum: 100
 *           description: The accuracy of the move.
 *           example: 100
 */
