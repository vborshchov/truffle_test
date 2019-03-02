import { html } from '../../node_modules/htm/preact/standalone.mjs';
import Header from "./components/Header.js";
import Game from "./components/Game.js";
import Footer from "./components/Footer.js";

const App = () => {
    return html`
        <div class="app">
            <${Header} name="Super duper game" />
            <${Game} />
            <${Footer}>
                © All right reserved. Students of <a className="Footer__link" href="https://www.facebook.com/tlblockchainacademy/">Blockchain Academy</a>
            </${Footer}>
        </div>
    `;
};

export default App;