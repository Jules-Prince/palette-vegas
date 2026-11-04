const breads = [
  { name: 'Pain blanc', icon: '🍞', aura: 3 },
  { name: 'Pain aux graines', icon: '🌾', aura: 5 },
];

const salads = [
  { name: 'Avec salade', icon: '🥬', aura: 5 },
  { name: 'Sans salade', icon: '🚫', aura: 1 },
];

const ingredients = [
  { name: 'Carottes râpées', icon: '🥕', category: 'legume', aura: 2 },
  { name: 'Tomates cerises', icon: '🍅', category: 'legume', aura: 5 },
  { name: 'Poulet citron', icon: '🍋', category: 'viande', aura: 5 },
  { name: 'Poulet nature', icon: '🍗', category: 'viande', aura: 4 },
  { name: 'Poulet curry', icon: '🍛', category: 'viande', aura: 3 },
  { name: 'Poulet tenders', icon: '🍗', category: 'viande', aura: 4 },
  { name: 'Poulet tenders 4 épices', icon: '🌶️', category: 'viande', aura: 2 },
  { name: 'Olives noires', icon: '🫒', category: 'legume', aura: 2 },
  { name: 'Olives vertes', icon: '🫒', category: 'legume', aura: 1 },
  { name: 'Flageolets', icon: '🫘', category: 'legume', aura: 1 },
  { name: 'Avocat', icon: '🥑', category: 'legume', aura: 5 },
  { name: 'Betteraves', icon: '🟣', category: 'legume', aura: 1 },
  { name: 'Maïs', icon: '🌽', category: 'legume', aura: 2 },
  { name: 'Mozzarella', icon: '🧀', category: 'fromage', aura: 4 },
  { name: 'Parmesan', icon: '🧀', category: 'fromage', aura: 5 },
  { name: 'Fromage de brebis', icon: '🐑', category: 'fromage', aura: 3 },
  { name: 'Emmental', icon: '🧀', category: 'fromage', aura: 3 },
  { name: 'Œuf', icon: '🥚', category: 'oeuf', aura: 4 },
  { name: 'Poivrons', icon: '🫑', category: 'legume', aura: 3 },
  { name: 'Lardons', icon: '🥓', category: 'viande', aura: 4 },
  { name: 'Speck', icon: '🥓', category: 'viande', aura: 4 },
  { name: 'Jambon cru', icon: '🍖', category: 'viande', aura: 3 },
  { name: 'Thon', icon: '🐟', category: 'poisson', aura: 2 },
  { name: 'Courgettes', icon: '🥒', category: 'legume', aura: 2 },
  { name: 'Patates douces', icon: '🍠', category: 'legume', aura: 3 },
  { name: 'Carottes cuites', icon: '🥕', category: 'legume', aura: 2 },
  { name: 'Roquefort', icon: '🧀', category: 'fromage', aura: 2},
  { name: 'Pois chiches', icon: '🫘', category: 'legume', aura: 1 },
  { name: 'Haricots', icon: '🫘', category: 'legume', aura: 1 },
  { name: 'Champignons', icon: '🍄', category: 'legume', aura: 2 },
  { name: 'Tomates séchées', icon: '🍅', category: 'legume', aura: 3 },
  { name: 'Concombres', icon: '🥒', category: 'legume', aura: 2 },
  { name: 'Oignon rouge', icon: '🧅', category: 'legume', aura: 1 },
];

const sauces = [
  { name: 'Classique', icon: '🥣', aura: 3 },
  { name: 'Citronnée', icon: '🍋', aura: 2 },
  { name: 'Pesto', icon: '🌿', aura: 5 },
  { name: 'César', icon: '🥣', aura: 4 },
  { name: 'Mayo', icon: '🥚', aura: 5 },
  { name: 'Miel citron', icon: '🍯', aura: 5 },
  { name: 'Spicy mango', icon: '🥭', aura: 4 },
  { name: 'Moutarde à l’orange', icon: '🍊', aura: 1 },
  { name: 'Indienne', icon: '🍛', aura: 2 },
  { name: 'Asiatique', icon: '🥢', aura: 2 },
  { name: 'Framboise', icon: '🔴', aura: 1 },
  { name: 'Noix', icon: '🌰', aura: 3 },
  { name: 'Andalouse', icon: '🌶️', aura: 4 },
];

const bannedFoods = new Set();
const auraTiers = [
  { minimum: 90, key: 'legendary', label: 'Aura légendaire', confetti: 240, duration: '4.2s' },
  { minimum: 75, key: 'great', label: 'Grosse aura', confetti: 144, duration: '3.5s' },
  { minimum: 50, key: 'good', label: 'Belle aura', confetti: 48, duration: '2.8s' },
  { minimum: 25, key: 'low', label: 'Aura timide', confetti: 12, duration: '2.4s' },
  { minimum: 0, key: 'flop', label: 'Aura en PLS', confetti: 0, duration: '2s' },
];
const button = document.querySelector('#spin-button');
const buttonLabel = document.querySelector('#button-label');
const machine = document.querySelector('.machine');
const machineStatus = document.querySelector('#machine-status');
const allReelGroups = [...document.querySelectorAll('.reel-group')];
const safeMode = document.querySelector('#safe-mode');
const gourmandMode = document.querySelector('#gourmand-mode');
const initialReels = new Map([...document.querySelectorAll('.reel-strip')].map(strip => [strip.id, strip.firstElementChild.cloneNode(true)]));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const settingsDialog = document.querySelector('#settings-dialog');
const menuButton = document.querySelector('#menu-button');
const motionButton = document.querySelector('#motion-button');
const motionStatus = document.querySelector('#motion-status');

function getIngredientSlots(safe, gourmand, exclusions = bannedFoods) {
  const available = ingredients.filter(item => !exclusions.has(item.name));
  const slots = safe
    ? [
      { categories: ['legume'], label: 'Légume' },
      { categories: ['viande', 'oeuf'], label: 'Viande / œuf' },
      { categories: ['fromage'], label: 'Fromage' },
    ].map(slot => ({ ...slot, options: available.filter(item => slot.categories.includes(item.category)) }))
    : Array.from({ length: 3 }, (_, index) => ({ label: `Ingrédient ${index + 1}`, options: available }));
  if (gourmand) slots.push({ label: 'Bonus gourmand', options: available });
  return slots;
}

function calculateAura(bread, salad, fillings, sauce) {
  const foods = [bread, salad, ...fillings, sauce];
  const average = foods.reduce((sum, food) => sum + food.aura, 0) / foods.length;
  const meatCount = fillings.filter(food => food.category === 'viande').length;
  const hasVegetable = fillings.some(food => food.category === 'legume');
  const hasCheese = fillings.some(food => food.category === 'fromage');
  const balanced = hasVegetable && meatCount > 0 && hasCheese;
  const bonus = balanced ? 40 : 0;
  const multiplier = meatCount === 0 ? 0.25 : 1 - 0.15 * (meatCount - 1);
  // Qualité : 60 points maximum. Trio : +40. Sans viande : −75 %.
  // Chaque viande au-delà de la première enlève 15 % du score de base.
  const score = Math.max(0, Math.min(100, Math.round((12 * average + bonus) * multiplier)));
  const label = getAuraTier(score).label;
  const reason = meatCount === 0
    ? 'Sans viande : −75 %'
    : meatCount > 1
      ? `${meatCount} viandes : −${Math.round((1 - multiplier) * 100)} %`
      : balanced ? 'Légume + viande + fromage : +40' : 'Trio incomplet : bonus manquant';
  return { score, label, reason, average, bonus, multiplier, meatCount };
}

function getAuraTier(score) {
  return auraTiers.find(tier => score >= tier.minimum);
}

function generateSandwich(safe, gourmand, exclusions = bannedFoods, random = Math.random) {
  const slots = getIngredientSlots(safe, gourmand, exclusions);
  const availableSauces = sauces.filter(item => !exclusions.has(item.name));
  const assemble = (bread, salad, fillings, sauce) => ({ bread, salad, fillings, sauce, aura: calculateAura(bread, salad, fillings, sauce) });
  for (let attempt = 0; attempt < (safe ? 128 : 1); attempt++) {
    const candidate = assemble(pick(breads, random), pick(salads, random), slots.map(slot => pick(slot.options, random)), pick(availableSauces, random));
    if (!safe || candidate.aura.score >= 75) return candidate;
  }
  // Solution déterministe si les tirages aléatoires ont tous échoué : pas de note artificiellement gonflée.
  const best = options => options.reduce((current, item) => !current || item.aura > current.aura ? item : current, null);
  const fillings = slots.map((slot, index) => best(slot.options.filter(item => index === 1 ? item.category === 'viande' : index === 3 ? item.category !== 'viande' : true)));
  if (fillings.some(item => !item)) throw new Error('Aucun sandwich Safe à 75/100 possible avec ces choix.');
  const fallback = assemble(best(breads), best(salads), fillings, best(availableSauces));
  if (fallback.aura.score < 75) throw new Error('Aucun sandwich Safe à 75/100 possible avec ces notes.');
  return fallback;
}

function clearEndAnimation() {
  document.body.classList.remove('has-result', 'is-jackpot');
  delete document.body.dataset.auraTier;
}

function playEndAnimation(aura) {
  const tier = getAuraTier(aura.score);
  document.body.dataset.auraTier = tier.key;
  document.body.style.setProperty('--confetti-duration', tier.duration);
  document.querySelectorAll('.confetti-piece').forEach((piece, index) => { piece.hidden = index >= tier.confetti; });
  document.body.classList.add('has-result');
  document.body.classList.toggle('is-jackpot', aura.score >= 75);
}

function showAura(aura, recipeDescription) {
  const summary = document.createElement('span');
  summary.className = 'aura-result';
  const score = document.createElement('strong');
  score.className = 'aura-score';
  score.textContent = `${aura.score}/100`;
  const copy = document.createElement('span');
  copy.className = 'aura-copy';
  const label = document.createElement('span');
  label.className = 'aura-label';
  label.textContent = `${aura.label} · ${aura.reason}`;
  const track = document.createElement('span');
  track.className = 'aura-track';
  track.setAttribute('aria-hidden', 'true');
  const fill = document.createElement('span');
  fill.className = 'aura-fill';
  fill.style.width = `${aura.score}%`;
  track.append(fill);
  copy.append(label, track);
  summary.append(score, copy);
  const recipe = document.createElement('span');
  recipe.className = 'sr-only';
  recipe.textContent = ` Aura du sandwich : ${aura.score} sur 100. ${recipeDescription}`;
  machineStatus.replaceChildren(summary, recipe);
  machineStatus.title = `(12 × moyenne ${aura.average.toFixed(2)}/5 + ${aura.bonus} de bonus) × ${aura.multiplier.toFixed(2)} = ${aura.score}/100. L’œuf et le thon ne comptent pas comme viande.`;
}

function updateModes() {
  if (button.disabled) return;
  machineStatus.removeAttribute('title');
  const slots = getIngredientSlots(safeMode.checked, gourmandMode.checked);
  document.querySelector('#extra-ingredient-group').hidden = !gourmandMode.checked;
  document.body.classList.toggle('has-gourmand', gourmandMode.checked);
  clearEndAnimation();
  machine.style.setProperty('--reel-count', slots.length + 3);
  allReelGroups.forEach(group => group.classList.remove('is-active', 'is-locked', 'is-pending'));
  initialReels.forEach((initial, id) => document.getElementById(id).replaceChildren(initial.cloneNode(true)));
  for (let index = 0; index < 4; index++) {
    allReelGroups[index + 2].querySelector('.reel-label').textContent = slots[index]?.label.toLocaleUpperCase('fr') ?? 'INGRÉDIENT 04';
  }
  machineStatus.textContent = `${slots.length + 3} étapes${safeMode.checked ? ' · Aura ≥ 75 garantie' : '. À toi le jackpot !'}${bannedFoods.size ? ` · ${bannedFoods.size} exclu${bannedFoods.size > 1 ? 's' : ''}` : ''}`;
  buttonLabel.textContent = 'Lancer la roulette';
  layoutLights();
}

// Les ampoules suivent le cadre arrondi avec deux têtes opposées à un demi-tour.
function layoutLights() {
  const path = document.querySelector('#marquee-path');
  path.setAttribute('width', Math.max(1, machine.clientWidth - 20));
  path.setAttribute('height', Math.max(1, machine.clientHeight - 20));
  const length = path.getTotalLength();
  const count = Math.max(24, Math.round(length / 40) * 2);
  const bulbs = Array.from({ length: count }, (_, index) => {
    const point = path.getPointAtLength(index / count * length);
    const bulb = document.createElement('span');
    bulb.className = 'bulb';
    bulb.style.left = `${point.x}px`;
    bulb.style.top = `${point.y}px`;
    bulb.style.setProperty('--phase', index / count - 1);
    return bulb;
  });
  document.querySelector('#marquee-lights').replaceChildren(...bulbs);
}

layoutLights();
if (typeof ResizeObserver !== 'undefined') {
  new ResizeObserver(layoutLights).observe(machine);
} else {
  window.addEventListener('resize', layoutLights);
}

document.querySelector('#confetti').replaceChildren(...Array.from({ length: 240 }, (_, index) => {
  const piece = document.createElement('span');
  piece.className = 'confetti-piece';
  piece.style.setProperty('--x', `${(index * 37) % 100}%`);
  piece.style.setProperty('--delay', `${(index % 16) * 0.08}s`);
  piece.style.setProperty('--color', ['#ffd47a', '#ff4db8', '#77ffd4', '#fff4e4'][index % 4]);
  piece.style.setProperty('--size', `${5 + index % 5}px`);
  piece.style.setProperty('--radius', index % 3 === 0 ? '50%' : '1px');
  piece.style.setProperty('--drift', `${(index * 53) % 280 - 140}px`);
  piece.style.setProperty('--rotation', `${420 + (index * 71) % 900}deg`);
  return piece;
}));

function pause(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function pick(items, random = Math.random) {
  return items[Math.floor(random() * items.length)];
}

function createReelItem(item) {
  const element = document.createElement('div');
  element.className = 'reel-item';
  const icon = document.createElement('span');
  icon.className = 'reel-icon';
  icon.textContent = item.icon;
  const name = document.createElement('span');
  name.className = 'reel-name';
  name.textContent = item.name;
  element.append(icon, name);
  if (item.aura !== undefined) {
    const rating = document.createElement('span');
    rating.className = 'reel-aura';
    rating.textContent = `${item.aura}/5`;
    rating.title = `Aura de ${item.name} : ${item.aura}/5`;
    icon.append(rating);
  }
  return element;
}

async function spinReel(id, options, selected) {
  const strip = document.getElementById(id);
  if (reducedMotion.matches || typeof strip.animate !== 'function') {
    strip.replaceChildren(createReelItem(selected));
    return;
  }

  const current = strip.firstElementChild.cloneNode(true);
  const decoys = Array.from({ length: 15 }, () => createReelItem(pick(options)));
  strip.replaceChildren(current, ...decoys, createReelItem(selected));
  const distance = (strip.children.length - 1) * strip.parentElement.clientHeight;
  const animation = strip.animate(
    [{ transform: 'translateY(0)' }, { transform: `translateY(-${distance}px)` }],
    { duration: 1100, easing: 'cubic-bezier(0.12, 0.68, 0.18, 1)', fill: 'forwards' },
  );
  try {
    await animation.finished;
  } finally {
    strip.replaceChildren(createReelItem(selected));
    animation.cancel();
  }
}

async function startSpin() {
  if (button.disabled || settingsDialog.open || document.hidden) return;
  machineStatus.removeAttribute('title');
  button.disabled = true;
  safeMode.disabled = true;
  gourmandMode.disabled = true;
  menuButton.disabled = true;
  clearEndAnimation();
  document.body.classList.add('is-spinning');
  const reelGroups = allReelGroups.filter(group => !group.hidden);
  reelGroups.forEach(group => {
    group.classList.remove('is-active', 'is-locked');
    group.classList.add('is-pending');
  });

  try {
    const { bread, salad, fillings, sauce, aura } = generateSandwich(safeMode.checked, gourmandMode.checked);
    const slots = getIngredientSlots(safeMode.checked, gourmandMode.checked);
    const stages = [
      { id: 'bread-reel', options: breads, selected: bread, label: 'Le pain' },
      { id: 'salad-reel', options: salads, selected: salad, label: 'La salade' },
      ...fillings.map((selected, index) => ({ id: `ingredient-${index + 1}-reel`, options: slots[index].options, selected, label: slots[index].label })),
      { id: 'sauce-reel', options: sauces.filter(item => !bannedFoods.has(item.name)), selected: sauce, label: 'La sauce' },
    ];

    for (const [index, stage] of stages.entries()) {
      const group = reelGroups[index];
      group.classList.remove('is-pending');
      group.classList.add('is-active');
      machineStatus.textContent = `Étape ${index + 1} / ${stages.length} · ${stage.label}`;
      buttonLabel.textContent = `${stage.label}…`;
      await spinReel(stage.id, stage.options, stage.selected);
      group.classList.remove('is-active');
      group.classList.add('is-locked');
      machineStatus.textContent = `${stage.label} : ${stage.selected.name} ✓`;
      if (index < stages.length - 1) await pause(reducedMotion.matches ? 180 : 250);
    }

    showAura(aura, `${bread.name}, ${salad.name.toLocaleLowerCase('fr')}, ${fillings.map(item => item.name.toLocaleLowerCase('fr')).join(', ')}, sauce ${sauce.name.toLocaleLowerCase('fr')}.`);
    playEndAnimation(aura);
  } catch (error) {
    machineStatus.textContent = error.message.startsWith('Aucun sandwich Safe') ? error.message : 'Tirage interrompu. Retente ta chance !';
    console.error(error);
  } finally {
    button.disabled = false;
    safeMode.disabled = false;
    gourmandMode.disabled = false;
    menuButton.disabled = false;
    document.body.classList.remove('is-spinning');
    buttonLabel.textContent = 'Relancer la roulette';
    reelGroups.forEach(group => group.classList.remove('is-active', 'is-pending'));
    resetShake();
  }
}

button.addEventListener('click', startSpin);
document.addEventListener('keydown', event => {
  if (event.code !== 'Space' || event.repeat || event.altKey || event.ctrlKey || event.metaKey || settingsDialog.open) return;
  if (event.target?.closest?.('input, select, textarea, [contenteditable], button:not(#spin-button)')) return;
  event.preventDefault();
  startSpin();
});

const exclusionButtons = new Map();
const banCategories = [
  { label: 'Légumes', foods: ingredients.filter(item => item.category === 'legume') },
  { label: 'Viande / œuf / poisson', foods: ingredients.filter(item => ['viande', 'oeuf', 'poisson'].includes(item.category)) },
  { label: 'Fromages', foods: ingredients.filter(item => item.category === 'fromage') },
  { label: 'Sauces', foods: sauces },
];

document.querySelector('#ban-columns').replaceChildren(...banCategories.map(category => {
  const column = document.createElement('section');
  column.className = 'ban-column';
  const heading = document.createElement('h3');
  heading.textContent = category.label;
  const list = document.createElement('ul');
  list.className = 'ban-list';
  category.foods.toSorted((a, b) => a.name.localeCompare(b.name, 'fr')).forEach(food => {
    const row = document.createElement('li');
    const choice = document.createElement('button');
    choice.type = 'button';
    choice.className = 'ban-choice';
    choice.textContent = food.name;
    choice.title = food.name;
    choice.setAttribute('aria-label', `Bannir ${food.name}`);
    choice.setAttribute('aria-pressed', 'false');
    choice.addEventListener('click', () => {
      if (bannedFoods.has(food.name)) bannedFoods.delete(food.name);
      else if (bannedFoods.size < 2) bannedFoods.add(food.name);
      refreshExclusions();
      updateModes();
    });
    exclusionButtons.set(food.name, choice);
    row.append(choice);
    list.append(row);
  });
  column.append(heading, list);
  return column;
}));

function refreshExclusions() {
  exclusionButtons.forEach((choice, name) => {
    const selected = bannedFoods.has(name);
    choice.setAttribute('aria-pressed', String(selected));
    choice.disabled = !selected && bannedFoods.size === 2;
  });
  document.querySelector('#exclusion-count').textContent = `${bannedFoods.size} / 2 exclus`;
  const badge = document.querySelector('#ban-count');
  badge.textContent = bannedFoods.size;
  badge.hidden = bannedFoods.size === 0;
  document.querySelector('#reset-bans').disabled = bannedFoods.size === 0;
}

menuButton.addEventListener('click', () => {
  if (button.disabled) return;
  refreshExclusions();
  settingsDialog.showModal();
  resetShake();
});
document.querySelector('#close-menu').addEventListener('click', () => settingsDialog.close());
settingsDialog.addEventListener('close', resetShake);
settingsDialog.addEventListener('click', event => {
  if (event.target !== settingsDialog) return;
  const bounds = settingsDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) settingsDialog.close();
});
document.querySelector('#reset-bans').addEventListener('click', () => {
  bannedFoods.clear();
  refreshExclusions();
  updateModes();
});

let motionEnabled = false;
let previousAcceleration = null;
let lastMotionSample = 0;
let shakeHits = [];
let shakeCooldownUntil = 0;

function resetShake() {
  previousAcceleration = null;
  shakeHits = [];
  lastMotionSample = 0;
  shakeCooldownUntil = Date.now() + 1500;
}

function handleMotion(event) {
  if (!motionEnabled || button.disabled || settingsDialog.open || document.hidden) {
    previousAcceleration = null;
    shakeHits = [];
    return;
  }
  const now = Date.now();
  if (now < shakeCooldownUntil || now - lastMotionSample < 70) return;
  const vectors = [event.acceleration, event.accelerationIncludingGravity];
  const acceleration = vectors.find(vector => vector && [vector.x, vector.y, vector.z].every(Number.isFinite));
  if (!acceleration) return;
  const current = { x: acceleration.x, y: acceleration.y, z: acceleration.z };
  if (previousAcceleration) {
    const delta = Math.hypot(current.x - previousAcceleration.x, current.y - previousAcceleration.y, current.z - previousAcceleration.z);
    shakeHits = shakeHits.filter(time => now - time < 700);
    if (delta > 16) shakeHits.push(now);
  }
  previousAcceleration = current;
  lastMotionSample = now;
  if (shakeHits.length >= 3) {
    resetShake();
    startSpin();
  }
}

function enableMotion() {
  if (!motionEnabled) window.addEventListener('devicemotion', handleMotion, { passive: true });
  motionEnabled = true;
  resetShake();
  motionButton.textContent = 'Désactiver « secouer »';
  motionStatus.textContent = 'Secouer activé · Espace permet aussi de lancer.';
}

motionButton.addEventListener('click', async () => {
  if (motionEnabled) {
    window.removeEventListener('devicemotion', handleMotion);
    motionEnabled = false;
    resetShake();
    motionButton.textContent = 'Activer « secouer »';
    motionStatus.textContent = 'Secouer désactivé · Utilise le bouton ou Espace.';
    return;
  }
  try {
    if (typeof window.DeviceMotionEvent.requestPermission === 'function') {
      const permission = await window.DeviceMotionEvent.requestPermission();
      if (permission !== 'granted') {
        motionStatus.textContent = 'Accès aux capteurs refusé. Le bouton et Espace restent disponibles.';
        return;
      }
    }
    enableMotion();
  } catch {
    motionStatus.textContent = 'Impossible d’activer les capteurs. Utilise le bouton ou Espace.';
  }
});
if (!window.isSecureContext) {
  motionButton.disabled = true;
  motionStatus.textContent = 'Secouer nécessite HTTPS · Le bouton et Espace fonctionnent.';
} else if (typeof window.DeviceMotionEvent === 'undefined') {
  motionButton.disabled = true;
  motionStatus.textContent = 'Capteurs indisponibles · Utilise le bouton ou Espace.';
} else if (typeof window.DeviceMotionEvent.requestPermission !== 'function') {
  enableMotion();
}
document.addEventListener('visibilitychange', resetShake);
window.addEventListener('orientationchange', resetShake);
refreshExclusions();

safeMode.addEventListener('change', updateModes);
gourmandMode.addEventListener('change', updateModes);
updateModes();
