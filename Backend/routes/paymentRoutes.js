const express = require('express')
const {capturePayment , verifyPayment, sendPaymentSuccessEmail} = require('../controllers/payment')
const {auth , isStudent} = require('../middlewares/auth')


const router = express.Router()

router.post('/capturePayment',auth,isStudent,capturePayment)
router.post('/verifyPayment',auth, isStudent,verifyPayment)
router.post('/sendPaymentSuccessMail',auth,sendPaymentSuccessEmail)

module.exports = router