import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import { build } from './build.js';
import { deploy } from './deploy.js';

const args = await yargs(hideBin(process.argv))
  // TODO: proper version reporting. for now just install the version you want?
  .version(false)
  .option('help', {
    alias: 'h',
    desc: 'Show help.',
    type: 'boolean'
  })
  .options('dir', {
    alias: 'd',
    desc: 'Specify the root directory of your app.',
    type: 'string',
    default: process.cwd(),
  })
  .option('script', {
    alias: 's',
    desc: 'Specify the build script in your package.json.',
    type: 'string',
    default: 'build'
  })
  .option('dry-run', {
    desc: 'Run build but hold off on publishing.',
    type: 'boolean'
  })
  .option('branch', {
    desc: 'Git branch to push to.',
    type: 'string',
    default: 'gh-pages'
  })
  .option('remote', {
    desc: 'Git remote to push to.',
    type: 'string',
    default: 'origin'
  })
  .option('git-name', {
    desc: 'name to use for the git commit.',
    type: 'string',
    default: 'Neght Bot'
  })
  .option('git-email', {
    desc: 'email to use for the git commit.',
    type: 'string',
    default: 'neght@github.com'
  })
  .option('commit-message', {
    desc: 'message for the git commit',
    type: 'string',
    default: 'Deploy Next to GitHub Pages'
  })
  .argv


const { distDir } = await build({
  dir: args.dir,
  script: args.script
})

if (args.dryRun) {
  console.info('==> Exiting without publishing due to dry-run set.');
  process.exit(0);
}

await deploy({
  dir: distDir,
  branch: args.branch,
  remote: args.remote,
  gitName: args.gitName,
  gitEmail: args.gitEmail,
  commitMessage: args.commitMessage,
})

process.exit(0)
