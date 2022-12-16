const core = require("@actions/core");
const io = require("@actions/io");
const exec = require('@actions/exec');

const validateWorkingDir = async () => {
  const workingDir = core.getInput("working-dir");
  if (!io.exists(workingDir)) {
    core.setFailed(`Working directory ${workingDir} does not exist`);
  }
}

const validateBufConfig = async () => {
  const workingDir = core.getInput("working-dir");
  const bufWorkPath = `${workingDir}/buf.work.yaml`;
  if (!io.exists(bufWorkPath)) {
    core.setFailed(`buf.work.yaml does not exist in ${workingDir}`);
  }
  const bufGenPath = `${workingDir}/buf.gen.yaml`;
  if (!io.exists(bufGenPath)) {
    core.setFailed(`buf.gen.yaml does not exist in ${workingDir}`);
  }
}

const validateBufVersion = async () => {
  const options = {
    listeners: {}
  };
  options.listeners = {
    stdout: (data: Buffer) => {
      core.info(data.toString());
    }
  }
  await exec.exec("buf", ["version"], options);
}

export const validateConfig = async () => {
  await validateWorkingDir();
  await validateBufConfig();
}
