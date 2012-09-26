function act(c) {
  c.sut.mutate_two();
}

act._name = module.filename;
act.base =  require('../mutate_one');
module.exports = act;
