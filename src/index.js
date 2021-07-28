import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './assets/base.scss';
import { HashRouter } from 'react-router-dom'
import Main from './DemoPages/Main';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store, persistor } from './store';
import './index.scss'

const rootElement = document.getElementById('root');

toast.configure()

const renderApp = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HashRouter>
                    <Component />
                </HashRouter>
            </PersistGate>
        </Provider>,
        rootElement
    );
};

renderApp(Main);

if (module.hot) {
    module.hot.accept('./DemoPages/Main', () => {
        const NextApp = require('./DemoPages/Main').default;
        renderApp(NextApp);
    });
}
serviceWorker.unregister();

