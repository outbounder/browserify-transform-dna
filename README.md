# browserify-transform-dna

http://browserify.org/ transformer for `organic-dna`

## use

1. Install:

        $ cd myProject
        $ npm install browserify-transform-dna

2. Create the following structure and files:

        + myProject
        |-+ dna
          |  |- client.json
          |- main.js

3. Create the content:

        // client.json
        {
          "property": "value"
        }

        // main.js
        var dna = require("dna")
        console.log(dna.property)

4. Bundle:

        $ browserify -t browserify-transform-dna ....

5. See in the browser that `dna.property` is equal to `value`
6. Read more about `[organic-dna](https://github.com/outbounder/organic-dna)`, `[organic-dna-fold](https://github.com/outbounder/organic-dna-fold)`, `[organic-dna-resolvereferences](https://github.com/outbounder/organic-dna-resolvereferences)`
7. Note that `browserify-transform-dna` uses `process.env.CELL_MODE` for folding
  * default value is `_development`


