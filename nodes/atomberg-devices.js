const AtombergApiClient = require("../api/atomberg");

module.exports = function (RED) {
  function DevicesNode(config) {
    RED.nodes.createNode(this, config);
    // console.log(RED.nodes.getNode(config.creds));
    if (RED.nodes.getNode(config.creds)) {
      this.api_key = RED.nodes.getNode(config.creds).credentials.api_key;
      this.refresh_token = RED.nodes.getNode(
        config.creds
      ).credentials.refresh_token;
    } else {
      this.api_key = "";
      this.refresh_token = "";
    }

    var node = this;
    const apiClient = new AtombergApiClient(
      this.api_key,
      this.refresh_token
    );


    this.on("input", async function (msg) {
      const data = await apiClient.get_all_devices();
      msg.payload = data;
      node.send(msg);
    });
  }
  RED.nodes.registerType("atomberg-devices", DevicesNode, {
    credentials: {
      api_key: { type: "text" },
      refresh_token: { type: "text" },
    },
  });
};
