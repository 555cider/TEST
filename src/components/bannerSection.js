export default class BannerSection {
    constructor({ $target, data, onBanner, onClick }) {
        this.data = data;
        this.onBanner = onBanner;
        this.onClick = onClick;

        this.$banner = document.createElement("section");
        this.$banner.className = "banner-section";
        $target.appendChild(this.$banner);

        this.onBanner;
    }

    setState(data) {
        this.data = data;
        this.render();
    }

    render() {
        for (let i = 0; i < 5; i++) {
            this.$banner.innerHTML += `<article class="item" title=${this.data[i].name}><img src=${this.data[i].url} alt=${this.data[i].name} /></article>`;
        }
        this.$banner.querySelectorAll(".item").forEach((item, index) => {
            item.addEventListener("click", () => {
                this.onClick(this.data[index]);
            });
        });

    }
}