const core = require("@actions/core");
const tc = require("@actions/tool-cache");
const exec = require("@actions/exec");
const fs = require("fs");
const path = require("path");
const io = require("@actions/io");
const validate = require("./validations");

export const install = async () => {
  await validate.validatePHPBin();

  await exec.exec("php", ["-r", "copy('https://getcomposer.org/installer', 'composer-setup.php');"]);
  await exec.exec("php", ["composer-setup.php"]);
  await exec.exec("php", ["-r", "unlink('composer-setup.php');"]);

  await io.mv("composer.phar", "composer");

  fs.chmodSync("composer", "777");
  core.addPath("composer");
};
