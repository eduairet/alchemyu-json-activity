const axios = require('axios');
require('dotenv').config();

// Node as a service URLs provided in alchemy.com dashboard
const ALCHEMY_ETHEREUM_MAINNET_URL = process.env.ALCHEMY_ETHEREUM_MAINNET_URL;
const ALCHEMY_POLYGON_NFT_URL = process.env.ALCHEMY_POLYGON_NFT_URL;
const ALCHEMY_POLYGON_MAINNET_KEY = process.env.ALCHEMY_POLYGON_MAINNET_KEY;
const NFT_CONTRACT = process.env.NFT_CONTRACT;
const NFT_ID = process.env.NFT_ID;

// Request to get block 46147 data
axios
    .post(ALCHEMY_ETHEREUM_MAINNET_URL, {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getBlockByNumber',
        params: [
            '0xb443', // block 46147
            false, // hashes of the transactions
        ],
    })
    .then(response => {
        // Check the block's hash
        console.log(response.data.result.hash);
    });
// Request to get block 46147 data
axios
    .post(ALCHEMY_ETHEREUM_MAINNET_URL, {
        jsonrpc: '2.0',
        id: 2,
        method: 'eth_getBlockByNumber',
        params: [
            'latest', // latest
            true, // full transaction objects
        ],
    })
    .then(response => {
        // Check the block's transactions root
        console.log(response.data.result.transactionsRoot);
    });
// Current gas price
axios
    .post(process.env.ALCHEMY_ETHEREUM_MAINNET_URL, {
        id: 1,
        jsonrpc: '2.0',
        method: 'eth_gasPrice',
    })
    .then(response => {
        // Check gas price
        console.log(response.data.result);
    });
// Get NFT owners of certain token on Polygon
const params = `contractAddress=${NFT_CONTRACT}&tokenId=${NFT_ID}`,
    requestURL = `${ALCHEMY_POLYGON_NFT_URL}/${ALCHEMY_POLYGON_MAINNET_KEY}/getOwnersForToken?${params}`;
axios.get(requestURL).then(response => {
    // Check the owners of the NFT
    console.log(response.data);
});
