import { validateConfig } from "./validations";
import { installPlugins } from "./plugins";

const buf = require("./buf");
const protoc = require("./protoc");

const core = require('@actions/core')


async function run(): Promise<void> {
  try {
    await validateConfig()
    await installDependencies()

    const plugins = core.getInput('plugins');
    await installPlugins(plugins);

    await buf.update();
    await buf.run();
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

const installDependencies = async () => {
    const bufVersion = core.getInput('buf-version');
    await buf.install(bufVersion);

    const protocVersion = core.getInput('protoc-version');
    await protoc.install(protocVersion);


}


void run()