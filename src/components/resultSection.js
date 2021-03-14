export default class ResultSection {
    constructor({ $target, data, onClick }) {
        this.data = data;
        this.onClick = onClick;

        this.$result = document.createElement("section");
        this.$result.className = "result-section";
        $target.appendChild(this.$result);

        this.render();
    }

    setState(data) {
        this.data = data;
        this.render();
    }

    render() {
        if (this.data.length > 0) {
            this.$result.innerHTML = this.data.map(image =>
                `<article class="item" title=${image.name}><img src=${image.url} alt=${image.name} /></article>`
            ).join("");
            this.$result.querySelectorAll(".item").forEach((item, index) => {
                item.addEventListener("click", () => {
                    this.onClick(this.data[index]);
                });
            });
        } else {
            this.$result.innerHTML =
                `<article class="notice"><h2>검색 결과가 없습니다.</h2></article>`;
        }
    }
}