module.exports = function (RED) {
  function CredentialsNode(n) {
    RED.nodes.createNode(this, n);
    this.api_key = n.api_key;
    this.refresh_token = n.refresh_token;
  }
  RED.nodes.registerType("atomberg-credentials", CredentialsNode);
};
