import core from '@actions/core'
import tc from '@actions/tool-cache'
import fs from 'fs'
import path from 'path'
import * as os from './platform'

const cachedFileName = 'protoc'
const executableFileName = 'protoc'

export const install = async (version: string): Promise<void> => {
  const platform = os.platform()
  const arch = os.arch()

  let toolPath = tc.find(executableFileName, version, arch)

  if (!toolPath) {
    toolPath = await download(version, platform, arch)
  }

  fs.chmodSync(path.join(toolPath, executableFileName), '777')
  core.addPath(toolPath)
}

export const download = async (
  version: string,
  platform: string,
  arch: string
): Promise<string> => {
  const url = `https://github.com/protocolbuffers/protobuf/releases/download/v${version}/protoc-${version}-${platform}-${arch}.zip`
  const protoc = await tc.downloadTool(url)
  const protocFolder = await tc.extractZip(protoc)
  const protocFile = path.join(protocFolder, 'bin', executableFileName)

  return tc.cacheFile(
    protocFile,
    cachedFileName,
    executableFileName,
    version,
    arch
  )
}
