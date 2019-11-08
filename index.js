'use strict';
const logUpdate = require('log-update');
const chalk = require('chalk');
const figures = require('figures');
const indentString = require('indent-string');
const cliTruncate = require('cli-truncate');
const stripAnsi = require('strip-ansi');
const utils = require('./lib/utils');

const renderHelper = (tasks, options, level) => {
	level = level || 0;

	let output = [];

	for (const task of tasks) {
		if (task.isEnabled()) {
			const skipped = task.isSkipped() ? ` ${chalk.dim('[skipped]')}` : '';
			const timing = options.showTiming && !task.isSkipped() ? ` ${chalk.gray(utils.getTiming(task))}` : '';

			output.push(indentString(` ${utils.getSymbol(task, options)} ${task.title}${skipped}${timing}`, level, '  '));

			if ((task.isPending() || task.isSkipped() || task.hasFailed()) && utils.isDefined(task.output)) {
				let data = task.output;

				if (typeof data === 'string') {
					data = stripAnsi(data.trim().split('\n').filter(Boolean).pop());

					if (data === '') {
						data = undefined;
					}
				}

				if (utils.isDefined(data)) {
					const out = indentString(`${figures.arrowRight} ${data}`, level, '  ');
					output.push(`   ${chalk.gray(cliTruncate(out, process.stdout.columns - 3))}`);
				}
			}

			if ((task.isPending() || task.hasFailed() || options.collapse === false) && (task.hasFailed() || options.showSubtasks !== false) && task.subtasks.length > 0) {
				output = output.concat(renderHelper(task.subtasks, options, level + 1));
			}
		}
	}

	return output.join('\n');
};

const render = (tasks, options) => {
	logUpdate(renderHelper(tasks, options));
};

const trackTaskTiming = (tasks, options) => {
	if (!options.showTiming) {
		return;
	}

	for (const task of tasks) {
		task.subscribe(event => {
			if (event.type === 'SUBTASKS') {
				trackTaskTiming(task.subtasks, options);
			} else if (event.type === 'STATE') {
				if (task.isPending()) {
					task._startTime = Date.now();
				} else if (task.isCompleted() || task.hasFailed()) {
					task._duration = utils.getTiming(task);
				}
			}
		});
	}
};

class UpdateRenderer {
	constructor(tasks, options) {
		this._tasks = tasks;
		this._options = Object.assign({
			showSubtasks: true,
			collapse: true,
			clearOutput: false,
			showTiming: true
		}, options);
	}

	render() {
		if (this._id) {
			// Do not render if we are already rendering
			return;
		}

		trackTaskTiming(this._tasks, this._options);

		this._id = setInterval(() => {
			render(this._tasks, this._options);
		}, 100);
	}

	end(err) {
		if (this._id) {
			clearInterval(this._id);
			this._id = undefined;
		}

		render(this._tasks, this._options);

		if (this._options.clearOutput && err === undefined) {
			logUpdate.clear();
		} else {
			logUpdate.done();
		}
	}
}

module.exports = UpdateRenderer;
