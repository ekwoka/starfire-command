import Alpine from 'alpinejs/src';
import Plugins from './plugins';
import Data from './data';
import Stores from './stores';
import * as Starfire from './starfire.js';
import * as OAuth from './oauth';
import * as Turbo from './turbonav';

window.Alpine = Alpine;
window.Starfire = Starfire;
window.Turbo = Turbo;

[...Plugins, ...Data, ...Stores].forEach((p) => Alpine.plugin(p));
OAuth.checkIdentity();
Alpine.start();
Turbo.init();
