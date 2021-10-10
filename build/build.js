import Alpine from 'alpinejs/src'
import Plugins from './plugins.js'
import Data from './data'
import Stores from './stores'
import * as Starfire from './starfire.js'
import * as OAuth from './oauth'

window.Alpine = Alpine
window.Starfire = Starfire;

[...Plugins,...Data,...Stores].forEach(p=>Alpine.plugin(p))
Alpine.start()

OAuth.checkIdentity();