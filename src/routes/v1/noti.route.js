const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const notiValidation = require('../../validations/noti.validation');
const notiController = require('../../controllers/noti.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageNoti'), validate(notiValidation.createNoti), notiController.createNoti)
  .get(auth('getNoti'), validate(notiValidation.getNoti), notiController.getNoti);

router
  .route('/:notiId')
  .get(auth('getNoti'), validate(notiValidation.getNoti), notiController.getNoti)
  .patch(auth('manageNoti'), validate(notiValidation.updateNoti), notiController.updateNoti)
  .delete(auth('manageNoti'), validate(notiValidation.deleteNoti), notiController.deleteNoti);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Noti
 *   description: noti management and retrieval
 */

/**
 * @swagger
 * /noti:
 *   post:
 *     summary: Create a noti
 *     description: Only admins, leadership can create other noti.
 *     tags: [Noti]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - from
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               from:
 *                 type: string
 *               to:
 *                 type: array
 *               topic:
 *                 type: string
 *             example:
 *               title: Thương mại điện tử
 *               content: TMMDT_01
 *               from: kjsdngk654564d
 *               to: ['rgds456d4h65d4th6']
 *               topic: kslgmnl654g64gdrs654
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/noti'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all noti
 *     description: Only admins can retrieve all noti.
 *     tags: [Noti]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of noti
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/noti'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /noti/{id}:
 *   get:
 *     summary: Get a noti
 *     description: Logged in noti can fetch only their own noti information. Only admins can fetch other noti.
 *     tags: [Noti]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: noti id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/noti'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a noti
 *     description: Logged in noti can only update their own information. Only admins can update other noti.
 *     tags: [Noti]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: noti id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               to:
 *                 type: array
 *               topic:
 *                 type: string
 *             example:
 *               title: Kiểm thử phần mềm
 *               content: 18110CLC
 *               to: ['']
 *               topic: 1s4gsg465d4hg65s4
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/noti'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a noti
 *     description: Logged in noti can delete only themselves. Only admins can delete other noti.
 *     tags: [Noti]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: noti id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
