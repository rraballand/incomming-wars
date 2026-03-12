import { Given, Then, When } from '@cucumber/cucumber';
import { GameWorld } from '../support/world';
import { getBounty, getForgeCost, getGoldRateBase, getApocalypseData } from '../support/game-helpers';
import * as assert from 'assert';

Given('les constantes du jeu sont chargées', async function (this: GameWorld) {
  // Game is loaded in Before hook, constants available via __test
});

Given('un {string} ennemi avec un coût de {int}', async function (this: GameWorld, unitId: string, _cost: number) {
  this.unitId = unitId;
});

Given('un joueur avec un income de {int}', async function (this: GameWorld, income: number) {
  // Store for apocalypse test
  this.lastDmg = income; // reuse field to store income value
});

When('il déclenche l\'apocalypse', async function (this: GameWorld) {
  const data = await getApocalypseData(this.page);
  this.lastHpAfter = Math.round(this.lastDmg * (1 - data.penalty) * 10) / 10;
});

Then('l\'income de base est {float}', async function (this: GameWorld, expected: number) {
  const base = await getGoldRateBase(this.page);
  assert.strictEqual(base, expected, `Income de base attendu: ${expected}, obtenu: ${base}`);
});

Then('le bounty pour l\'avoir tué est {int}', async function (this: GameWorld, expectedBounty: number) {
  const bounty = await getBounty(this.page, this.unitId);
  assert.strictEqual(bounty, expectedBounty,
    `Bounty attendu: ${expectedBounty}, obtenu: ${bounty}`);
});

Then('la forge {string} au niveau {int} coûte {int}', async function (this: GameWorld, forgeId: string, level: number, expectedCost: number) {
  const cost = await getForgeCost(this.page, forgeId, level);
  assert.strictEqual(cost, expectedCost,
    `Forge ${forgeId} niveau ${level}: coût attendu ${expectedCost}, obtenu ${cost}`);
});

Then('le coût de l\'apocalypse est {int}', async function (this: GameWorld, expectedCost: number) {
  const data = await getApocalypseData(this.page);
  assert.strictEqual(data.cost, expectedCost,
    `Coût apocalypse attendu: ${expectedCost}, obtenu: ${data.cost}`);
});

Then('la pénalité d\'income de l\'apocalypse est {float}', async function (this: GameWorld, expectedPenalty: number) {
  const data = await getApocalypseData(this.page);
  assert.strictEqual(data.penalty, expectedPenalty,
    `Pénalité attendue: ${expectedPenalty}, obtenue: ${data.penalty}`);
});

Then('son income est de {int}', async function (this: GameWorld, expectedIncome: number) {
  assert.strictEqual(this.lastHpAfter, expectedIncome,
    `Income après apocalypse attendu: ${expectedIncome}, obtenu: ${this.lastHpAfter}`);
});
