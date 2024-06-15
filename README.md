# README: bs-toast.js

## 1. Installation

You can include `bs-toast.js` in your project using Composer or by manually downloading the script file.

### Composer

Use the following command to install via composer:

```shell
composer require bs-toast:dev-main
```

### Manual Installation

To manually install the script, download `bs-toast.js` and include it in your project's JavaScript files.

## 2. Options

`bsToast` file has a number of options you can customize. The options for the toast feature include:

- `type`: The type of the toast. It could be one of 'info', 'warning', 'success', 'danger'. The default value is 'info'.
- `title`: The title of the toast. By default, it's null.
- `message`: The message of the toast. The default message is 'Always be informed'.
- `start`: The starting time of the toast, it is 0 by default.
- `delay`: Delay before the toast disappears, 5000ms as default.
- `autoHide`: A boolean indicating whether to hide the toast automatically. It's by default set to true.
- `animation`: A boolean indicating whether the toast should be animated or not, also set to true by default.
- `placement`: The placement of the toast. The possible values are 'ts', 'tc', 'te', 'ms', 'mc', 'me', 'bs', 'bc', 'be'.
  By default, it's 'mc'.

## 3. Events

The script triggers various events that allow your application to react to the different states of the toast lifecycle:

- `onShow`: This event is fired when the toast starts showing.
- `onShown`: Firing after the toast has been shown.
- `onHide`: This event is fired when the toast starts hiding.
- `onHidden`: Firing after the toast has been hidden.

## 4. Example

Here is an example of how to use the `bsToast`.:

```javascript
$(document).ready(function() {
    $.bsToast({
        type: 'info',
        title: 'Hello, User',
        message: 'This toast is a toast example.',
        autoHide: false,
        placement: 'tc',
        onShow: function() {
            // Write your code here for the onShow event.
        },
        onShown: function() {
            // Write your code here for the onShown event.
        },
        onHide: function() {
            // Write your code here for the onHide event.
        },
        onHidden: function() {
            // Write your code here for the onHidden event.
        },
    });
});
```

## 5. Further Information

For further information or to address additional queries, please feel free to open an issue in the repository or contact
the maintainers.
