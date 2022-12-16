const core = require("@actions/core");
const tc = require("@actions/tool-cache");
const fs = require("fs");
const path = require("path");
const os = require("./platform");

export const installPlugins = async (list: string) => {
  const plugins = list.trim().split(","); 
}
