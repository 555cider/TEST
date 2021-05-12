import { Breadcrumb } from './Breadcrumb.js';
import { Nodes } from './Nodes.js';
import { Loading } from './Loading.js';
import { ImageViewer } from './ImageView.js';
import { request } from './api.js'

const cache = {};

export class App {
  constructor($app) {
    this.state = {
      isLoading: false,
      depth: [],
      nodes: [],
      filePath: null
    };

    this.breadcrumb = new Breadcrumb({
      $app,
      initialState: [],
      onClick: (index) => {
        try {
          if (index === null) {
            this.setState({
              ...this.state,
              depth: [],
              nodes: cache.root
            });
          } else if (index !== this.state.depth.length - 1) {
            const nextDepth = this.state.depth.slice(0, index + 1);
            this.setState({
              ...this.state,
              depth: nextDepth,
              nodes: cache[nextDepth[nextDepth.length - 1].id]
            });
          }
        } catch (e) {
          console.error(e);
        }
      }
    });

    this.nodes = new Nodes({
      $app,
      initialState: this.state,
      onClick: async (node) => {
        try {
          if (node.type === 'DIRECTORY') {
            cache[node.id] = cache[node.id] ? cache[node.id] : await request(node.id);
            this.setState({
              ...this.state,
              depth: [...this.state.depth, node],
              nodes: cache[node.id]
            });
          } else if (node.type === 'FILE') {
            this.setState({
              ...this.state,
              filePath: node.filePath
            });
          }
        } catch (e) {
          console.error(e);
        }
      },
      onBackClick: async () => {
        try {
          const nextState = { ...this.state };
          nextState.depth.pop();
          if (nextState.depth.length === 0) {
            this.setState({
              depth: [],
              nodes: cache.root
            });
          } else {
            const nodeId = nextState.depth[nextState.depth.length - 1].id;
            this.setState({
              ...nextState,
              nodes: cache[nodeId]
            });
          }
        } catch (e) {
          console.error(e);
        }
      }
    });

    this.loading = new Loading({
      $app,
      initialState: this.state
    });

    this.imageViewer = new ImageViewer({
      $app,
      initialState: this.state
    });

    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.breadcrumb.setState(this.state);
    this.nodes.setState(this.state);
    this.loading.setState(this.state);
    this.imageViewer.setState(this.state);
  }

  async init() {
    try {
      this.setState({
        ...this.state,
        isLoading: false,
        nodes: await request()
      });
      cache.root = this.state.nodes;
    } catch (e) {
      console.error(e);
    }
  }
}
