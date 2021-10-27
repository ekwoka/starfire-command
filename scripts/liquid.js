const { Liquid } = require('liquidjs');
const fs = require('fs');
const engine = new Liquid({
    extname: '.liquid',
    root: 'liquid/pages',
    layouts: 'liquid/layouts',
    partials: ['liquid/snippets','liquid/icons']
})

fs.readdir('liquid/pages',(err,files)=>{
    console.time('Liquid Rendered')
    files.forEach(f=>{
        f = f.replace('.liquid','')
        const output = fs.createWriteStream(`src/${f}.html`)
        engine.renderFileToNodeStream(f).then(stream=>stream.pipe(output))
    })
    console.timeEnd('Liquid Rendered')
})
