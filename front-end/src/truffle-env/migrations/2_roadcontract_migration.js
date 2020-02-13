const roadContract = artifacts.require("RoadContract");

module.exports = function(deployer) {
  deployer.deploy(roadContract);
};
