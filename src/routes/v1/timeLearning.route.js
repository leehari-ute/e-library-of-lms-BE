const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const timeLearningValidation = require('../../validations/timeLearning.validation');
const timeLearningController = require('../../controllers/timeLearning.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageTimeLearnings'),
    validate(timeLearningValidation.createTimeLearning),
    timeLearningController.createTimeLearning
  )
  .get(auth('getTimeLearnings'), validate(timeLearningValidation.getTimeLearnings), timeLearningController.getTimeLearnings);

router
  .route('/getByStudentInCurrentWeek')
  .get(
    auth('getByStudentInCurrentWeek'),
    validate(timeLearningValidation.getByStudentInCurrentWeek),
    timeLearningController.getByStudentInCurrentWeek
  );

router
  .route('/:timeLearningId')
  .get(auth('getTimeLearnings'), validate(timeLearningValidation.getTimeLearning), timeLearningController.getTimeLearning)
  .patch(
    auth('manageTimeLearnings'),
    validate(timeLearningValidation.updateTimeLearning),
    timeLearningController.updateTimeLearning
  )
  .delete(
    auth('manageTimeLearnings'),
    validate(timeLearningValidation.deleteTimeLearning),
    timeLearningController.deleteTimeLearning
  );

router
  .route('/:student/:subject')
  .post(
    auth('updateTimeLearningByStudentAndSubject'),
    validate(timeLearningValidation.updateTimeLearningByStudentAndSubject),
    timeLearningController.updateTimeLearningByStudentAndSubject
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: TimeLearnings
 *   description: TimeLearning management and retrieval
 */

/**
 * @swagger
 * /timeLearnings:
 *   post:
 *     summary: Create a timeLearning
 *     description: Only admins, leadership can create other timeLearnings.
 *     tags: [TimeLearnings]
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
 *                $ref: '#/components/schemas/TimeLearning'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all timeLearnings
 *     description: Only admins can retrieve all timeLearnings.
 *     tags: [TimeLearnings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subCode
 *         schema:
 *           type: string
 *         description: TimeLearning Code
 *       - in: query
 *         name: subGroup
 *         schema:
 *           type: string
 *         description: TimeLearning group
 *       - in: query
 *         name: teacher
 *         schema:
 *           type: string
 *         description: teacher id
 *       - in: query
 *         name: subName
 *         schema:
 *           type: string
 *         description: TimeLearning Name
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
 *         description: Maximum number of timeLearnings
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
 *                     $ref: '#/components/schemas/TimeLearning'
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
 * /timeLearnings/{id}:
 *   get:
 *     summary: Get a timeLearning
 *     description: Logged in timeLearnings can fetch only their own timeLearning information. Only admins can fetch other timeLearnings.
 *     tags: [TimeLearnings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: TimeLearning id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/TimeLearning'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a timeLearning
 *     description: Logged in timeLearnings can only update their own information. Only admins can update other timeLearnings.
 *     tags: [TimeLearnings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: TimeLearning id
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
 *                $ref: '#/components/schemas/TimeLearning'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a timeLearning
 *     description: Logged in timeLearnings can delete only themselves. Only admins can delete other timeLearnings.
 *     tags: [TimeLearnings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: TimeLearning id
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
