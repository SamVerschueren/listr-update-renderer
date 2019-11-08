'use strict';
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const figures = require('figures');
const elegantSpinner = require('elegant-spinner');

const pointer = chalk.yellow(figures.pointer);
const skipped = chalk.yellow(figures.arrowDown);

exports.isDefined = x => x !== null && x !== undefined;

exports.getSymbol = (task, options) => {
	if (!task.spinner) {
		task.spinner = elegantSpinner();
	}

	if (task.isPending()) {
		return options.showSubtasks !== false && task.subtasks.length > 0 ? pointer : chalk.yellow(task.spinner());
	}

	if (task.isCompleted()) {
		return logSymbols.success;
	}

	if (task.hasFailed()) {
		return task.subtasks.length > 0 ? pointer : logSymbols.error;
	}

	if (task.isSkipped()) {
		return skipped;
	}

	return ' ';
};

exports.getTiming = task => {
	if (task._duration) {
		return task._duration;
	}

	if (!task._startTime) {
		return '';
	}

	const duration = Date.now() - task._startTime;
	let seconds = parseInt((duration / 1000) % 60, 10);
	let minutes = parseInt((duration / (60000)) % 60, 10);
	let hours = parseInt((duration / (3600000)), 10);

	hours = (hours < 10) ? '0' + hours : hours;
	minutes = (minutes < 10) ? '0' + minutes : minutes;
	seconds = (seconds < 10) ? '0' + seconds : seconds;

	return `[${hours === '00' ? '' : hours + ':'}${minutes}:${seconds}]`;
};
