module.exports = function (RED) {
  function RemoteServerNode(n) {
    RED.nodes.createNode(this, n);
    this["api-key"] = n["api-key"];
    this["refresh-token"] = n["refresh-token"];
  }
  RED.nodes.registerType("atomberg-credentials", RemoteServerNode);
};
