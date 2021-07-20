export class Trucks {
  constructor({ $app, initialState, onClick }) {
    this.state = initialState;
    this.onClick = onClick;

    this.$target = document.createElement('div');
    this.$target.className = 'trucks';
    this.$target.innerHTML = `
      <button class='trucks-btn' type='button'>트럭</button>
      <div class='trucks-result'></div>
    `;
    $app.appendChild(this.$target);

    document
      .querySelector('.trucks-btn')
      .addEventListener('click', this.onClick);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    document.querySelector('.trucks-result').innerHTML = this.state;
  }
}
