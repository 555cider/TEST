export class ThemeToggler {
    constructor($target) {
        this.$theme = document.createElement("div");
        this.$theme.className = "theme-toggle";

        this.themeChk = document.createElement("input");
        this.themeChk.type = "checkbox";
        this.themeChk.id = "theme";

        this.themeLbl = document.createElement("label");
        this.themeLbl.innerHTML = "다크 모드";
        this.themeLbl.setAttribute("for", this.themeChk.id);

        this.$theme.appendChild(this.themeChk);
        this.$theme.appendChild(this.themeLbl);
        $target.prepend(this.$theme);

        const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
        this.themeChk.checked = prefersColorScheme.matches;
        this.themeChk.addEventListener("click", () => {
            if (prefersColorScheme.matches) {
                document.body.classList.toggle("light-theme");
            } else {
                document.body.classList.toggle("dark-theme");
            }
        });
    }
}