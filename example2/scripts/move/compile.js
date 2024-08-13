require("dotenv").config();
const fs = require("node:fs");
const yaml = require("js-yaml");
const cli = require("@aptos-labs/ts-sdk/dist/common/cli/index.js");

const config = yaml.load(fs.readFileSync("./.aptos/config.yaml", "utf8"));
const accountAddress =
  config["profiles"][`${process.env.PROJECT_NAME}-${process.env.VITE_APP_NETWORK}`]["account"];

async function compile() {

  const move = new cli.Move();

  await move.compile({
    packageDirectoryPath: "move",
    namedAddresses: {
      // Compile module with account address
      message_board_addr: accountAddress,
    },
  });
}
compile();
