function act(c) {
  c.sut.mutate_one();
}
act._name = module.filename;
act.base = require('../new');
module.exports = act;
