var new_dummy = require('./dummy');

function act(c) {
  c.sut = new_dummy();
}
act._name = module.filename;
module.exports = act;
