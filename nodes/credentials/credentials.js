
module.exports = function (RED) {
  function CredentialsNode(config) {
    RED.nodes.createNode(this, config);
    this.api_key = config.api_key;
    this.refresh_token = config.refresh_token;
  }

  RED.nodes.registerType("atomberg-credentials", CredentialsNode, {
    credentials: {
      api_key: { type: "text" },
      refresh_token: { type: "text" },
    }
  });
};
