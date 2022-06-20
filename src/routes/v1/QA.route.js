const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const QAController = require('../../controllers/QA.controller');
const QAValidation = require('../../validations/QA.validation');

const router = express.Router();

router
  .route('/')
  .post(auth('manageQAs'), validate(QAValidation.createQA), QAController.createQA)
  .get(auth('getQAs'), validate(QAValidation.getQAs), QAController.getQAs);

router
  .route('/:QAId')
  .get(auth('getQAs'), validate(QAValidation.getQA), QAController.getQA)
  .patch(auth('manageQAs'), validate(QAValidation.updateQA), QAController.updateQA)
  .delete(auth('manageQAs'), validate(QAValidation.deleteQA), QAController.deleteQA);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: QAs
 *   description: QA management and retrieval
 */

/**
 * @swagger
 * /QAs:
 *   post:
 *     summary: Create a QA
 *     description: Only admins, leadership can create other QAs.
 *     tags: [QAs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lesson
 *               - title
 *               - content
 *               - user
 *             properties:
 *               content:
 *                 type: string
 *               lesson:
 *                 type: string
 *               title:
 *                 type: string
 *               user:
 *                 type: string
 *             example:
 *               lesson: 13g2sr1g3s1htd1
 *               user: s4rgr5ds4h25d4s
 *               title: Hehe
 *               content: string
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/QA'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all QAs
 *     description: Only admins can retrieve all QAs.
 *     tags: [QAs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: lesson
 *         schema:
 *           type: string
 *         description: lesson Id
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: user Id
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
 *         description: Maximum number of QAs
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
 *                     $ref: '#/components/schemas/QA'
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
 * /QAs/{id}:
 *   get:
 *     summary: Get a QA
 *     description: Logged in QAs can fetch only their own QA information. Only admins can fetch other QAs.
 *     tags: [QAs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: QA id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/QA'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a QA
 *     description: Logged in QAs can only update their own information. Only admins can update other QAs.
 *     tags: [QAs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: QA id
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
 *               lesson:
 *                 type: string
 *               user:
 *                 type: string
 *             example:
 *               lesson: string
 *               user: string
 *               content: string
 *               title: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/QA'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a QA
 *     description: Logged in QAs can delete only themselves. Only admins can delete other QAs.
 *     tags: [QAs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: QA id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *             example:
 *               topic: drh4fg56cj163
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
