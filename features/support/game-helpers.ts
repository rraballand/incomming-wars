import { Page } from 'playwright';

export interface UnitData {
  id: string;
  atk: number;
  hp: number;
  cost: number;
  chargeDmg: number;
  range: number;
  fly: boolean;
  siege: boolean;
  inc: number;
}

export interface TowerData {
  id: string;
  dmg: number;
  hp: number;
  cost: number;
  atkSpd: number;
  range: number;
  targets: string;
  splash: number;
  dot: boolean;
}

/** Get unit stats by id */
export async function getUnit(page: Page, unitId: string): Promise<UnitData> {
  return page.evaluate((id) => {
    const t = (window as any).__test;
    const u = t.ATK.find((a: any) => a.id === id);
    return { id: u.id, atk: u.atk, hp: u.hp, cost: u.cost, chargeDmg: u.chargeDmg || 0, range: u.range, fly: u.fly, siege: u.siege, inc: u.inc };
  }, unitId);
}

/** Get tower stats by id */
export async function getTower(page: Page, towerId: string): Promise<TowerData> {
  return page.evaluate((id) => {
    const t = (window as any).__test;
    const tw = t.TOWERS.find((a: any) => a.id === id);
    return { id: tw.id, dmg: tw.dmg, hp: tw.hp, cost: tw.cost, atkSpd: tw.atkSpd, range: tw.range, targets: tw.targets, splash: tw.splash, dot: tw.dot };
  }, towerId);
}

/** Calculate hits to kill a unit with tower damage */
export async function hitsToKill(page: Page, towerId: string, unitId: string, forgeLevel: number = 0): Promise<number> {
  return page.evaluate(({ tid, uid, fl }) => {
    const t = (window as any).__test;
    const tower = t.TOWERS.find((a: any) => a.id === tid);
    const unit = t.ATK.find((a: any) => a.id === uid);
    // Forge multiplier: 1 + (0.20 * level) for def
    const defMul = 1 + 0.20 * fl;
    const dmg = Math.floor(tower.dmg * defMul);
    const hp = unit.hp; // No forge on unit HP
    return Math.ceil(hp / dmg);
  }, { tid: towerId, uid: unitId, fl: forgeLevel });
}

/** Simulate melee damage with triangle bonus */
export async function simulateMelee(page: Page, attackerId: string, defenderId: string, forgeLevel: number = 0): Promise<{ dmg: number; triangleApplied: boolean }> {
  return page.evaluate(({ aid, did, fl }) => {
    const t = (window as any).__test;
    const attacker = t.ATK.find((a: any) => a.id === aid);
    const atkMul = 1 + 0.15 * fl;
    let dmg = Math.floor(attacker.atk * atkMul);
    const triangleApplied = !!(t.STRONG_VS[aid] && t.STRONG_VS[aid] === did);
    if (triangleApplied) dmg = Math.floor(dmg * t.STRONG_MUL);
    return { dmg, triangleApplied };
  }, { aid: attackerId, did: defenderId, fl: forgeLevel });
}

/** Get charge damage for a unit */
export async function getChargeDmg(page: Page, unitId: string, forgeLevel: number = 0): Promise<number> {
  return page.evaluate(({ uid, fl }) => {
    const t = (window as any).__test;
    const unit = t.ATK.find((a: any) => a.id === uid);
    const atkMul = 1 + 0.15 * fl;
    return Math.floor((unit.chargeDmg || 0) * atkMul);
  }, { uid: unitId, fl: forgeLevel });
}

/** Check if tower can target unit type */
export async function canTarget(page: Page, towerId: string, unitId: string): Promise<boolean> {
  return page.evaluate(({ tid, uid }) => {
    const t = (window as any).__test;
    const tower = t.TOWERS.find((a: any) => a.id === tid);
    const unit = t.ATK.find((a: any) => a.id === uid);
    if (tower.targets === 'none') return false;
    if (tower.targets === 'both') return true;
    if (tower.targets === 'ground' && unit.fly) return false;
    if (tower.targets === 'air' && !unit.fly) return false;
    return true;
  }, { tid: towerId, uid: unitId });
}

/** Get forge cost at given level */
export async function getForgeCost(page: Page, forgeId: string, level: number): Promise<number> {
  return page.evaluate(({ fid, lv }) => {
    const t = (window as any).__test;
    const forge = t.FRG.find((f: any) => f.id === fid);
    return Math.floor(forge.base * Math.pow(1.6, lv));
  }, { fid: forgeId, lv: level });
}

/** Get bounty for killing a unit */
export async function getBounty(page: Page, unitId: string): Promise<number> {
  return page.evaluate((uid) => {
    const t = (window as any).__test;
    const unit = t.ATK.find((a: any) => a.id === uid);
    return Math.floor(unit.cost * 0.2);
  }, unitId);
}

/** Get gold rate base */
export async function getGoldRateBase(page: Page): Promise<number> {
  return page.evaluate(() => (window as any).__test.GOLD_RATE_BASE);
}

/** Get apocalypse constants */
export async function getApocalypseData(page: Page): Promise<{ cost: number; penalty: number }> {
  return page.evaluate(() => {
    const t = (window as any).__test;
    return { cost: t.APOCALYPSE_COST, penalty: t.APOCALYPSE_INCOME_PENALTY };
  });
}

/** Get spell count */
export async function getSpellCount(page: Page): Promise<number> {
  return page.evaluate(() => (window as any).__test.SPELLS.length);
}

/** Get spell data by id */
export async function getSpellData(page: Page, spellId: string): Promise<{ id: string; cost: number; cd: number }> {
  return page.evaluate((sid) => {
    const t = (window as any).__test;
    const s = t.SPELLS.find((sp: any) => sp.id === sid);
    return { id: s.id, cost: s.cost, cd: s.cd };
  }, spellId);
}

/** Get tower count */
export async function getTowerCount(page: Page): Promise<number> {
  return page.evaluate(() => (window as any).__test.TOWERS.length);
}

/** Get tower income */
export async function getTowerIncome(page: Page, towerId: string): Promise<number> {
  return page.evaluate((tid) => {
    const t = (window as any).__test;
    const tw = t.TOWERS.find((a: any) => a.id === tid);
    return tw.income || 0;
  }, towerId);
}

/** Get tower cost */
export async function getTowerCost(page: Page, towerId: string): Promise<number> {
  return page.evaluate((tid) => {
    const t = (window as any).__test;
    const tw = t.TOWERS.find((a: any) => a.id === tid);
    return tw.cost;
  }, towerId);
}
