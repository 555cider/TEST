export class Auth {
  constructor({ $app, initialState, onClick }) {
    this.state = initialState;
    this.onClick = onClick;

    this.$target = document.createElement('section');
    this.$target.className = 'auth';
    this.$target.innerHTML = `
      <h3>인증</h3>
      <div class='token'>
        <p>토큰</p>
        <form id='auth-form'>
          <input name='problem' value=1 hidden>
          <input id='token' type='text' name=' placeholder='토큰을 입력해주세요'>
          <button id='auth-btn' type='submit'>▶</button>
        </form>
      </div>
      <div class='key'>
        <p>키</p>
        <input id='key' type='text' readonly>
      </div>
    `;
    $app.appendChild(this.$target);

    this.$target.querySelector('#auth-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.onClick();
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    document.querySelector('#key').value = this.state.key;
  }
}
