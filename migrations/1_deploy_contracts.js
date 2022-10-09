var Message = artifacts.require("Message");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(Message);
};