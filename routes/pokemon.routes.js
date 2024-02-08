/**
 * @swagger
 * components:
 *   schemas:
 *     Pokemon:
 *       type: object
 *       required:
 *         - name
 *         - dexNumber
 *         - type
 *         - baseStats
 *         - thumbnail
 *         - dexEntry
 *         - generation
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the Pokémon.
 *           example: Pikachu
 *         dexNumber:
 *           type: number
 *           description: The Pokédex number of the Pokémon.
 *           minimum: 1
 *           example: 25
 *         type:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - normal
 *               - fire
 *               - water
 *               - grass
 *               - flying
 *               - fighting
 *               - poison
 *               - electric
 *               - ground
 *               - rock
 *               - psychic
 *               - ice
 *               - bug
 *               - ghost
 *               - steel
 *               - dragon
 *               - dark
 *               - fairy
 *           description: The type(s) of the Pokémon.
 *           example: [electric]
 *         baseStats:
 *           type: object
 *           properties:
 *             hp:
 *               type: number
 *               description: The base HP stat of the Pokémon.
 *               example: 35
 *             atk:
 *               type: number
 *               description: The base attack stat of the Pokémon.
 *               example: 55
 *             def:
 *               type: number
 *               description: The base defense stat of the Pokémon.
 *               example: 40
 *             sp_atk:
 *               type: number
 *               description: The base special attack stat of the Pokémon.
 *               example: 50
 *             sp_def:
 *               type: number
 *               description: The base special defense stat of the Pokémon.
 *               example: 50
 *             speed:
 *               type: number
 *               description: The base speed stat of the Pokémon.
 *               example: 90
 *           description: The base stats of the Pokémon.
 *         abilities:
 *           type: array
 *           items:
 *             type: ObjectId
 *             description: An array of objectIds representing the abilities of the Pokémon.
 *             example: [65be000a30b59661b878b21f]
 *         hiddenAbility:
 *           type: ObjectID
 *           description: An array of objectIds representing the hidden ability of the Pokémon.
 *           example: [65be000a30b59661b878b1ba]
 *         moves:
 *           type: array
 *           items:
 *             type: objectId
 *             description: An array of ObjectIds, representing the moves that the Pokémon can learn.
 *             example: [65bdff79a545d469bc6f0c59, 65bdff79a545d469bc6f0a7c]
 *         thumbnail:
 *           type: string
 *           description: The URL to the thumbnail image of the Pokémon.
 *           example: https://example.com/pikachu.png
 *         shinyThumbnail:
 *           type: string
 *           description: The URL to the shiny thumbnail image of the Pokémon.
 *           example: https://example.com/pikachu_shiny.png
 *         dexEntry:
 *           type: string
 *           description: The Pokédex entry of the Pokémon.
 *           example: Pikachu is an Electric-type Pokémon.
 *         generation:
 *           type: string
 *           enum:
 *             - I
 *             - II
 *             - III
 *             - IV
 *             - V
 *             - VI
 *             - VII
 *             - VIII
 *             - IX
 *           description: The generation of the Pokémon.
 *           example: IV
 */
