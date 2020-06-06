const path = require('path');
const child_process = require('child_process');

let packages = require('./search.json')
  // .filter(pkg => !pkg.name.startsWith("elm/"))
  // TODO Stop filtering for ianmackenzie. It's
  .filter(pkg => pkg.name.startsWith("ianmackenzie/"))
  .filter(pkg => !pkg.name.startsWith("ianmackenzie/elm-3d-camera"))

console.log(packages.map(pkg => pkg.name));

// packages = [packages[0]]
packages.forEach(pkg => {
  try {
    // TODO Pull if the package already exists?
    child_process.execSync(`git clone https://github.com/${pkg.name} packages/${pkg.name}`);
  } catch(error){}
  try {
    // const command = `LOCAL_ELM_REVIEW_SRC=/path-to-elm-review/src ~/dev/node-elm-review/bin/elm-review --config /path-to-review-folder/`;
    const command = `elm-review --config /path-to-review-folder/`;
    child_process.execSync(command, {cwd : path.join(__dirname, 'packages', pkg.name)});
  } catch(error){
    console.log(`${pkg.name}: FAILURE`);
    console.log('--------------- STDOUT ------------------');
    console.error(error.stdout.toString());
    console.log('--------------- STDERR ------------------');
    console.error(error.stderr.toString());
  }
});
