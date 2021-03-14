import SearchSection from "./components/searchSection.js";
import ResultSection from "./components/resultSection.js";
import ModalSection from "./components/modalSection.js";
import BannerSection from "./components/bannerSection.js";
import ThemeToggle from "./utils/themeToggle.js";
import api from "./api.js";

export default class App {
    constructor($target) {
        this.$target = $target;
        this.data = [];
        
        api.fetchCatRandom().then(response => this.$banner.setState(response.data));

        this.$search = new SearchSection({
            $target,
            onSearch: keyword => api.fetchCat(keyword).then(response => this.$result.setState(response.data)),
            onRandom: () => api.fetchCatRandom().then(response => this.$result.setState(response.data))
        });

        this.$banner = new BannerSection({
            $target,
            data: this.data,
            onBanner: () => api.fetchCatRandom().then(response => this.$banner.setState(response.data)),
            onClick: image => api.fetchCatDetails(image.id).then(response => this.$modal.setState(response.data))
        });

        this.$result = new ResultSection({
            $target,
            data: this.data,
            onClick: image => api.fetchCatDetails(image.id).then(response => this.$modal.setState(response.data))
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
