export class Breadcrumb {
  constructor({ $app, initialState, onClick }) {
    this.state = initialState;
    this.onClick = onClick;

    this.$target = document.createElement('nav');
    this.$target.className = 'Breadcrumb';
    
    $app.appendChild(this.$target);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `<div class='nav-item'>root</div>
      ${this.state.depth.map((node, index) =>
      `<div class='nav-item' data-index='${index}'>${node.name}</div>`
    ).join('')}`;

    this.$target.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      const $navItem = e.target.closest('.nav-item');
      if ($navItem) {
        const { index } = $navItem.dataset;
        this.onClick(index ? index : null);
      }
    });
  }
}
