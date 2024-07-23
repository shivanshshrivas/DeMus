const FingerprintVerifier = artifacts.require("FingerprintVerifier");
const RegisterMusic = artifacts.require("RegisterMusic");
const Vibe = artifacts.require("Vibe");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = async function (deployer, network, accounts) {
  const initialOwner = accounts[0]; // The address deploying the contract

  await deployer.deploy(FingerprintVerifier);
  await delay(5000); // Delay for 5 seconds

  await deployer.deploy(RegisterMusic);
  await delay(5000); // Delay for 5 seconds

  await deployer.deploy(Vibe, initialOwner);
};
