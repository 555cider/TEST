export default class ThemeToggle {
    constructor({ $target }) {
        this.$theme = document.createElement("div");
        this.$theme.className = "theme-toggle";

        const themeChk = document.createElement("input");
        themeChk.type = "checkbox";
        themeChk.id = "theme";

        const themeLbl = document.createElement("Label");
        themeLbl.setAttribute("for", themeChk.id);
        themeLbl.innerHTML = "다크 모드";

        this.$theme.appendChild(themeChk);
        this.$theme.appendChild(themeLbl);
        $target.prepend(this.$theme);

        const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
        themeChk.checked = prefersColorScheme.matches;
        themeChk.addEventListener("click", () => {
            if (prefersColorScheme.matches) {
                document.body.classList.toggle("light-theme");
            } else {
                document.body.classList.toggle("dark-theme");
            }
        });
    }
}