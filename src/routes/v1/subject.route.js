const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const subjectValidation = require('../../validations/subject.validation');
const subjectController = require('../../controllers/subject.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageSubjects'), validate(subjectValidation.createSubject), subjectController.createSubject)
  .get(auth('getSubjects'), validate(subjectValidation.getSubjects), subjectController.getSubjects);

router
  .route('/:subjectId')
  .get(auth('getSubjects'), validate(subjectValidation.getSubject), subjectController.getSubject)
  .patch(auth('manageSubjects'), validate(subjectValidation.updateSubject), subjectController.updateSubject)
  .delete(auth('manageSubjects'), validate(subjectValidation.deleteSubject), subjectController.deleteSubject);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: Subject management and retrieval
 */

/**
 * @swagger
 * /subjects:
 *   post:
 *     summary: Create a subject
 *     description: Only admins, leadership can create other subjects.
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subCode
 *               - subName
 *               - teacher
 *             properties:
 *               subCode:
 *                 type: string
 *                 description: must be unique
 *               subName:
 *                 type: string
 *               teacher:
 *                 type: string
 *             example:
 *               subCode: 2020_TMDT
 *               subName: Thương mại điện tử
 *               teacher: Hoa Hoa
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Subject'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all subjects
 *     description: Only admins can retrieve all subjects.
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subCode
 *         schema:
 *           type: string
 *         description: Subject Code
 *       - in: query
 *         name: subGroup
 *         schema:
 *           type: string
 *         description: Subject group
 *       - in: query
 *         name: teacher
 *         schema:
 *           type: string
 *         description: teacher id
 *       - in: query
 *         name: subName
 *         schema:
 *           type: string
 *         description: Subject Name
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
 *         description: Maximum number of subjects
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: populate
 *         schema:
 *           type: string
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
 *                     $ref: '#/components/schemas/Subject'
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
 * /subjects/{id}:
 *   get:
 *     summary: Get a subject
 *     description: Logged in subjects can fetch only their own subject information. Only admins can fetch other subjects.
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Subject'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a subject
 *     description: Logged in subjects can only update their own information. Only admins can update other subjects.
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subCode:
 *                 type: string
 *                 description: must be unique
 *               subName:
 *                 type: string
 *               teacher:
 *                 type: string
 *               status:
 *                 type: number
 *                 enum: [0, 1, 2]
 *               file:
 *                 type: number
 *               image:
 *                 type: string
 *             example:
 *               subCode: 2020_A
 *               subName: Thương mại điện tử
 *               teacher: Hoa Hoa
 *               status: 1
 *               file: 10
 *               image: image
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Subject'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a subject
 *     description: Logged in subjects can delete only themselves. Only admins can delete other subjects.
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject id
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
