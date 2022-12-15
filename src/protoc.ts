const tc = require("@actions/tool-cache");

const cachedFileName = "protoc";
const executableFileName = "protoc";

export const download = async (version: string, platform: string, arch: string): Promise<Buffer> => {
  const url = `https://github.com/bufbuild/buf/releases/download/v${version}/buf-${platform}-${arch}`;
  const buf = await tc.downloadTool(url);

  return tc.cacheFile(buf, cachedFileName, executableFileName, version, arch);
};

