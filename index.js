var fs = require('fs')
var _ = require("underscore")
var transformTools = require("browserify-transform-tools")

var DNA = require("organic-dna")
var foldAndMerge = require("organic-dna-fold")
var resolveReferences = require("organic-dna-resolvereferences")
var selectBranch = require("organic-dna-branches").selectBranch

module.exports = transformTools.makeRequireTransform("requireTransform",{
  evaluateArguments: false, 
  jsFilesOnly: true
}, function(args, opts, cb) {

  if (args[0] == '"dna"') {

    var dna = new DNA()
    dna.loadDir(process.cwd()+"/dna", function(){
      resolveReferences(dna)
      foldAndMerge(dna, selectBranch(dna, process.env.CELL_MODE || "_development"))
      cb(null, JSON.stringify(dna.client || {}))
    })
  } else {
    return cb();
  }
})