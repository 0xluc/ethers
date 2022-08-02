// program to buy tokens fast on bsctestnet

const ethers = require('ethers');
const prompt = require('prompt-sync')({sigint: true});

const addresses = {
WBNB: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
router: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
target: "0x7304e9fB3380efb7A061145F305Ac5Fdbbb3Fa1f" // Change this to your address ELSE YOU GONNA SEND YOUR BEANS TO ME
}

const BNBAmount = ethers.utils.parseEther('0.04').toHexString();
const gasPrice = ethers.utils.parseUnits('10', 'gwei'); // 10 is the minimum on bsctestnet, on bsc is 5
const gas = {
  gasPrice: gasPrice,
  gasLimit: 300000
}

const privateKey = " YOUR PRIVATE KEY ";
const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
const wallet = new ethers.Wallet(privateKey);
const account = wallet.connect(provider);

const router = new ethers.Contract( 
  addresses.router,
  [
    'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'
  ],
  account
);
  
  const snipe = async (token) => {
 
  const tx = await router.swapExactETHForTokens(
    0, // Degen ape don't give a fuxk about slippage
    [addresses.WBNB, token],
    addresses.target,
    Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes from now
    {
        ...gas,
        value: BNBAmount
    }
  );
  console.log(`Swapping BNB for tokens...`);
  const receipt = await tx.wait();
  console.log(`Transaction hash: ${receipt.transactionHash}`);
}

const token = prompt('Input token address:');

(async () => {
  await snipe(token);
})();
