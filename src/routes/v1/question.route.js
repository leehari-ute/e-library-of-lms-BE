const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const questionValidation = require('../../validations/question.validation');
const questionController = require('../../controllers/question.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageSubjects'), validate(questionValidation.createQuestion), questionController.createQuestion)
  .get(auth('getSubjects'), validate(questionValidation.getQuestions), questionController.getQuestions);

router
  .route('/create-by-file')
  .post(auth('create-by-file'), validate(questionValidation.createQuestions), questionController.createQuestions);

router
  .route('/:questionId')
  .get(auth('getSubjects'), validate(questionValidation.getQuestion), questionController.getQuestion)
  .patch(auth('manageSubjects'), validate(questionValidation.updateQuestion), questionController.updateQuestion)
  .delete(auth('manageSubjects'), validate(questionValidation.deleteQuestion), questionController.deleteQuestion);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Question management and retrieval
 */

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a Question
 *     description: Only admins, leadership can create other Questions.
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quesCode
 *               - quesName
 *               - answers
 *               - correct
 *               - level
 *               - subjectgroup
 *               - subject
 *               - user
 *             properties:
 *               quesCode:
 *                 type: string
 *               quesName:
 *                 type: string
 *               answers:
 *                 type: array
 *               correct:
 *                 type: array
 *               user:
 *                 type: string
 *               level:
 *                 type: number
 *               subject:
 *                 type: string
 *               subjectgroup:
 *                 type: string
 *             example:
 *               quesCode: 2022_QA1
 *               quesName: lkasmglkdsrmg
 *               subject: 123465789123abc
 *               subjectgroup: slzkgml65845684
 *               user: s35zg453df1h32
 *               answers: ['']
 *               correct: [0]
 *               level: 0
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Bank'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Questions
 *     description: Only admins can retrieve all Questions.
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: subjectId
 *       - in: query
 *         name: level
 *         schema:
 *           type: number
 *         description: level
 *       - in: query
 *         name: subjectgroup
 *         schema:
 *           type: string
 *         description: subjectgroup
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
 *         description: Maximum number of Exams
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
 *                     $ref: '#/components/schemas/Question'
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
 * /questions/{id}:
 *   get:
 *     summary: Get a question
 *     description: Logged in questions can fetch only their own question information. Only admins can fetch other questions.
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: question id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Question'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a question
 *     description: Logged in questions can only update their own information. Only admins can update other questions.
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: question id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quesCode:
 *                 type: string
 *                 description: must be unique
 *               quesName:
 *                 type: string
 *               answers:
 *                 type: array
 *               correct:
 *                 type: array
 *               level:
 *                 type: number
 *               subjectgroup:
 *                 type: array
 *               subject:
 *                 type: array
 *             example:
 *               quesCode: 2020_QA2
 *               quesName: abcd
 *               correct: [0]
 *               answers: ['A. kjsefnksnmlkm']
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Question'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a question
 *     description: Logged in questions can delete only themselves. Only admins can delete other questions.
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: question id
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
