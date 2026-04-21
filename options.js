/* =====================================================
   PROTON THEME — options.js
   Color picker logic for the options page
   ===================================================== */

const DEFAULT = "#e53265";
let currentColor = DEFAULT;

const picker   = document.getElementById("color-picker");
const hexInput = document.getElementById("custom-hex");
const saveBtn  = document.getElementById("save-btn");
const status   = document.getElementById("status");

// Load saved color
browser.storage.sync.get({ accentColor: DEFAULT }).then(({ accentColor }) => {
    setColor(accentColor);
    highlightActivePreset(accentColor);
});

// Preset buttons
document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        setColor(btn.dataset.color);
        highlightActivePreset(btn.dataset.color);
    });
});

// Color picker → hex input sync
picker.addEventListener("input", () => {
    hexInput.value = picker.value;
    currentColor = picker.value;
    document.body.style.setProperty("--accent", currentColor);
    highlightActivePreset(currentColor);
});

// Hex input → picker sync
hexInput.addEventListener("input", () => {
    const val = hexInput.value;
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
        picker.value = val;
        currentColor = val;
        document.body.style.setProperty("--accent", currentColor);
        highlightActivePreset(currentColor);
    }
});

// Save
saveBtn.addEventListener("click", () => {
    browser.storage.sync.set({ accentColor: currentColor }).then(() => {
        status.textContent = "✅ Gespeichert! Thunderbird neu starten für volle Wirkung.";
        setTimeout(() => status.textContent = "", 3000);
    });
});

function setColor(hex) {
    currentColor = hex;
    picker.value = hex;
    hexInput.value = hex;
    document.body.style.setProperty("--accent", hex);
    saveBtn.style.background = hex;
}

function highlightActivePreset(hex) {
    document.querySelectorAll(".preset-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.color.toLowerCase() === hex.toLowerCase());
    });
}
