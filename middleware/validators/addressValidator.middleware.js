const { query } = require('express-validator');

exports.addressValidationSchema = [
    query('wallet_address')
        .isEthereumAddress()
        .withMessage("Address should be valid")
];
