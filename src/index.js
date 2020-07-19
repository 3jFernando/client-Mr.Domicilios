import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// configuracion store redux
import { Provider } from 'react-redux';
import store, { saveState } from './redux/store';

class Root extends Component {

  componentDidMount() {
    window.addEventListener('unload', saveState);
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

ReactDOM.render(<Root  />,
  document.getElementById('root')
);