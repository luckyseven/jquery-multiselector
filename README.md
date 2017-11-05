# jQuery MultiSelector Plugin

> A jQuery plugin to select multiple DOM elements with *Shift* and *Ctrl/Command* keys in a desktop-like way.

## Getting started

You can download jQuery MultiSelector Plugin from:

* [GitHub last release](https://github.com/luckyseven/jquery-multiselector/releases)
* Clone the repo: `git@github.com:luckyseven/jquery-multiselector.git`

## Setup

Add jQuery and MultiSelector in your web pages (according to your paths):

```html
<script src="/path/to/jquery.min.js"></script>
<script src="/path/to/multiselector.min.js"></script>
```

## DOM structure

You can use this plugin on DOM elements with children, like this:
```html
<!-- Example 1 -->
<ul id="test1">
    <li>Element1</li>
    <li>Element2</li>
    <!-- ... -->
</ul>

<div id="test2">
    <div>Element1</div>
    <div>Element2</div>
    <!-- ... -->
</div>
```

## Usage

Call the plugin on your targets (one or multiple elements):
```html
<script>
    $("#test1, #test2").multiSelector({
        selector: "li"
    });
</script>
```
The `selector` option identifies target(s) children that will become clickable (if you don't define a selector, `*` will be used as default). Click over them while pressing *Shift* or *Ctrl/Command* to perform a multiple selection. Default class `ms-selected` will be assigned to selected items (see the **Options** part to obtain more informations).


## Methods

Here's a list of available methods. Usage:
```javascript
$("...").multiSelector('METHOD NAME');
```

Method name | Description
-----|-----
`bind`| Same as $("...").multiSelector(); Bind events for target(s) children.
`unbind`| Unbind plugin events from target(s)
`select`| Select all children of target(s)
`deselect`| Deselect all children of target(s)
`get`| Return all the selected elements. Using one target, it will return an *Array* of selected elements. Using more targets, it will return an *Object* containing **N** *Array*s (one for every target). They will be identified by IDs that were assigned during the *bind* process. Every target will have a *data-ms-id* attribute containing the assigned ID.


## Options
You can pass an object to the plugin call (or as second parameter of `bind` method):
```javascript
    $("...").multiSelector({
        selector: "li"
    });

    // Or
    
    $("...").multiSelector('bind', {
        selector: "li"
    });
```


Here's a list of available settings.


Option name			| Type				| Default		| Description
---						| ---					| ---				| ---
`selectedElementClass`		| *String*		| `'ms-selected'`		| The *class* assigned to every selected element.
`selector`		| *String*		| `'*'`		| The selector that identifies target(s) children that will become clickable (and selectable).
`disableSelection`	| *Boolean*		| `true`		| Deny text selection in clickable elements.
`disableCtrl`	| *Boolean*		| `false`		| Deny the use of *Ctrl/Command* button.
`disableShift`	| *Boolean*		| `false`		| Deny the use of *Shift* button.

## Callbacks

With options you can pass also some callbacks:


Callback name			| Description
---						| ---
`onSelectionStart`	| This callback will be called after a click over an element, but before every other operations. You can use up to four parameters: `list` (that contains an *Array* with selected objects), `parent` (the target object), `element` (the clicked object), `event` (the onClick event object). 
`onSelectionEnd`	| This callback will be called at the end of the selection. You can use up to four parameters: `list` (that contains an *Array* with selected objects), `parent` (the target object), `element` (the clicked object), `event` (the onClick event object). 

## Example

Open `example/index.html` in your browser to see jQuery MultiSelector Plugin in action or click [here](http://htmlpreview.github.io/?https://github.com/luckyseven/jquery-multiselector/blob/master/example/index.html).


**Have you used this plugin in your project?**

Say hello with a [tweet](https://twitter.com/luckysevenrox)!

## Alternatives

**Need a non-jquery version?**

I'm already working on it, but feel free to contact me and ask for improvement!


## History

Check [Releases](https://github.com/luckyseven/jquery-multiselector/releases) for detailed changelog.


## License

> MIT License - Copyright (c) 2017 Alberto Fecchi

Full license [here](LICENSE)