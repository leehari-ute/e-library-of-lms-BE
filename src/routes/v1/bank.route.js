const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const bankValidation = require('../../validations/bank.validation');
const bankController = require('../../controllers/bank.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageBanks'), validate(bankValidation.createExam), bankController.createExam)
  .get(auth('getBanks'), validate(bankValidation.getExams), bankController.getExams);

router
  .route('/:examId')
  .get(auth('getBanks'), validate(bankValidation.getExam), bankController.getExam)
  .patch(auth('manageBanks'), validate(bankValidation.updateExam), bankController.updateExam)
  .delete(auth('manageBanks'), validate(bankValidation.deleteExam), bankController.deleteExam);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Banks
 *   description: Bank management and retrieval
 */

/**
 * @swagger
 * /banks:
 *   post:
 *     summary: Create an Exam
 *     description: Only admins, leadership can create other Exams.
 *     tags: [Banks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fileType
 *               - examName
 *               - subject
 *               - examType
 *             properties:
 *               fileType:
 *                 type: number
 *               examName:
 *                 type: string
 *               subject:
 *                 type: string
 *               examType:
 *                 type: number
 *             example:
 *               fileType: 0
 *               examName: Kiểm tra chủ đề 01.ppt
 *               subject: 123465789123
 *               examType: 0
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
 *     summary: Get all Exams
 *     description: Only admins can retrieve all Exams.
 *     tags: [Banks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: subjectId
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status
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
 *                     $ref: '#/components/schemas/Bank'
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
 * /banks/{id}:
 *   get:
 *     summary: Get an Exam
 *     description: Logged in Exams can fetch only their own Exam information. Only admins can fetch other Exams.
 *     tags: [Banks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exam id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Bank'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an Exam
 *     description: Logged in Exams can only update their own information. Only admins can update other Exams.
 *     tags: [Banks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exam id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               examName:
 *                 type: string
 *               fileType:
 *                 type: number
 *                 enum: [0, 1, 2]
 *               subject:
 *                 type: string
 *               examType:
 *                 type: number
 *                 enum: [0, 1]
 *               status:
 *                 type: number
 *                 enum: [0, 1, 2]
 *             example:
 *               examName: Kiểm tra chủ đề 02.doc
 *               fileType: 1
 *               subject: 123456789321
 *               status: 1
 *               examType: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Bank'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an Exam
 *     description: Logged in Exams can delete only themselves. Only admins can delete other Exams.
 *     tags: [Banks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exam id
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
