const events = require("events");
module.exports = class extends events.EventEmitter {
  constructor() {
    super(); // for calling constructor of base class (event emitter)
  }
};
