export const platform = (): string => {
  // @ts-ignore
  const plat = {
    linux: 'Linux',
    darwin: 'Darwin'
  }[process.platform]

  if (!plat) {
    throw new Error(`Unsupported platform: ${process.platform}`)
  }

  return plat
}

export const arch = (): string => {
  // @ts-ignore
  const architecture = {
    x64: 'x86_64'
  }[process.arch]

  if (!architecture) {
    throw new Error(`Unsupported architecture: ${process.arch}`)
  }

  return architecture
}
