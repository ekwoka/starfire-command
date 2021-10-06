import Alpine from 'alpinejs/src'
import Plugins from './plugins.js'
import Data from './data.js'
import Stores from './stores.js'
import * as Starfire from './starfire.js'
import * as OAuth from './oauth'

window.Alpine = Alpine
window.Starfire = Starfire;

OAuth.checkIdentity();


[...Plugins,...Data,...Stores].forEach(p=>Alpine.plugin(p))

Alpine.start()