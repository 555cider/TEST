import SearchSection from "./components/search-section.js";
import ResultSection from "./components/result-section.js";
import ModalSection from "./components/modal-section.js";
import BannerSection from "./components/banner-section.js";
import ThemeToggle from "./utils/theme-toggle.js";
import Loader from "./utils/loader.js";
import api from "./api.js";

export default class App {
    constructor($target) {
        this.$target = $target;
        this.data = sessionStorage.getItem('data');
        if (this.data) {
            this.data = JSON.parse(this.data.split(","));
        } else {
            this.data = [];
        }

        this.$search = new SearchSection({
            $target,
            onSearch: async (keyword) => {
                this.$result.clear();
                const loader = new Loader($target);
                await api.fetchCat(keyword).then(response => {
                    this.$result.setState(response.data);
                    sessionStorage.setItem('data', JSON.stringify(response.data));
                });
                loader.removeLoader();
            },
            onRandom: async () => {
                this.$result.clear();
                const loader = new Loader($target);
                await api.fetchCatRandom().then(response => this.$result.setState(response.data));
                loader.removeLoader();
            }
        });

        this.$banner = new BannerSection({
            $target,
            data: this.data,
            onBanner: async () => await api.fetchCatRandom().then(response => this.$banner.setState(response.data))
        });

        this.$result = new ResultSection({
            $target,
            data: this.data,
            onClick: async image => await api.fetchCatDetails(image.id).then(response => this.$modal.setState(response.data))
        });

        this.$modal = new ModalSection({
            $target,
            data: this.data
        });

        this.$themeToggle = new ThemeToggle({
            $target
        });
    }
}
