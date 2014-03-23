var fs = require('fs')
var _ = require("underscore")
var transformTools = require("browserify-transform-tools")

var clientDNA = {}
var clientDNALoaded = false

module.exports = transformTools.makeRequireTransform("requireTransform",
  _.extend({evaluateArguments: false, jsFilesOnly: true}),
  function(args, opts, cb) {
    if (args[0] == '"dna"') {
      if(!clientDNALoaded)
        if(fs.existsSync(process.cwd()+"/dna")) {
          var DNA = require("organic").DNA
          var dna = new DNA()
          dna.loadDir(process.cwd()+"/dna", function(){
            if(dna.client) {
              if(dna[process.env.CELL_MODE])
                  dna.mergeBranchInRoot(process.env.CELL_MODE)
              _.extend(clientDNA, dna.client)
              clientDNALoaded = true
              cb(null, JSON.stringify(clientDNA))
            } else
              cb(null, JSON.stringify(clientDNA))
          })
        } else
        if(fs.existsSync(process.cwd()+"/jadeify.json")) {
          clientDNA = require(process.cwd()+"/jadeify.json")
          clientDNALoaded = true
          cb(null, JSON.stringify(clientDNA))
        } else {
          clientDNALoaded = true
          cb(null, JSON.stringify(clientDNA))
        }
      else
        cb(null, JSON.stringify(clientDNA))
    } else {
      return cb();
    }
  })