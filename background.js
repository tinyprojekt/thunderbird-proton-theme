/* =====================================================
   PROTON THEME — background.js
   Handles accent color storage and dynamic theme update
   ===================================================== */

const DEFAULT_ACCENT = "#e53265";

function hexToHue(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    if (max === min) return 0;
    const d = max - min;
    let h;
    switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
    }
    return Math.round(h * 60);
}

function colorToFilter(hex) {
    const hue = hexToHue(hex);
    const rotate = (hue - 30 + 360) % 360;
    return `sepia(1) saturate(22) hue-rotate(${rotate}deg) brightness(0.8) contrast(1.2)`;
}

async function injectCheckboxCSS(hex) {
    const filter = colorToFilter(hex);
    const css = `
        image.checkbox-check[checked],
        image.checkbox-check[checked="true"] {
            filter: ${filter} !important;
        }
        image.radio-check[selected="true"] {
            filter: ${filter} !important;
        }
        a { color: ${hex} !important; }
    `;
    const tabs = await browser.tabs.query({});
    for (const tab of tabs) {
        if (tab.url?.startsWith("about:preferences") ||
            tab.url?.startsWith("about:addons")) {
            browser.tabs.insertCSS(tab.id, { code: css }).catch(() => {});
        }
    }
}

function applyAccentColor(hex) {
    browser.theme.update({
        colors: {
            toolbar:                  "#16141c",
            toolbar_text:             "#ffffff",
            frame:                    "#16141c",
            frame_inactive:           "#16141c",
            tab_background_text:      "#979bb0",
            tab_selected:             "#34384e",
            tab_text:                 "#ffffff",
            tab_line:                 hex,
            toolbar_field:            "#1e2130",
            toolbar_field_text:       "#ffffff",
            toolbar_field_border:     "#34384e",
            toolbar_field_border_focus: hex,
            sidebar:                  "#16141c",
            sidebar_text:             "#ffffff",
            sidebar_border:           "#34384e",
            sidebar_highlight:        "#25283a",
            sidebar_highlight_text:   "#2fd6b5",
            popup:                    "#25283a",
            popup_text:               "#ffffff",
            popup_border:             "#34384e",
            popup_highlight:          "#2d3148",
            popup_highlight_text:     "#ffffff",
            icons:                    "#979bb0",
            icons_attention:          hex,
            ntp_background:           "#16141c",
            ntp_text:                 "#ffffff",
            button_background_active: hex
        }
    });
    injectCheckboxCSS(hex);
}

// Load on startup
browser.storage.sync.get({ accentColor: DEFAULT_ACCENT })
    .then(({ accentColor }) => applyAccentColor(accentColor));

// React to tab load (inject CSS into preferences/addons pages)
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        if (tab.url?.startsWith("about:preferences") ||
            tab.url?.startsWith("about:addons")) {
            browser.storage.sync.get({ accentColor: DEFAULT_ACCENT })
                .then(({ accentColor }) => injectCheckboxCSS(accentColor));
        }
    }
});

// React to color changes from options page
browser.storage.onChanged.addListener((changes) => {
    if (changes.accentColor) {
        applyAccentColor(changes.accentColor.newValue);
    }
});
