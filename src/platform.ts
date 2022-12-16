export const platform = (): string => {
  // @ts-ignore
  const platform = ({
    "linux": "Linux",
    "darwin": "Darwin"
  })[process.platform];

  if (!platform) {
    throw new Error(`Unsupported platform: ${process.platform}`);
  }

  return platform;
};

export const arch = (): string => {
  // @ts-ignore
  const arch = ({
    "x64": "x86_64"
  })[process.arch];

  if (!arch) {
    throw new Error(`Unsupported architecture: ${process.arch}`);
  }

  return arch;
};
