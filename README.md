# Step 3 - Bind events

Our plugin needs to respond to events that happen on the element. The first thing we need to do to respond to events is bind them.

## Task:

1. Bind a `keyup` event to the element in the `_bindEvents` function.

  ```js
  _bindEvents: function() {
      this.$element
          .on('keyup', this._checkCard.bind(this));
  }
  ```
  
1. And also add a stub for the `_checkCard` function.

  ```js
  _checkCard: function() {
    console.log('checking card!');
  }
  ```

## Ready to Continue?

Once you're ready to continue, run the following command in your terminal:

```cli
git clean -f && git checkout step-4-respond-to-event
```

Then, follow the directions in that branch's [README]()
