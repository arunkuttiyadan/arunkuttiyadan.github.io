import test from 'node:test';
import assert from 'node:assert/strict';
import { bowAmount, projectRow } from '../app/character-motion.ts';

test('greeting returns to standing and does not repeat', () => {
  assert.equal(bowAmount(0), 0);
  assert.equal(bowAmount(2.8), 1);
  assert.equal(bowAmount(7), 0);
  assert.equal(bowAmount(60), 0);
});

test('feet stay fixed and the portrait never folds over itself', () => {
  for (let t = 0; t < 15; t += .07) {
    for (const y of [.6, .8, .98, 1]) {
      const p = projectRow(y, t);
      assert.equal(p.y, y);
      assert.ok(p.x === 0);
      assert.equal(p.width, 1);
    }
    let previous = -1;
    for (let row = 0; row <= 320; row++) {
      const p = projectRow(row / 320, t);
      assert.ok(p.y > previous, `fold at time ${t}, row ${row}`);
      assert.ok(Number.isFinite(p.x) && p.width > 0);
      previous = p.y;
    }
  }
});

test('adjacent animation frames stay continuous', () => {
  for (let t = 0; t < 8; t += 1 / 60) {
    for (const y of [0, .15, .3, .45, .6, .98]) {
      const a = projectRow(y, t), b = projectRow(y, t + 1 / 60);
      assert.ok(Math.abs(a.y - b.y) < .005);
      assert.ok(Math.abs(a.x - b.x) < .005);
    }
  }
});
