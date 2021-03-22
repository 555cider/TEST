import lazyLoad from "../utils/lazyLoad.js";

export default class ResultSection {
    constructor({ $target, data, onClick }) {
        this.data = data;
        this.onClick = onClick;

        this.$result = document.createElement("section");
        this.$result.className = "result-section";        
        $target.appendChild(this.$result);

        this.render();
        lazyLoad();
    }

    setState(data) {
        this.data = data;
        this.render();
        lazyLoad();
    }

    render() {
        if (this.data.length > 0) {
            this.$result.innerHTML = "";
            this.data.map(datum => {
                const imageWrapper = document.createElement("article");
                imageWrapper.className = "image-wrapper";
                imageWrapper.title = datum.name;

                const image = document.createElement('img');
                image.className = "lazy";
                image.dataset.src = datum.url;
                image.dataset.alt = datum.name;

                imageWrapper.appendChild(image);
                this.$result.appendChild(imageWrapper);
            });
            this.$result.querySelectorAll(".image-wrapper").forEach((item, index) => {
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