import { Before, After } from '@cucumber/cucumber';
import { GameWorld } from './world';

Before(async function (this: GameWorld) {
  await this.openGame();
});

After(async function (this: GameWorld) {
  await this.closeGame();
});
