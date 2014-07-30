Notifications.js
================

##### Ver 1.1.0

Notifications.js is a lightweight addon for jQuery, there is now one without jQuery, which enables you to easily create notifications that will be visible on the bottom
right of the screen. Each notification has a flat and simple design which can be easily changed and includes a sleek animation.

### Browser Support
As far as I know Notifications.js supports the following browsers:
+ IE 8+
+ Chrome
+ Safari
+ Opera
+ Firefox

If there are any problems please file an issue.

### Installation
To install Notifications.js you will need `jQuery 1.10.2+`, `notifications.min.js` and `notifications.min.css`. Now include the following line inside the head of your document.
**Note: If using the version without jQuery then `jQuery` is not required and instead you need `notifications-nojquery.min.js` and `notifications-nojquery.min.css` **

```
<link rel="stylesheet" href="path/to/notifications.min.css">
```

Then include the following line before you closing body tag

```
<script src="path/to/notifications.min.js">
```

### Usage
To use Notifications.js you simply need to call it as a function. Below is what you need.

```javascript
displayNotification(type, content, showTime);
```

- __Type -__ This is the type of notification; error, success, warning or info. You can create your own statuses by creating the css for it using notification-nameOfYouStatus then replacing the type with nameOfYourStatus. This will then apply your styles instead.
- __Content -__ In here place the content you would like to be displayed. __NOTE: Keep it short because it is a notification so the plugin cuts any text out that is too long.__
- __showTime -__ The length you would like to notification to be displayed in seconds. E.G. 5000 = 5 seconds.

### Example Usage
You can add the function inside a on click event. This example is using jQuery but the same applies if using vanilla `addEventListener` Like so:

```javascript
$('#showError').on('click', function(e) { 
    displayNotification('error', 'This is an error notification', 2000); 
    e.preventDefault(); 
});
```

Example usage when calling the notification from a custom function

```javascript
function onLogin() {
    displayNotification('success', 'You have successfully logged in', 2000);
}
```

### Feature Request & Contribution
If you would like to request a feature, fix or change then please post an issue on the github page. You can also contribute to this project by forking on github, make your changes and then publish a pull request.
