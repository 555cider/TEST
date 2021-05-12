import { SearchSection as searchSection } from "./components/search-section.js";
import { ResultSection as resultSection } from "./components/result-section.js";
import { ModalSection as modalSection } from "./components/modal-section.js";
import { BannerSection as bannerSection } from "./components/banner-section.js";
import { ThemeToggle as themeToggle } from "./utils/theme-toggle.js";
import { LoadingSpinner as loadingSpinner } from "./utils/loading-spinner.js";
import { api } from "./api.js";

export class App {
    constructor($target) {
        this.$target = $target;
        this.data = sessionStorage.getItem('data');
        if (this.data) {
            this.data = JSON.parse(this.data.split(","));
        } else {
            this.data = [];
        }

        this.$search = new searchSection({
            $target,
            onSearch: async (keyword) => {
                this.$result.clear();
                const $spinner = new loadingSpinner($target);
                await api.fetchCat(keyword).then(response => {
                    this.$result.setState(response.data);
                    sessionStorage.setItem('data', JSON.stringify(response.data));
                });
                $spinner.removeSpinner();
            },
            onRandom: async () => {
                this.$result.clear();
                const $spinner = new loadingSpinner($target);
                await api.fetchCatRandom().then(response => this.$result.setState(response.data));
                $spinner.removeSpinner();
            }
        });

        this.$banner = new bannerSection({
            $target,
            data: this.data,
            onBanner: async () => await api.fetchCatRandom().then(response => this.$banner.setState(response.data))
        });

        this.$result = new resultSection({
            $target,
            data: this.data,
            onClick: async image => await api.fetchCatDetails(image.id).then(response => this.$modal.setState(response.data))
        });

        this.$modal = new modalSection({
            $target,
            data: this.data
        });

        this.$themeToggle = new themeToggle($target);
    }
}
