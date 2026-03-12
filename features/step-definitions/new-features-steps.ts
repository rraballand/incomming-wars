import { Then } from '@cucumber/cucumber';
import { GameWorld } from '../support/world';
import { getSpellCount, getSpellData, getTowerCount, getTowerIncome, getTowerCost } from '../support/game-helpers';
import * as assert from 'assert';

Then('il y a {int} sorts disponibles', async function (this: GameWorld, expected: number) {
  const count = await getSpellCount(this.page);
  assert.strictEqual(count, expected, `Nombre de sorts attendu: ${expected}, obtenu: ${count}`);
});

Then('le sort {string} coûte {int}', async function (this: GameWorld, spellId: string, expectedCost: number) {
  const spell = await getSpellData(this.page, spellId);
  assert.strictEqual(spell.cost, expectedCost, `Coût du sort ${spellId} attendu: ${expectedCost}, obtenu: ${spell.cost}`);
});

Then('il y a {int} tours disponibles', async function (this: GameWorld, expected: number) {
  const count = await getTowerCount(this.page);
  assert.strictEqual(count, expected, `Nombre de tours attendu: ${expected}, obtenu: ${count}`);
});

Then('la tour {string} a un revenu de {float}', async function (this: GameWorld, towerId: string, expectedIncome: number) {
  const income = await getTowerIncome(this.page, towerId);
  assert.strictEqual(income, expectedIncome, `Revenu de ${towerId} attendu: ${expectedIncome}, obtenu: ${income}`);
});

Then('la tour {string} coûte {int}', async function (this: GameWorld, towerId: string, expectedCost: number) {
  const cost = await getTowerCost(this.page, towerId);
  assert.strictEqual(cost, expectedCost, `Coût de ${towerId} attendu: ${expectedCost}, obtenu: ${cost}`);
});
