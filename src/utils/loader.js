export default class Loader {
    constructor($target) {
        this.loaderWrapper = document.createElement('div');
        this.loaderWrapper.className = 'loader-wrapper';

        this.loader = document.createElement("div");
        this.loader.className = "loader";

        $target.appendChild(this.loaderWrapper);
        this.loaderWrapper.appendChild(this.loader);
    }

    removeLoader() {
        const loaderWrapper = document.querySelector(".loader-wrapper");
        loaderWrapper.remove();
    }
}