import LazyLoading from "../utils/lazy-loading.js";

export default class ResultSection {
    constructor({ $target, data, onClick }) {
        this.data = data;
        this.onClick = onClick;

        this.$result = document.createElement("section");
        this.$result.className = "result-section";
        $target.appendChild(this.$result);

        this.render();
    }

    clear() {
        this.$result.innerHTML = "";
    }

    setState(data) {
        this.data = data;
        this.render();
    }

    render() {
        if (this.data.length === 0) {
            this.$result.innerHTML =
                `<article class="notice"><h2>검색 결과가 없습니다.</h2></article>`;
        } else {
            this.$result.innerHTML = "";
            this.data.map(datum => {
                const imageWrapper = document.createElement("article");
                imageWrapper.className = "image-wrapper";
                imageWrapper.title = datum.name;

                const image = document.createElement('img');
                if ('loading' in HTMLImageElement.prototype) {
                    image.loading = "lazy";
                    image.src = datum.url;
                    image.alt = datum.name;
                } else {
                    image.className = "lazy";
                    image.src = datum.url;
                    image.alt = datum.name;
                }

                imageWrapper.appendChild(image);
                this.$result.appendChild(imageWrapper);
            });

            this.$result.querySelectorAll(".image-wrapper").forEach((e, index) => {
                e.addEventListener("click", () => {
                    this.onClick(this.data[index]);
                });
            });

            if (!('loading' in HTMLImageElement.prototype)) {
                LazyLoading();
            }
        }
    }
}