export class ModalSection {
    constructor({ $target, data }) {
        this.data = data;

        this.$modal = document.createElement("section");
        this.$modal.className = "modal-section";
        this.$modal.style.display = "none";

        $target.appendChild(this.$modal);

        document.body.addEventListener("keyup", (e) => {
            if (e.code == "Escape") {
                this.$modal.querySelector("article").classList.remove("fade-in");
                this.$modal.querySelector("article").classList.add("fade-out");
                setTimeout(() => {
                    this.$modal.style.display = "none";
                }, 1000);
            }
        });
        document.body.addEventListener("click", (e) => {
            if (e.target.className === "modal-section" || e.target.className === "close") {
                this.$modal.querySelector("article").classList.remove("fade-in");
                this.$modal.querySelector("article").classList.add("fade-out");
                setTimeout(() => {
                    this.$modal.style.display = "none";
                }, 1500);
            }
        });
    }

    setState(data) {
        this.data = data;
        this.render();
    }

    render() {
        const { name, url, temperament, origin } = this.data;
        const contentWrapper = document.createElement("article");
        contentWrapper.className = "content-wrapper fade-in";
        contentWrapper.innerHTML += `<div class="title"><span>${name}</span><div class="close">x</div></div>`;
        contentWrapper.innerHTML += `<img src="${url}" alt="${name}"/>`;
        contentWrapper.innerHTML += `<div class="description"><span>성격: ${temperament}</span><br><span>태생: ${origin}</span></div>`;
        if (this.$modal.contains(document.querySelector(".content-wrapper"))) {
            this.$modal.replaceChild(contentWrapper, this.$modal.querySelector(".content-wrapper"));
        } else {
            this.$modal.appendChild(contentWrapper);
        }
        this.$modal.style.display = "block"
    }
}
