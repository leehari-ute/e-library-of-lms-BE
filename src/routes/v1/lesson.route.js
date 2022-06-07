const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const lessonValidation = require('../../validations/lesson.validation');
const lessonController = require('../../controllers/lesson.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageTopics'), validate(lessonValidation.createLesson), lessonController.createLesson)
  .get(auth('getTopics'), validate(lessonValidation.getLessons), lessonController.getLessons);

router
  .route('/:lessonId')
  .get(auth('getTopics'), validate(lessonValidation.getLesson), lessonController.getLesson)
  .patch(auth('manageTopics'), validate(lessonValidation.updateLesson), lessonController.updateLesson)
  .delete(auth('manageTopics'), validate(lessonValidation.deleteLesson), lessonController.deleteLesson);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Lesson management and retrieval
 */

/**
 * @swagger
 * /lessons:
 *   post:
 *     summary: Create a Lesson
 *     description: Only admins, leadership can create other Lessons.
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - topic
 *               - title
 *               - video
 *             properties:
 *               subject:
 *                 type: string
 *               topic:
 *                 type: string
 *               title:
 *                 type: string
 *               video:
 *                 type: string
 *               file:
 *                 type: array
 *               classes:
 *                 type: array
 *             example:
 *               subject: 13g2sr1g3s1htd1
 *               topic: s4rgr5ds4h25d4s
 *               title: Hehe
 *               video: string
 *               file: ['string']
 *               classes: ['id']
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Lesson'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Lessons
 *     description: Only admins can retrieve all Lessons.
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: subjectId
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
 *         description: Maximum number of Lessons
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
 *                     $ref: '#/components/schemas/Lesson'
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
 * /lessons/{id}:
 *   get:
 *     summary: Get a Lesson
 *     description: Logged in Lessons can fetch only their own Lesson information. Only admins can fetch other Lessons.
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lesson id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Lesson'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Lesson
 *     description: Logged in Lessons can only update their own information. Only admins can update other Lessons.
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lesson id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               topic:
 *                 type: string
 *               classes:
 *                 type: array
 *               file:
 *                 type: array
 *               video:
 *                 type: string
 *               title:
 *                 type: string
 *             example:
 *               subject: string
 *               topic: string
 *               classes: ['id']
 *               title: string
 *               video: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Lesson'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Lesson
 *     description: Logged in Lessons can delete only themselves. Only admins can delete other Lessons.
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lesson id
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
