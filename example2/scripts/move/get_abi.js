require("dotenv").config();
const fs = require("node:fs");

// Replace with the name of your module
const moduleName = "message_board";

// Fetch ABI from the full node
const url = `https://fullnode.${process.env.VITE_APP_NETWORK}.aptoslabs.com/v1/accounts/${process.env.VITE_MODULE_ADDRESS}/module/${moduleName}`;

async function getAbi() {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      const abi = response.abi;
      const abiString = `export const ABI = ${JSON.stringify(abi)} as const;`;

      // Write ABI to abi.ts file
      fs.writeFileSync("frontend/utils/abi.ts", abiString);
      console.log("ABI saved to frontend/utils/abi.ts");
    })
    .catch((error) => {
      console.error("Error fetching ABI:", error);
    });
}

getAbi();
