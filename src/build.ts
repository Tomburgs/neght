import path from 'path';
import shell from 'shelljs';

type BuildArgs = {
  /** Root directory */
  dir: string;
  /** Build script defined in package.json */
  script: string;
};

type BuildOutput = {
  /** Directory in which build files are output(ted?). */
  distDir: string;
};

export async function validate(args: BuildArgs) {
  console.log('==> Validating next.config.js');

  try {
    const [cfg, pkg] = await Promise.all([
      getNextConfig(args),
      getPackageFile(args),
    ]);

    if (cfg.output !== 'export') {
      throw new Error(
        `Neght validation failed: in next.config.js expected 'output' to be 'export', but instead was ${cfg.output}.`,
      );
    }

    if (!pkg.scripts[args.script]) {
      throw new Error(
        `Neght validation failed: in package.json expected script '${args.script}' to be defined.`,
      );
    }
  } catch (err) {
    console.error('Failed to validate build args.');
    throw err;
  }
}

export async function build(args: BuildArgs): Promise<BuildOutput> {
  await validate(args);

  console.log('==> Building Next');

  const cfg = await getNextConfig(args);
  const cwd = process.cwd();

  shell.cd(args.dir);
  shell.exec(`npm run ${args.script}`);
  shell.cd(cwd);

  return {
    // Next's default distDir is 'out'
    distDir: path.resolve(args.dir, cfg.distDir ?? 'out'),
  };
}

type NextConfig = {
  output?: 'standalone' | 'export';
  distDir?: string;
};

async function getNextConfig(args: BuildArgs): Promise<NextConfig> {
  const cfg = await import(path.resolve(args.dir, 'next.config.js'));

  return cfg.default as NextConfig;
}

type Package = {
  scripts: Record<string, string>;
};

async function getPackageFile(args: BuildArgs): Promise<Package> {
  const cfg = await import(path.resolve(args.dir, 'package.json'), {
    assert: { type: 'json' },
  });

  return cfg.default as Package;
}
