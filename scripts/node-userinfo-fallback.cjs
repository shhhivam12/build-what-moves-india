// Node 24 on some Windows sessions can report ENOMEM from os.userInfo() even
// when memory is available. tsx calls it only to name a temporary directory.
// Keep the native value when it works and provide the minimum safe fallback
// needed for local schema generation when that specific system error occurs.
/* eslint-disable @typescript-eslint/no-require-imports */
const os = require("node:os");

try {
  os.userInfo();
} catch (error) {
  if (error?.code !== "ERR_SYSTEM_ERROR" || error?.info?.code !== "ENOMEM") {
    throw error;
  }

  os.userInfo = () => ({
    uid: -1,
    gid: -1,
    username: process.env.USERNAME || "local-user",
    homedir: process.env.USERPROFILE || process.cwd(),
    shell: null,
  });
}
