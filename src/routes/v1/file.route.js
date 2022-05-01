const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const fileValidation = require('../../validations/file.validation');
const fileController = require('../../controllers/file.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageFiles'), validate(fileValidation.createFile), fileController.createFile)
  .get(auth('getFiles'), validate(fileValidation.getFiles), fileController.getFiles);

router
  .route('/:fileId')
  .get(auth('getFiles'), validate(fileValidation.getFile), fileController.getFile)
  .patch(auth('manageFiles'), validate(fileValidation.updateFile), fileController.updateFile)
  .delete(auth('manageFiles'), validate(fileValidation.deleteFile), fileController.deleteFile);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File management and retrieval
 */

/**
 * @swagger
 * /files:
 *   post:
 *     summary: Create a File
 *     description: Only admins, leadership can create other Files.
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fileName
 *               - fileRole
 *               - teacher
 *             properties:
 *               fileName:
 *                 type: string
 *               fileRole:
 *                 type: number
 *               teacher:
 *                 type: string
 *             example:
 *               fileName: 2020_6A
 *               fileRole: 0
 *               teacher: Hoa Hoa
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/File'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Files
 *     description: Only admins can retrieve all Files.
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fileName
 *         schema:
 *           type: string
 *         description: File Name
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
 *         description: Maximum number of Files
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
 *                     $ref: '#/components/schemas/File'
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
 * /files/{id}:
 *   get:
 *     summary: Get a File
 *     description: Logged in Files can fetch only their own File information. Only admins can fetch other Files.
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/File'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a File
 *     description: Logged in Files can only update their own information. Only admins can update other Files.
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 description: must be unique
 *               fileRole:
 *                 type: number
 *                 enum: [0, 1]
 *               teacher:
 *                 type: string
 *               status:
 *                 type: number
 *                 enum: [0, 1, 2]
 *             example:
 *               fileName: 2020_6A
 *               fileRole: 1
 *               teacher: Hoa Hoa
 *               status: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/File'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a File
 *     description: Logged in Files can delete only themselves. Only admins can delete other Files.
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File id
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
