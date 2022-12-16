const core = require("@actions/core");
const fs = require("fs");

import glob from "glob";

const validateWorkingDir = async () => {
  const workingDir = core.getInput("working-dir");
  if (!fs.existsSync(workingDir)) {
    throw new Error(`Working directory ${workingDir} does not exist`);
  }
};

const validateBufConfig = async () => {
  const workingDir = core.getInput("working-dir");
  const bufWorkPath = `${workingDir}/buf.work.yaml`;
  if (!fs.existsSync(bufWorkPath)) {
    throw new Error(`buf.work.yaml not found in ${workingDir}`);
  }

  const bufGenPath = `${workingDir}/buf.gen.yaml`;
  if (!fs.existsSync(bufGenPath)) {
    throw new Error(`buf.gen.yaml not found in ${workingDir}`);
  }
};

export const validateConfig = async () => {
  await validateWorkingDir();
  await validateBufConfig();
};
