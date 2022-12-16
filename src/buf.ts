import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as fs from 'fs'
import * as path from 'path'
import * as os from './platform'

const cachedFileName = 'buf'
const executableFileName = 'buf'

export const install = async (version: string): Promise<void> => {
  const platform = os.platform()
  const arch = os.arch()

  let toolPath: string = tc.find(executableFileName, version, arch)

  if (!toolPath) {
    toolPath = await download(version, platform, arch)
  }

  fs.chmodSync(path.join(toolPath, executableFileName), '777')
  core.addPath(toolPath)
}

export const update = async (): Promise<void> => {
  const context = core.getInput('context')
  const options = {
    cwd: context
  }
  const proto = core.getInput('proto')
  await exec.exec('buf', ['mod', 'update', proto], options)
}
export const run = async (): Promise<void> => {
  const context = core.getInput('context')
  const options = {
    cwd: context
  }
  await exec.exec('buf', ['generate'], options)
}

const download = async (
  version: string,
  platform: string,
  arch: string
): Promise<string> => {
  const url = `https://github.com/bufbuild/buf/releases/download/v${version}/buf-${platform}-${arch}`
  const protoc = await tc.downloadTool(url)

  return tc.cacheFile(protoc, cachedFileName, executableFileName, version, arch)
}
