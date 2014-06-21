var fs = require('fs')
var _ = require("underscore")
var transformTools = require("browserify-transform-tools")

var DNA = require("organic-dna")
var fold = require("organic-dna-fold")
var resolveReferences = require("organic-dna-resolvereferences")

module.exports = transformTools.makeRequireTransform("requireTransform",{
  evaluateArguments: false, 
  jsFilesOnly: true
}, function(args, opts, cb) {
  if (args[0] == '"dna"') {
    var dna = new DNA()
    dna.loadDir(process.cwd()+"/dna", function(){
      resolveReferences(dna)
      if(dna[process.env.CELL_MODE])
          fold(dna, process.env.CELL_MODE)

      cb(null, JSON.stringify(dna.client))
    })
  } else {
    return cb();
  }
})