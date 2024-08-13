require("dotenv").config();
const cli = require("@aptos-labs/ts-sdk/dist/common/cli/index.js");

async function publish() {
  if (!process.env.VITE_MODULE_ADDRESS) {
    throw new Error(
      "VITE_MODULE_ADDRESS variable is not set, make sure you have published the module before upgrading it",
    );
  }

  const move = new cli.Move();

  move.upgradeObjectPackage({
    packageDirectoryPath: "move",
    objectAddress: process.env.VITE_MODULE_ADDRESS,
    namedAddresses: {
      // Upgrade module from an object
      message_board_addr: process.env.VITE_MODULE_ADDRESS,
    },
    profile: `${process.env.PROJECT_NAME}-${process.env.VITE_APP_NETWORK}`,
  });
}
publish();
