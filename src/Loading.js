export class Loading {
  constructor ({ $app, initialState }) {
    this.state = initialState

    this.$target = document.createElement('div')
    this.$target.className = 'Modal Loading'
    this.$target.innerHTML = '<div class="content"><img src="./assets/nyan-cat.gif" alt="loading"></div>'

    $app.appendChild(this.$target)
  }

  setState (nextState) {
    this.state = nextState
    this.render()
  }

  render () {
    this.$target.style.display = this.state.isLoading ? 'block' : 'none'
  }
}
