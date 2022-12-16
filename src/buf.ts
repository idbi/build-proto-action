const core = require("@actions/core");
const tc = require("@actions/tool-cache");
const exec = require("@actions/exec");
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

export const update = async () => {
  const context = core.getInput("context");
  const options = {
    cwd: context,
  };
  const proto = core.getInput("proto");
  await exec.exec("buf", ["mod", "update", proto], options);
};
export const run = async () => {
  const context = core.getInput("context");
  const options = {
    cwd: context,
  };
  await exec.exec("buf", ["generate"], options);
};

const download = async (version: string, platform: string, arch: string): Promise<Buffer> => {
  const url = `https://github.com/bufbuild/buf/releases/download/v${version}/buf-${platform}-${arch}`;
  const protoc = await tc.downloadTool(url);

  return tc.cacheFile(protoc, cachedFileName, executableFileName, version, arch);
};
