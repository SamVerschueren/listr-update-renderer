'use strict';
const Observable = require('zen-observable');
const logSymbols = require('log-symbols');
const delay = require('delay');
const Listr = require('listr');
const renderer = require('./');

const tasks = new Listr([
	{
		title: 'Git',
		task: () => {
			return new Listr([
				{
					title: 'Checking git status',
					task: () => {
						return new Observable(observer => {
							observer.next('foo');

							delay(2000)
								.then(() => {
									observer.next('bar');
									return delay(2000);
								})
								.then(() => {
									observer.next(0);
									return delay(500);
								})
								.then(() => {
									observer.next(1);
									return delay(500);
								})
								.then(() => {
									observer.next({hello: 'world'});
									return delay(500);
								})
								.then(() => {
									observer.next('');
									return delay(500);
								})
								.then(() => {
									observer.complete();
								});
						});
					}
				},
				{
					title: 'Checking remote history',
					task: () => delay(2000)
				}
			], {concurrent: true});
		}
	},
	{
		title: 'Install npm dependencies',
		task: () => delay(2000)
	},
	{
		title: 'Run tests',
		task: () => delay(2000).then(() => {
			return new Observable(observer => {
				observer.next('clinton && xo && ava');

				delay(2000)
					.then(() => {
						observer.next(`${logSymbols.success} 7 passed`);
						return delay(2000);
					})
					.then(() => {
						observer.complete();
					});
			});
		})
	},
	{
		title: 'Publish package',
		task: () => delay(1000).then(() => {
			throw new Error('Package name already exists');
		})
	}
], {
	renderer
});

tasks.run().catch(err => {
	console.error(err.message);
});
