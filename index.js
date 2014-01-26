var fs = require('fs');
var serialize = require('node-serialize');

function FsAdapter(opts) {
	var opts = opts || {};

	this.opts = {
		dir: opts.dir || process.cwd() + '/'
	};
}

FsAdapter.prototype.initializeWorkflow = function(id, definition) {
	var createFile = function(err) {
		if(err) return console.error(err);

		var serializedDefinition = this.serializeDefinition(definition);

		fs.writeFileSync(this.opts.dir + '/' + id + '/definition.json', serializedDefinition);
	}.bind(this)

	if(!fs.existsSync(this.opts.dir + '/' + id)) {
		fs.mkdir(this.opts.dir + '/' + id, 0777, createFile);
	} else {
		createFile.call(this);
	}
}

FsAdapter.prototype.serializeDefinition = function(definition) {
	return serialize.serialize(definition);
}

module.exports = FsAdapter;