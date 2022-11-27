const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('managePayments'), validate(paymentValidation.createPayment), paymentController.createPayment)
  .get(auth('getPayments'), validate(paymentValidation.getPayments), paymentController.getPayments);

router
  .route('/:paymentId')
  .get(auth('getPayments'), validate(paymentValidation.getPayment), paymentController.getPayment)
  .patch(auth('managePayments'), validate(paymentValidation.updatePayment), paymentController.updatePayment)
  .delete(auth('managePayments'), validate(paymentValidation.deletePayment), paymentController.deletePayment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management and retrieval
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a Payment
 *     description: Only admins, leadership can create other Files.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - feeCode
 *               - user
 *               - cost
 *               - subject
 *             properties:
 *               feeCode:
 *                 type: string
 *               user:
 *                 type: string
 *               subject:
 *                 type: string
 *               cost:
 *                 type: number
 *               status:
 *                 type: number
 *             example:
 *               feeCode: 2020_6A
 *               subject: dslg53sd1g563s
 *               user: sdlkgkldsmgldfsmb21
 *               cost: 2400000
 *               status: 0
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Payment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Payments
 *     description: Only admins can retrieve all Payments.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: User Id
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: subject Id
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
 *         description: Maximum number of Payments
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
 *                     $ref: '#/components/schemas/Payment'
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
 * /payments/{id}:
 *   get:
 *     summary: Get a Payment
 *     description: Logged in Payments can fetch only their own Payment information. Only admins can fetch other Payments.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payments id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Payment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Payment
 *     description: Logged in Payments can only update their own information. Only admins can update other Payments.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feeCode:
 *                 type: string
 *                 description: must be unique
 *               cost:
 *                 type: number
 *               user:
 *                 type: string
 *               subject:
 *                 type: string
 *               status:
 *                 type: number
 *                 enum: [0, 1]
 *             example:
 *               feeCode: 2020_6A
 *               cost: 1800000
 *               user: dsag265ads1g65
 *               status: 1
 *               subject: dsklnafk65sg
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Payment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Payment
 *     description: Logged in Payments can delete only themselves. Only admins can delete other Payments.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment id
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
