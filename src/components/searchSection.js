export default class SearchSection {
    constructor({ $target, onSearch, onRandom }) {
        this.onSearch = onSearch;
        this.onRandom = onRandom;
        this.recentsArr = [];

        const $search = document.createElement("section");
        $search.className = "search-section";

        const searchInp = document.createElement("input");
        searchInp.placeholder = "고양이를 검색해보세요.|";
        searchInp.className = "search-inp";
        searchInp.autofocus = true;
        searchInp.addEventListener("click", () => {
            searchInp.value = '';
        });
        searchInp.addEventListener("keypress", e => {
            if (e.code === "Enter") {
                this.recentsArr.unshift(e.target.value);
                if (this.recentsArr.length > 5) {
                    this.recentsArr.pop();
                }
                this.onSearch(e.target.value);
                this.render();
            }
        });

        const randomBtn = document.createElement("button");
        randomBtn.className = "random-btn";
        randomBtn.innerText = "🐱";
        randomBtn.addEventListener("click", this.onRandom);

        this.recents = document.createElement("div");

        $search.appendChild(searchInp);
        $search.appendChild(randomBtn);
        $search.appendChild(this.recents);
        $target.appendChild($search);
    }

    render() {
        this.recents.innerHTML = this.recentsArr.map(item => {
            return `<span class="recents">${item}</span>`;
        }).join('');
        this.recents.querySelectorAll(".recents").forEach((item, index) => {
            item.addEventListener("click", () => this.onSearch(this.recentsArr[index]));
        });
    }
}
