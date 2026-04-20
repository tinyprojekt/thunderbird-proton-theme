# Thunderbird Proton Theme (WIP)

A modern community project to bring the flat, clean aesthetic of **Proton Mail** to **Mozilla Thunderbird (Version 128+ "Nebula")**.

> [!IMPORTANT]
> **Status: Alpha / Work-in-Progress** > This theme is in early development. It currently focuses on the main Mail interface, Tab-bar, and Sidebar. Other areas like Calendar or Settings are planned. Contributions are very welcome!

## 📸 Preview
<img width="1512" height="953" alt="demo thunderbird proton theme screenshot" src="https://github.com/user-attachments/assets/7465e9a7-3944-41a0-b5b3-d3c412471ba7" />


## ✨ Features
- **Proton Color Palette:** Uses the authentic Proton dark grays and accent colors.
- **Modern Tab-Bar:** Completely square, flat tabs without default gradients, shadows, or blue lines.
- **Improved Sidebar:** Rounded folder indicators ("Island-Look") without distracting system focus-frames or outlines.
- **Custom Badges:** Unread message counts styled in the original Proton Purple (`#8838ff`).
- **Clean UI:** Minimized borders and dividers for a streamlined experience.
- **Architecture Support:** Verified on **aarch64 (ARM)** and standard x86 systems.

## 🛠 Installation

### 1. Enable Stylesheets in Thunderbird
To allow custom CSS, you need to toggle a setting:
1. Open Thunderbird.
2. Go to **Settings** > **General**.
3. Scroll to the bottom and click on **Config Editor...**.
4. Search for `toolkit.legacyUserProfileCustomizations.stylesheets`.
5. Double-click to set it to **true**.

### 2. Add userChrome.css
1. Locate your Thunderbird profile folder:
   - **Windows:** Press `Win + R`, type `%APPDATA%\Thunderbird\Profiles\`
   - **macOS:** `~/Library/Thunderbird/Profiles/`
2. Open your active profile folder (usually `[random-string].default-release`).
3. Create a folder named `chrome` (all lowercase) if it doesn't exist.
4. Copy the `userChrome.css` from this repository into that `chrome` folder.
5. Restart Thunderbird.

## 🎨 Colors
| Element | Hex Code |
| :--- | :--- |
| Background (Dark) | `#16141c` |
| Active Elements | `#34384e` |
| Unread Badge | `#8838ff` |
| Proton Pink | `#e53265` |
| Proton Green | `#2fd6b5` |

## 🤝 Contributing
Since this is a Work-in-Progress, I appreciate any help!
- Found a bug? Open an **Issue**.
- Want to style a new element (e.g., the Calendar)? Submit a **Pull Request**.

## ⚖️ Disclaimer
This is an **unofficial community project**. It is not affiliated with, or endorsed by, Proton AG. All trademarks, logos, and design rights of Proton Mail are the property of Proton AG. This theme is for UI customization purposes only.

## 📜 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
