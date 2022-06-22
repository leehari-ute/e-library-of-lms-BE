const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const subjectgroupValidation = require('../../validations/subjectgroup.validation');
const subjectgroupController = require('../../controllers/subjectgroup.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageSubjects'),
    validate(subjectgroupValidation.createSubjectGroup),
    subjectgroupController.createSubjectgroup
  )
  .get(auth('getSubjects'), validate(subjectgroupValidation.getSubjectGroups), subjectgroupController.getSubjectgroups);

router
  .route('/:subjectgroupId')
  .get(auth('getSubjects'), validate(subjectgroupValidation.getSubjectGroup), subjectgroupController.getSubjectgroup)
  .patch(
    auth('manageSubjects'),
    validate(subjectgroupValidation.updateSubjectGroup),
    subjectgroupController.updateSubjectgroup
  )
  .delete(
    auth('manageSubjects'),
    validate(subjectgroupValidation.deleteSubjectGroup),
    subjectgroupController.deleteSubjectgroup
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SubjectGroups
 *   description: SubjectGroup management and retrieval
 */

/**
 * @swagger
 * /subjectgroups:
 *   post:
 *     summary: Create a subjectgroup
 *     description: Only admins, leadership can create other subjectgroups.
 *     tags: [SubjectGroups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - groupName
 *               - groupCode
 *               - bank
 *               - subject
 *             properties:
 *               groupCode:
 *                 type: string
 *                 description: must be unique
 *               groupName:
 *                 type: string
 *               bank:
 *                 type: array
 *               subject:
 *                 type: array
 *             example:
 *               groupName: Hệ thống thông tin
 *               groupCode: 2022_HTTT
 *               bank: ['lkszmglk66541515']
 *               subject: ['sdrg32632631651']
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Subjectgroup'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all subjects
 *     description: Only admins can retrieve all subjects.
 *     tags: [SubjectGroups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Subject Id
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
 *                     $ref: '#/components/schemas/Subjectgroup'
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
 * /subjectgroups/{id}:
 *   get:
 *     summary: Get a subjectgroup
 *     description: Logged in subjectgroups can fetch only their own subject information. Only admins can fetch other subjectgroups.
 *     tags: [SubjectGroups]
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
 *                $ref: '#/components/schemas/Subjectgroup'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a subjectgroup
 *     description: Logged in subjectgroups can only update their own information. Only admins can update other subjectgroups.
 *     tags: [SubjectGroups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: SubjectGroup id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupCode:
 *                 type: string
 *                 description: must be unique
 *               groupName:
 *                 type: string
 *               bank:
 *                 type: array
 *               subject:
 *                 type: array
 *             example:
 *               groupCode: 2022_CNPM
 *               groupName: Công nghệ phần mềm
 *               bank: ['slkamgkl5165165']
 *               subject: ['srg153156468']
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Subjectgroup'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a subjectgroup
 *     description: Logged in subjectgroups can delete only themselves. Only admins can delete other subjectgroups.
 *     tags: [SubjectGroups]
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
