import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import { build } from './build.js';

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
  }).argv


build({
  dir: args.dir,
  script: args.script
})
