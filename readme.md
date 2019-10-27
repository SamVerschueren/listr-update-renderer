# listr-update-renderer [![Build Status](https://travis-ci.org/SamVerschueren/listr-update-renderer.svg?branch=master)](https://travis-ci.org/SamVerschueren/listr-update-renderer)

> [Listr](https://github.com/SamVerschueren/listr) update renderer

<img src="screenshot.gif" />


## Install

```
$ npm install --save listr-update-renderer
```


## Usage

```js
const UpdaterRenderer = require('listr-update-renderer');
const Listr = require('listr');

const list = new Listr([
    {
        title: 'foo',
        task: () => Promise.resolve('bar')
    }
], {
    renderer: UpdaterRenderer,
	collapse: false
});

list.run();
```

> Note: This is the default renderer for [Listr](https://github.com/SamVerschueren/listr) and doesn't need to be specified.


## Options

These options should be provided in the [Listr](https://github.com/SamVerschueren/listr) options object.

### showSubtasks

Type: `boolean`<br>
Default: `true`

Set to `false` if you want to disable the rendering of the subtasks. Subtasks will be rendered if an error occurred in one of them.

### collapse

Type: `boolean`<br>
Default: `true`

Set to `false` if you don't want subtasks to be hidden after the main task succeed.

### clearOutput

Type: `boolean`<br>
Default: `false`

Clear the output when all the tasks are executed succesfully.


## Related

- [listr](https://github.com/SamVerschueren/listr) - Terminal task list
- [listr-verbose-renderer](https://github.com/SamVerschueren/listr-verbose-renderer) - Listr verbose renderer
- [listr-silent-renderer](https://github.com/SamVerschueren/listr-silent-renderer) - Suppress Listr rendering output


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)


---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-listr-update-renderer?utm_source=npm-listr-update-renderer&utm_medium=referral&utm_campaign=enterprise&utm_term=repo">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
