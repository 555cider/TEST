const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export class ImageViewer {
  constructor({ $app, initialState }) {
    this.state = initialState;

    this.$target = document.createElement("div");
    this.$target.className = "Modal ImageViewer";
    $app.appendChild(this.$target);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `<div class="content">${
      this.state.filePath
        ? `<img src="${IMAGE_PATH_PREFIX}${this.state.filePath}">`
        : ""
    }</div>`;
    this.$target.style.display = this.state.filePath ? "block" : "none";
    this.$target.addEventListener("click", function (e) {
      const imageModal = document.querySelector(".ImageViewer");
      imageModal.removeChild(imageModal.firstChild);
      document.querySelector(".ImageViewer").style.display = "none";
    });
  }
}
