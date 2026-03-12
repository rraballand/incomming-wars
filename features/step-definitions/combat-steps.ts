import { Given, When, Then } from '@cucumber/cucumber';
import { GameWorld } from '../support/world';
import { simulateMelee, getChargeDmg } from '../support/game-helpers';
import * as assert from 'assert';

Given('un {string} attaquant sans forge', async function (this: GameWorld, attackerId: string) {
  this.attackerId = attackerId;
});

Given('un {string} défenseur sans forge', async function (this: GameWorld, defenderId: string) {
  this.defenderId = defenderId;
});

Given('un {string} avec chargeDmg {int}', async function (this: GameWorld, unitId: string, _chargeDmg: number) {
  this.attackerId = unitId;
});

When('l\'attaquant frappe le défenseur', async function (this: GameWorld) {
  const result = await simulateMelee(this.page, this.attackerId, this.defenderId, 0);
  this.lastDmg = result.dmg;
  this.lastTriangleApplied = result.triangleApplied;
});

When('le chevalier charge', async function (this: GameWorld) {
  this.lastDmg = await getChargeDmg(this.page, this.attackerId, 0);
});

Then('le défenseur perd {int} HP', async function (this: GameWorld, expectedDmg: number) {
  assert.strictEqual(this.lastDmg, expectedDmg,
    `Dégâts attendus: ${expectedDmg}, obtenus: ${this.lastDmg}`);
});

Then('les dégâts sont multipliés par {float}', async function (this: GameWorld, _multiplier: number) {
  assert.strictEqual(this.lastTriangleApplied, true,
    `Le bonus triangle devrait s'appliquer pour ${this.attackerId} vs ${this.defenderId}`);
});

Then('les dégâts ne sont PAS multipliés', async function (this: GameWorld) {
  assert.strictEqual(this.lastTriangleApplied, false,
    `Le bonus triangle ne devrait PAS s'appliquer pour ${this.attackerId} vs ${this.defenderId}`);
});

Then('les dégâts de charge sont {int}', async function (this: GameWorld, expectedDmg: number) {
  assert.strictEqual(this.lastDmg, expectedDmg,
    `Charge attendue: ${expectedDmg}, obtenue: ${this.lastDmg}`);
});

Then('le milicien perd {int} HP', async function (this: GameWorld, expectedDmg: number) {
  assert.strictEqual(this.lastDmg, expectedDmg,
    `Dégâts attendus: ${expectedDmg}, obtenus: ${this.lastDmg}`);
});
