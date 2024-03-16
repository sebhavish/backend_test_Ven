const Web3 = require('web3');
const { RPC_API, TEST_TOKEN_ADDRESS } = process.env;
const tokenABI = require('../resources/TestTokenABI.json');
const { validationResult } = require('express-validator');

const web3 = new Web3(RPC_API);

exports.getTestTokenBalance = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { wallet_address } = req.query;

    try {
        const testTokenContract = new web3.eth.Contract(tokenABI, TEST_TOKEN_ADDRESS);
        const balance = await testTokenContract.methods.balanceOf(wallet_address).call();
        res.status(200).json({wallet_address, token_address : TEST_TOKEN_ADDRESS, balance});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: 'Something went wrong!'});
    }
}
