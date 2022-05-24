const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const classesValidation = require('../../validations/classes.validation');
const classesController = require('../../controllers/classes.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageClasses'), validate(classesValidation.createClasses), classesController.createClass)
  .get(auth('getClasses'), validate(classesValidation.getClasses), classesController.getClasses);

router
  .route('/:classId')
  .get(auth('getClasses'), validate(classesValidation.getClass), classesController.getClass)
  .patch(auth('manageClasses'), validate(classesValidation.updateClasses), classesController.updateClass)
  .delete(auth('manageClasses'), validate(classesValidation.deleteClasses), classesController.deleteClass);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Classes management and retrieval
 */

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Create a Class
 *     description: Only admins, leadership can create other Classes.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - className
 *               - classCode
 *               - teacher
 *               - student
 *               - subject
 *             properties:
 *               className:
 *                 type: string
 *               classCode:
 *                 type: number
 *               teacher:
 *                 type: string
 *               student:
 *                 type: array
 *               subject:
 *                 type: string
 *             example:
 *               className: Thương mại điện tử
 *               classCode: TMMDT_01
 *               teacher: kjsdngk654564d
 *               student: ['rgds456d4h65d4th6']
 *               subject: kslgmnl654g64gdrs654
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Classes'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Classes
 *     description: Only admins can retrieve all Classes.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: classCode
 *         schema:
 *           type: string
 *         description: class Code
 *       - in: query
 *         name: teacher
 *         schema:
 *           type: string
 *         description: teacher id
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: subject id
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
 *         description: Maximum number of Classes
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
 *                     $ref: '#/components/schemas/Classes'
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
 * /classes/{id}:
 *   get:
 *     summary: Get a File
 *     description: Logged in Classes can fetch only their own File information. Only admins can fetch other Classes.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Classes'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Class
 *     description: Logged in Classes can only update their own information. Only admins can update other Classes.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               className:
 *                 type: string
 *               classCode:
 *                 type: string
 *               teacher:
 *                 type: string
 *               student:
 *                 type: array
 *               subject:
 *                 type: string
 *             example:
 *               className: Kiểm thử phần mềm
 *               classCode: 18110CLC
 *               teacher: sd56g465df4g65ds
 *               student: ['']
 *               subject: 1s4gsg465d4hg65s4
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Classes'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Class
 *     description: Logged in Classes can delete only themselves. Only admins can delete other Classes.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class id
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
