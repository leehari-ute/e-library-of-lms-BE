const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const submissionValidation = require('../../validations/submission.validation');
const submissionController = require('../../controllers/submission.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageSubmissions'), validate(submissionValidation.createSubmission), submissionController.createSubmission)
  .get(auth('getSubmissions'), validate(submissionValidation.getSubmissions), submissionController.getSubmissions);

router
  .route('/:subjectgroupId')
  .get(auth('getSubmissions'), validate(submissionValidation.getSubmission), submissionController.getSubmission)
  .patch(auth('manageSubmissions'), validate(submissionValidation.updateSubmission), submissionController.updateSubmission)
  .delete(auth('manageSubmissions'), validate(submissionValidation.deleteSubmission), submissionController.deleteSubmission);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Submissions
 *   description: SubjectGroup management and retrieval
 */

/**
 * @swagger
 * /submissions:
 *   post:
 *     summary: Create a Submission
 *     description: Only admins, leadership can create other Submissions.
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - bank
 *               - submit
 *               - score
 *               - correctNum
 *             properties:
 *               user:
 *                 type: string
 *               score:
 *                 type: number
 *               bank:
 *                 type: string
 *               correctNum:
 *                 type: number
 *               submit:
 *                 type: array
 *             example:
 *               user: 14s5d3ag1453
 *               score: 10
 *               bank: lkszmglk66541515
 *               correctNum: 10
 *               submit: [{id: 3s25ag4135, ans: [], correct: []}]
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Submission'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Submissions
 *     description: Only admins can retrieve all Submissions.
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: bank
 *         schema:
 *           type: string
 *         description: Bank Id
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
 *         description: Maximum number of Submissions
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
 *                     $ref: '#/components/schemas/Submission'
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
 * /submissions/{id}:
 *   get:
 *     summary: Get a Submission
 *     description: Logged in subjectgroups can fetch only their own subject information. Only admins can fetch other Submissions.
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Submission id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Submission'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Submission
 *     description: Logged in Submissions can only update their own information. Only admins can update other Submissions.
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Submission id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               score:
 *                 type: number
 *               bank:
 *                 type: string
 *               correctNum:
 *                 type: number
 *               submit:
 *                 type: array
 *             example:
 *               user: 5s64g56dr4g
 *               score: 10
 *               bank: sdf5g456dh4
 *               correctNum: 10
 *               submit: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Submission'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Submission
 *     description: Logged in Submissions can delete only themselves. Only admins can delete other Submissions.
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Submission id
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
