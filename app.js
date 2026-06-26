// ─── State ───────────────────────────────────────────
const STATE_KEY = 'trade_checklist_state';

const moduleCounts = {
  0: 9,  // M1: Supply & Demand
  1: 8,  // M2: Asia Range & London Sweep
  2: 7,  // M3A: DR Break & Retest
  3: 9,  // M3B: DR Rejection
};

let currentModule = 0;
let state = loadState();

// ─── Init ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyState();
  updateProgress();
});

// ─── Tab Switching ────────────────────────────────────
function switchModule(idx) {
  currentModule = idx;

  document.querySelectorAll('.tab').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });

  document.querySelectorAll('.panel').forEach((p, i) => {
    p.classList.toggle('active', i === idx);
  });

  updateProgress();
  hideBanner();
}

// ─── Check Toggle ─────────────────────────────────────
function toggleCheck(box) {
  const item = box.closest('.check-item');
  const id   = item.dataset.id;

  const checked = !item.classList.contains('checked');
  item.classList.toggle('checked', checked);

  if (checked) {
    state[id] = true;
  } else {
    delete state[id];
  }

  saveState();
  updateProgress();
}

// ─── Progress ─────────────────────────────────────────
function updateProgress() {
  const panel    = document.getElementById(`panel-${currentModule}`);
  const items    = panel.querySelectorAll('.check-item');
  const total    = items.length;
  const done     = panel.querySelectorAll('.check-item.checked').length;
  const pct      = total > 0 ? Math.round((done / total) * 100) : 0;

  document.getElementById('progress-label').textContent =
    `${done} of ${total} checks complete`;
  document.getElementById('progress-pct').textContent = `${pct}%`;
  document.getElementById('progress-fill').style.width = `${pct}%`;

  if (done === total && total > 0) {
    showBanner();
  } else {
    hideBanner();
  }
}

// ─── Banner ───────────────────────────────────────────
function showBanner() {
  document.getElementById('trade-ready').classList.add('visible');
}

function hideBanner() {
  document.getElementById('trade-ready').classList.remove('visible');
}

// ─── Reset ────────────────────────────────────────────
function resetAll() {
  if (!confirm('Reset all checks for all modules?')) return;

  state = {};
  saveState();

  document.querySelectorAll('.check-item').forEach(item => {
    item.classList.remove('checked');
  });

  updateProgress();
  hideBanner();
}

// ─── Export / Print ───────────────────────────────────
function printChecklist() {
  window.print();
}

// ─── Persistence ─────────────────────────────────────
function saveState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch (e) {
    // localStorage unavailable — state lives in memory only
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function applyState() {
  document.querySelectorAll('.check-item').forEach(item => {
    if (state[item.dataset.id]) {
      item.classList.add('checked');
    }
  });
}
