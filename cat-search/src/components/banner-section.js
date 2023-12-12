export class BannerSection {
  constructor({ $target, data, onBanner, onClick }) {
    this.data = data;
    this.onBanner = onBanner;
    this.onClick = onClick;

    this.$banner = document.createElement("section");
    this.$banner.className = "banner-section";

    this.bannerImgs = document.createElement("div");
    this.bannerImgs.className = "banner-imgs";

    this.bannerBtns = document.createElement("div");
    this.bannerBtns.className = "banner-btns";

    this.prevBtn = document.createElement("button");
    this.prevBtn.id = "prev-btn";
    this.prevBtn.innerHTML = `<<`;

    this.nextBtn = document.createElement("button");
    this.nextBtn.id = "next-btn";
    this.nextBtn.innerHTML = `>>`;

    this.bannerDots = document.createElement("div");
    this.bannerDots.className = "banner-dots";

    this.bannerBtns.appendChild(this.prevBtn);
    this.bannerBtns.appendChild(this.nextBtn);
    this.$banner.appendChild(this.bannerImgs);
    this.$banner.appendChild(this.bannerBtns);
    this.$banner.appendChild(this.bannerDots);
    $target.appendChild(this.$banner);

    this.onBanner();
  }

  setState(data) {
    this.data = data;
    this.render();
  }

  render() {
    const bannerImgs = this.$banner.querySelector(".banner-imgs");
    const bannerDots = this.$banner.querySelector(".banner-dots");
    for (let i = 0; i < 5; i++) {
      bannerImgs.innerHTML += `<img class="banner-img" src=${this.data[i].url} dataset.src=${this.data[i].url} alt=${this.data[i].name}>`;
      bannerDots.innerHTML += `<span class="banner-dot"></span>`;
    }
    bannerImgs.firstElementChild.classList.add("active");
    bannerDots.firstElementChild.classList.add("active");

    this.prevBtn.addEventListener("click", () => {
      const actives = this.$banner.querySelectorAll(".active");
      actives.forEach((e) => {
        e.classList.remove("active");
        if (e.previousElementSibling) {
          e.previousElementSibling.classList.add("active");
        } else {
          e.parentElement.lastElementChild.classList.add("active");
        }
      });
    });

    this.nextBtn.addEventListener("click", () => {
      const actives = this.$banner.querySelectorAll(".active");
      actives.forEach((e) => {
        e.classList.remove("active");
        if (e.nextElementSibling) {
          e.nextElementSibling.classList.add("active");
        } else {
          e.parentElement.firstElementChild.classList.add("active");
        }
      });
    });
  }
}
