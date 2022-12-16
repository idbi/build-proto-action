const core = require("@actions/core");
const tc = require("@actions/tool-cache");
const fs = require("fs");
const path = require("path");
const os = require("./platform");

const cachedFileName = "buf";
const executableFileName = "buf";

export const install = async (version: string) => {
  const platform = os.platform();
  const arch = os.arch();

  let toolPath = tc.find(executableFileName, version, arch);

  if (!toolPath) {
    toolPath = await download(version, platform, arch);
  }

  fs.chmodSync(path.join(toolPath, executableFileName), "777");
  core.addPath(toolPath);
};

const download = async (version: string, platform: string, arch: string): Promise<Buffer> => {
  const url = `https://github.com/bufbuild/buf/releases/download/v${version}/buf-${platform}-${arch}`;
  const protoc = await tc.downloadTool(url);

  return tc.cacheFile(protoc, cachedFileName, executableFileName, version, arch);
};
