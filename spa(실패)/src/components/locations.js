export class Locations {
  constructor({ $app, initialState, onClick }) {
    this.state = initialState;
    this.onClick = onClick;

    this.$target = document.createElement('section');
    this.$target.className = 'locations';
    this.$target.innerHTML = `
      <h3>위치</h3>
      <button class='locations-btn' type='button'>위치</button>
      <div class='locations-result'></div>
    `;
    $app.appendChild(this.$target);

    document
      .querySelector('.locations-btn')
      .addEventListener('click', this.onClick);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    document.querySelector('.locations-result').innerHTML = this.state;
  }
}
