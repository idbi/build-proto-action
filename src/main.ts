import { validateConfig } from "./validations";
import { installPlugins } from "./plugins";

import * as buf from "./buf";
import * as protoc from "./protoc";

import * as core from "@actions/core";

async function run(): Promise<void> {
  try {
    await validateConfig()
    await installDependencies()

    const plugins = core.getInput('plugins')
    await installPlugins(plugins)

    await buf.update()
    await buf.run()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

const installDependencies = async (): Promise<void> => {
  const bufVersion = core.getInput("buf-version");
  await buf.install(bufVersion);

  const protocVersion = core.getInput("protoc-version");
  await protoc.install(protocVersion);
};

void run();
