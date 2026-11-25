import assert from 'node:assert/strict'
import { status } from './status.js'

assert.equal(status(1, 20), 'Fermé le lundi') // lundi soir
assert.equal(status(2, 1), 'Ouvre ce soir à 18h') // nuit de lundi à mardi : fermé
assert.equal(status(0, 1), 'Ouvert jusqu’à 2h') // nuit de samedi à dimanche
assert.equal(status(2, 19), 'Ouvert jusqu’à 2h')
assert.equal(status(3, 15), 'Ouvre ce soir à 18h')
console.log('status ok')
