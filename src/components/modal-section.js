export class ModalSection {
    constructor({ $target, data }) {
        this.data = data;

        this.$modal = document.createElement("section");
        this.$modal.className = "modal-section";
        this.$modal.style.display = "none";

        $target.appendChild(this.$modal);

        document.body.addEventListener("keyup", (e) => {
            if (e.code == "Escape") {
                this.$modal.style.display = "none";
            }
        });
        document.body.addEventListener("click", (e) => {
            if (e.target.className === "modal-section" || e.target.className === "close") {
                this.$modal.style.display = "none";
            }
        });
    }

    toggleDisplay(obj) {
        if (obj.style.display === "none") {
            obj.style.display = "block";
        } else {
            obj.style.display = "none";
        }
    }

    setState(data) {
        this.data = data;
        this.toggleDisplay(this.$modal);
        this.render();
    }

    render() {
        const { name, url, temperament, origin } = this.data;
        const contentWrapper = document.createElement("article");
        contentWrapper.className = "content-wrapper";
        contentWrapper.innerHTML += `<div class="title"><span>${name}</span><div class="close">x</div></div>`;
        contentWrapper.innerHTML += `<img src="${url}" alt="${name}"/>`;
        contentWrapper.innerHTML += `<div class="description"><span>성격: ${temperament}</span><br><span>태생: ${origin}</span></div>`;
        this.$modal.appendChild(contentWrapper);
    }
}
