const core = require("@actions/core");
const tc = require("@actions/tool-cache");
const fs = require("fs");
const path = require("path");
const os = require("./platform");

const cachedFileName = "protoc";
const executableFileName = "protoc";


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


export const download = async (version: string, platform: string, arch: string): Promise<Buffer> => {
  const url = `https://github.com/protocolbuffers/protobuf/releases/download/v${version}/protoc-${version}-${platform}-${arch}.zip`;
  const protoc = await tc.downloadTool(url);
  const protocFolder = await tc.extractZip(protoc);
  const protocFile = path.join(protocFolder, "bin", executableFileName);

  return tc.cacheFile(protocFile, cachedFileName, executableFileName, version, arch);
};

