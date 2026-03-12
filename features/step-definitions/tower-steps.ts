import { Given, When, Then } from '@cucumber/cucumber';
import { GameWorld } from '../support/world';
import { hitsToKill, canTarget } from '../support/game-helpers';
import * as assert from 'assert';

Given('une tour {string} sans bonus de forge', async function (this: GameWorld, towerId: string) {
  this.towerId = towerId;
});

Given('une tour {string} qui cible {string}', async function (this: GameWorld, towerId: string, _targets: string) {
  this.towerId = towerId;
});

Given('un {string} ennemi sans bonus de forge', async function (this: GameWorld, unitId: string) {
  this.unitId = unitId;
});

Given('un {string} ennemi volant', async function (this: GameWorld, unitId: string) {
  this.unitId = unitId;
});

Given('un {string} ennemi au sol', async function (this: GameWorld, unitId: string) {
  this.unitId = unitId;
});

When('la tour tire sur l\'unité', async function (this: GameWorld) {
  // hits calculated in Then step
});

Then('l\'unité devrait mourir en {int} tir(s)', async function (this: GameWorld, expectedHits: number) {
  const hits = await hitsToKill(this.page, this.towerId, this.unitId, 0);
  assert.strictEqual(hits, expectedHits,
    `Tour ${this.towerId} devrait tuer ${this.unitId} en ${expectedHits} tir(s), mais il en faut ${hits}`);
});

Then('la tour ne devrait pas pouvoir cibler l\'unité', async function (this: GameWorld) {
  const can = await canTarget(this.page, this.towerId, this.unitId);
  assert.strictEqual(can, false,
    `Tour ${this.towerId} ne devrait PAS cibler ${this.unitId}`);
});

Then('la tour devrait pouvoir cibler l\'unité', async function (this: GameWorld) {
  const can = await canTarget(this.page, this.towerId, this.unitId);
  assert.strictEqual(can, true,
    `Tour ${this.towerId} devrait pouvoir cibler ${this.unitId}`);
});
