import { World, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import * as path from 'path';

export class GameWorld extends World {
  browser!: Browser;
  page!: Page;

  // Test state
  towerId: string = '';
  unitId: string = '';
  attackerId: string = '';
  defenderId: string = '';
  lastDmg: number = 0;
  lastHpBefore: number = 0;
  lastHpAfter: number = 0;
  lastTriangleApplied: boolean = false;

  async openGame() {
    this.browser = await chromium.launch({ headless: true });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
    const filePath = path.resolve(__dirname, '../../index.html');
    await this.page.goto(`file://${filePath}?test=1`);
    // Wait for game script to load
    await this.page.waitForFunction(() => !!(window as any).__test);
  }

  async startSoloGame() {
    await this.page.evaluate(() => (window as any).__test.startSolo());
    // Wait for game to initialize
    await this.page.waitForTimeout(500);
  }

  async closeGame() {
    if (this.browser) await this.browser.close();
  }

  async eval<T>(fn: string): Promise<T> {
    return this.page.evaluate(fn) as Promise<T>;
  }
}

setWorldConstructor(GameWorld);
