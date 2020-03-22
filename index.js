const path = require('path');
const child_process = require('child_process');

let packages = require('./search.json')
  // .filter(pkg => !pkg.name.startsWith("elm/"))
  .filter(pkg => pkg.name.startsWith("ianmackenzie/"))
  .filter(pkg => !pkg.name.startsWith("ianmackenzie/elm-3d-camera"))

console.log(packages.map(pkg => pkg.name));

// packages = [packages[0]]
packages.forEach(pkg => {
  try {
    child_process.execSync(`git clone https://github.com/${pkg.name} packages/${pkg.name}`);
  } catch(error){}
  try {
    child_process.execSync(`LOCAL_ELM_REVIEW_SRC=/home/jeroen/dev/elm-review/src ~/dev/node-elm-review/bin/elm-review --config /home/jeroen/dev/elm-review/review/`
      , {cwd : path.join(__dirname, 'packages', pkg.name)}
    );
    console.log(`${pkg.name}: OK`);
  } catch(error){
    console.log(`${pkg.name}: FAILURE`);
    console.log('--------------- STDOUT ------------------');
    console.error(error.stdout.toString());
    console.log('--------------- STDERR ------------------');
    console.error(error.stderr.toString());
  }
});
