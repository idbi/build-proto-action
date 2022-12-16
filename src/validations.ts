const core = require("@actions/core");
const io = require("@actions/io");
const fs = require("fs");

const validateContext = async () => {
  const context = core.getInput("context");
  if (!fs.existsSync(context)) {
    throw new Error(`Working directory ${context} does not exist`);
  }
};

const validateBufConfig = async () => {
  const context = core.getInput("context");
  const bufWorkPath = `${context}/buf.work.yaml`;
  if (!fs.existsSync(bufWorkPath)) {
    throw new Error(`buf.work.yaml not found in ${context}`);
  }

  const bufGenPath = `${context}/buf.gen.yaml`;
  if (!fs.existsSync(bufGenPath)) {
    throw new Error(`buf.gen.yaml not found in ${context}`);
  }
};

export const validateGoBin = async () => {
  const goBin = await io.which("go", true);
  if (!fs.existsSync(goBin)) {
    throw new Error(`go-bin ${goBin} does not exist`);
  }
}

export const validatePHPBin = async () => {
  const phpBin = await io.which("php", true);
  if (!fs.existsSync(phpBin)) {
    throw new Error(`php-bin ${phpBin} does not exist`);
  }
}

export const validateComposerBin = async () => {
  const composerBin = await io.which("composer", true);
  if (!fs.existsSync(composerBin)) {
    throw new Error(`composer-bin ${composerBin} does not exist`);
  }
}

export const validateConfig = async () => {
  await validateContext();
  await validateBufConfig();
  await validateGoBin();
};

