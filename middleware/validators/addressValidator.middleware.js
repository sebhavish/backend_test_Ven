const { body } = require('express-validator');

exports.addressValidationSchema = [
    body('wallet_address')
        .isEthereumAddress()
        .withMessage("Address should be valid")
];
