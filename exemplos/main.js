const fatorial = require('./fatorial');
const argv = require('yargs').demandOption('num').argv;

const num = argv.num;

console.log(`O fatorial de ${num} é gual a ${fatorial(num)}`);

console.log(module.paths);