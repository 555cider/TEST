export class SearchSection {
    constructor({ $target, onSearch, onRandom }) {
        this.onSearch = onSearch;
        this.onRandom = onRandom;
        this.recentsArr = [];

        this.$search = document.createElement("section");
        this.$search.className = "search-section";

        this.searchInp = document.createElement("input");
        this.searchInp.placeholder = "고양이를 검색해보세요.|";
        this.searchInp.className = "search-inp";
        this.searchInp.autofocus = true;
        this.searchInp.addEventListener("click", () => {
            this.searchInp.value = '';
        });
        this.searchInp.addEventListener("keypress", e => {
            if (e.code === "Enter") {
                this.recentsArr.unshift(e.target.value);
                if (this.recentsArr.length > 5) {
                    this.recentsArr.pop();
                }
                this.onSearch(e.target.value);
                this.render();
            }
        });

        this.randomBtn = document.createElement("button");
        this.randomBtn.className = "random-btn";
        this.randomBtn.innerText = "🐱";
        this.randomBtn.addEventListener("click", this.onRandom);

        this.recents = document.createElement("div");
        this.recents.className = "recents";

        this.$search.appendChild(this.searchInp);
        this.$search.appendChild(this.randomBtn);
        this.$search.appendChild(this.recents);
        $target.appendChild(this.$search);
    }

    render() {
        this.recents.innerHTML = this.recentsArr.map(e => `<span class="recent">${e}</span>`).join('');
        this.recents.querySelectorAll(".recent").forEach((e, index) => {
            e.addEventListener("click", () => this.onSearch(this.recentsArr[index]));
        });
    }
}
