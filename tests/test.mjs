

import { assert } from 'console';
import { checkConnections } from '../build/connection_validator.js';
import { asDigitaljs } from '../build/index.js';

import fulladder from './circuits/fulladder.mjs';
import lfsr from './circuits/lfsr.mjs';
import bad_connection from './circuits/bad_connection.mjs'
import missing_input from './circuits/missing_input.mjs'
import missing_output from './circuits/missing_output.mjs'
import multiple_connectors_to_one_input from './circuits/multiple_connectors_to_one_input.mjs'
import use_output from './circuits/use_output.mjs';
import orr_block from './circuits/orr_block.mjs';
import gcd from './circuits/gcd.mjs';

// Should fail
assert(!checkConnections(asDigitaljs(bad_connection), true))
assert(!checkConnections(asDigitaljs(missing_input), true))
assert(!checkConnections(asDigitaljs(missing_output), true))
assert(!checkConnections(asDigitaljs(multiple_connectors_to_one_input), true))

// Should pass
assert(checkConnections(asDigitaljs(use_output), true));
assert(checkConnections(asDigitaljs(fulladder), true))
assert(checkConnections(asDigitaljs(lfsr), true));
assert(checkConnections(asDigitaljs(orr_block), true));
assert(checkConnections(asDigitaljs(gcd), true));
