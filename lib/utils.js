'use strict';
const chalk = require('chalk');
const Ora = require('ora');
const logSymbols = require('log-symbols');
const figures = require('figures');

const pointer = chalk.yellow(figures.pointer);
const skipped = chalk.yellow(figures.arrowDown);

exports.getSymbol = (task, options) => {
	if (!task.spinner) {
		task.spinner = new Ora({
			color: 'yellow'
		});
	}

	if (task.isPending()) {
		return options.showSubtasks !== false && task.subtasks.length > 0 ? `${pointer} ` : task.spinner.frame();
	}

	if (task.isCompleted()) {
		return `${logSymbols.success} `;
	}

	if (task.hasFailed()) {
		return task.subtasks.length > 0 ? `${pointer} ` : `${logSymbols.error} `;
	}

	if (task.isSkipped()) {
		return `${skipped} `;
	}

	return '  ';
};
