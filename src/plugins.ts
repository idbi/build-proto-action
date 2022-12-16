import core from '@actions/core'
import exec from '@actions/exec'
import * as validate from './validations'

export const installPlugins = async (list: string): Promise<void> => {
  const plugins = list.trim().split(',')
  for (const plugin of plugins) {
    await installPlugin(plugin)
  }
}

const installPlugin = async (plugin: string): Promise<void> => {
  switch (plugin) {
    case 'go-grpc':
      await installGoGRPCPlugin()
      break
    case 'go':
      await installGoPlugin()
      break
    case 'php':
      await installPHPPlugin()
      break
    case 'validate':
      await installValidatePlugin()
      break
    default:
      throw new Error(`Plugin ${plugin} is not supported`)
  }
}

const installGoGRPCPlugin = async (): Promise<void> => {
  core.info('Installing go-grpc plugin')
  await validate.validateGoBin()
  await exec.exec('go', [
    'install',
    'google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest'
  ])
}

const installGoPlugin = async (): Promise<void> => {
  core.info('Installing go plugin')
  await validate.validateGoBin()
  await exec.exec('go', [
    'install',
    'google.golang.org/protobuf/cmd/protoc-gen-go@latest'
  ])
}

const installValidatePlugin = async (): Promise<void> => {
  core.info('Installing validate plugin')
  await validate.validateGoBin()
  await exec.exec('go', [
    'install',
    'github.com/envoyproxy/protoc-gen-validate@latest'
  ])
}

const installPHPPlugin = async (): Promise<void> => {
  core.info('Installing php plugin')
  await validate.validatePHPBin()
  await validate.validateComposerBin()
}
