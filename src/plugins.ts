const core = require("@actions/core");
const exec = require("@actions/exec");
const tc = require("@actions/tool-cache");
const fs = require("fs");
const path = require("path");
const os = require("./platform");
const validate = require("./validations");
const composer = require("./composer");

export const installPlugins = async (list: string) => {
  const plugins = list.trim().split(",");
  for (const plugin of plugins) {
    await installPlugin(plugin);
  }
};

const installPlugin = async (plugin: string) => {
  const protocVer = core.getInput("protoc-version");

  switch (plugin) {
    case "go-grpc":
      await installGoGRPCPlugin(protocVer);
      break;
    case "go":
      await installGoPlugin(protocVer);
      break;
    case "php":
      await installPHPPlugin(protocVer);
      break;
    case "validate":
      await installValidatePlugin(protocVer);
      break;
    default:
      throw new Error(`Plugin ${plugin} is not supported`);
  }

};

const installGoGRPCPlugin = async (version: string) => {
  core.info("Installing go-grpc plugin");
  await validate.validateGoBin();
  await exec.exec("go", ["install", "google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest"]);
};

const installGoPlugin = async (version: string) => {
  core.info("Installing go plugin");
  await validate.validateGoBin();
  await exec.exec("go", ["install", "google.golang.org/protobuf/cmd/protoc-gen-go@latest"]);
};

const installValidatePlugin = async (version: string) => {
  core.info("Installing validate plugin");
  await validate.validateGoBin();
  await exec.exec("go", ["install", "github.com/envoyproxy/protoc-gen-validate@latest"]);
};

const installPHPPlugin = async (version: string) => {
  core.info("Installing php plugin");
  await validate.validatePHPBin();

  // const executableFileName = "protoc-gen-php";
  // const cachedFileName = "protoc-gen-php";
  //
  // const url = `https://github.com/protocolbuffers/protobuf/releases/download/v${version}/protoc-${version}-${platform}-${arch}.zip`;
  // const protoc = await tc.downloadTool(url);
  // const protocFolder = await tc.extractZip(protoc);
  // const protocFile = path.join(protocFolder, "bin", executableFileName);
  //
  // return tc.cacheFile(protocFile, cachedFileName, executableFileName, version, arch);
};
