// program to buy tokens fast on bscmainnet
// run before using: npm i ethers prompt-sync

const ethers = require('ethers');
const prompt = require('prompt-sync')({sigint: true});

const addresses = {
WBNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
router: "0x10ed43c718714eb63d5aa57b78b54704e256024e",
target: "0xEc67838a18324f2891d9D3c9f2DCD462214C276B" // Change this to your address ELSE YOU GONNA SEND YOUR BEANS TO ME
}

const BNBAmount = ethers.utils.parseEther('0.04').toHexString(); // Amount of bnb
const gasPrice = ethers.utils.parseUnits('6', 'gwei'); // gas(minimum 5)
const gas = {
  gasPrice: gasPrice,
  gasLimit: 300000
}

const privateKey = " YOUR PRIVATE KEY ";
const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/'); // mainnet rpc
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
