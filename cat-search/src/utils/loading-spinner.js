export class LoadingSpinner {
    constructor($target) {
        this.spinnerWrapper = document.createElement('div');
        this.spinnerWrapper.className = 'spinner-wrapper';

        this.spinner = document.createElement("div");
        this.spinner.className = "spinner";

        this.spinnerWrapper.appendChild(this.spinner);
        $target.appendChild(this.spinnerWrapper);
    }

    removeSpinner() {
        const spinnerWrapper = document.querySelector(".spinner-wrapper");
        spinnerWrapper.remove();
    }
}