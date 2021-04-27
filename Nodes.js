export default class Nodes {
  constructor({ $app, initialState, onClick, onBackClick }) {
    this.state = initialState;
    this.onClick = onClick;
    this.onBackClick = onBackClick;

    this.$target = document.createElement('ul');
    this.$target.className = "Nodes";

    $app.appendChild(this.$target);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const prevNode = this.state.depth.length === 0 ? `` : `<li class='Node'><img src='./assets/prev.png'/></li>`;
    const currNodes = this.state.nodes.map((node) => {
      const iconPath = node.type === 'DIRECTORY' ? './assets/directory.png' : './assets/file.png';
      return `<li class='Node' data-node-id='${node.id}'><img src='${iconPath}'/><div>${node.name}</div></li>`;
    }).join('');
    this.$target.innerHTML = prevNode + currNodes;

    this.$target.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      const $node = e.target.closest('.Node');
      if ($node) {
        const { nodeId } = $node.dataset;
        if (nodeId) {
          this.onClick(this.state.nodes.find(node => node.id === nodeId));
        } else {
          this.onBackClick();
        }
      }
    });
  }
}