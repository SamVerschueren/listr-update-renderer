'use strict';
const colors = require('ansi-colors');
const figures = require('figures');
const elegantSpinner = require('elegant-spinner');

const pointer = colors.yellow(figures.pointer);
const skipped = colors.yellow(figures.arrowDown);
const success = colors.green(colors.symbols.check);
const error = colors.red(colors.symbols.cross);

exports.isDefined = x => x !== null && x !== undefined;

exports.getSymbol = (task, options) => {
	if (!task.spinner) {
		task.spinner = elegantSpinner();
	}

	if (task.isPending()) {
		return options.showSubtasks !== false && task.subtasks.length > 0 ? pointer : colors.yellow(task.spinner());
	}

	if (task.isCompleted()) {
		return success;
	}

	if (task.hasFailed()) {
		return task.subtasks.length > 0 ? pointer : error;
	}

	if (task.isSkipped()) {
		return skipped;
	}

	return ' ';
};
