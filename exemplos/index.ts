import { fatorial } from './fatorial'
import * as yargs from 'yargs'

const argv = yargs
    .demandOption('num')
    .argv;

const num = argv.num;

console.log(`-> O fatorial de ${num} é gual a ${fatorial(num)}`);