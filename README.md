# Atomberg Node Red
*Node Red Integration for **[Atomberg smart fans](https://atomberg.com/atomberg-ceiling-fans)***

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Third-Party API Information](#third-party-api-information)
- [Acknowledgments](#acknowledgments)
- [License](#license)
- [Contribution Guidelines](#contribution-guidelines)
- [Contact Information](#contact-information)

## Introduction
This Node-RED contrib node allows you to interact with Atomberg's smart fan API, enabling integration and control of Atomberg smart fans within your Node-RED flows.

![Atomberg Flow](https://raw.githubusercontent.com/sisodiakaran/node-red-contrib-atomberg/master/image.png "Atomberg Flow")

## Installation
To install the node, use the following command:
```bash
npm install node-red-contrib-atomberg
```

## Usage
### Configuration
#### Step 1: Generate API Key and Refresh Token
1. Go to [Atomberg Developer Portal](https://developer.atomberg-iot.com/#overview).
2. Follow the instructions to generate your `api_key` and `refresh_token`.

#### Step 2: Add Node
1. Add the node to your flow.
2. Configure the node with your Atomberg API credentials.
3. Set up the desired actions and responses.

<!-- ### Example
```json
[{
    "id": "1",
    "type": "atomberg",
    "name": "Control Fan",
    "apiKey": "YOUR_API_KEY",
    "action": "turnOn",
    "fanId": "12345"
}]
``` -->

## Dependencies
- Node.js v14 or higher
- Node-RED v3.x or higher

## Third-Party API Information
This node interacts with the Atomberg API. For more information, please refer to the [Atomberg API Documentation](https://developer.atomberg-iot.com/).

**Disclaimer**: This contrib node is not an official product of Atomberg and is not affiliated with or endorsed by Atomberg in any way.

## Acknowledgments
- Thanks to Atomberg for providing the API.
- Thanks to the Node-RED community for their support.

## License
This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit) file for details.

## Contribution Guidelines
We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

## Contact Information
For support, please open an issue on the [GitHub issues page](https://github.com/sisodiakaran/node-red-contrib-atomberg/issues).
