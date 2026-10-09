const smooth = (value: number) => {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
};

// One continuous greeting, with time measured only while motion is active.
export function bowAmount(seconds: number) {
  return smooth((seconds - 1.2) / 1.3) * (1 - smooth((seconds - 4.5) / 1.6));
}

// Skin the portrait along its spine. Everything below the hips stays grounded.
export function projectRow(y: number, seconds: number) {
  const bow = bowAmount(seconds);
  const hip = .60;
  const neck = .27;
  const angle = bow * .65;
  const aboveHip = Math.max(0, hip - y);
  const torsoDistance = Math.min(aboveHip, hip - neck);
  const headDistance = Math.max(0, neck - y);
  const chest = Math.exp(-Math.pow((y - .39) / .16, 2)) * smooth((hip - y) / .1);
  const breathe = Math.sin(seconds * Math.PI / 2.4) * .002;
  const influence = smooth(aboveHip / hip);
  return {
    // The head translates as a rigid unit; only the torso foreshortens.
    y: y + torsoDistance * (1 - Math.cos(angle)) + headDistance * bow * .025 - chest * breathe,
    x: -torsoDistance * Math.sin(angle) * .34 + influence * Math.sin(seconds * .65) * .003,
    width: 1 + chest * breathe * 2,
  };
}
