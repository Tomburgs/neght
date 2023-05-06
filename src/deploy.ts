import shell, { ExecOptions } from 'shelljs';

type DeployArgs = {
  /** Directory to deploy. */
  dir: string;
  /** Git branch to deploy to. */
  branch: string;
  /** Git remote to push to. */
  remote: string;
  /** Git name to use for the commit. */
  gitName: string;
  /** Git email to use for the commit. */
  gitEmail: string;
  /** Message to use for the commit. */
  commitMessage: string;
};

export async function deploy(args: DeployArgs) {
  console.log('==> Deploying');

  const url = getGitURL(args);
  const silent: ExecOptions = { silent: true };
  const cwd = process.cwd();

  shell.cd(args.dir);
  shell.exec('git init', silent);
  shell.touch('.nojekyll');

  shell.exec(`git config user.name ${JSON.stringify(args.gitName)}`, silent);
  shell.exec(`git config user.email ${JSON.stringify(args.gitEmail)}`, silent);
  shell.exec('git config commit.gpgsign false', silent);

  shell.exec('git add .', silent);
  shell.exec(`git commit -m ${JSON.stringify(args.commitMessage)}`, silent);

  shell.exec(`git push --force --quiet ${url} HEAD:${args.branch}`, silent);

  shell.rm('-rf', '.git');
  shell.rm('.nojekyll');
  shell.cd(cwd); // Return back to where we came from

  console.log('==> Deployment done 🐙');
}

function getGitURL(args: DeployArgs): string {
  const ref = shell.exec(`git config --get remote.${args.remote}.url`, {
    silent: true,
  });

  return ref.stdout.trim();
}
