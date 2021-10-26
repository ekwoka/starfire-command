const { Liquid } = require('liquidjs');
const fs = require('fs');
const engine = new Liquid({
    extname: '.liquid',
    root: 'liquid/pages',
    layouts: 'liquid/layouts',
    partials: 'liquid/snippets'
})

const output = fs.createWriteStream(`src/test.html`)
engine.renderFileToNodeStream('index',{thing: 'liquid'}).then(stream=>stream.pipe(output))