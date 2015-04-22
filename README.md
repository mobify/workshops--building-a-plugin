# Step 3 - Bind events

Our plugin needs to respond to events that happen on the element. The first thing we need to do to respond to events is bind them.

## Task:

1. First, bind a `keypress` event to the element in the `_bindEvents` function. We'll use this to restrict input to numeric values only. 

    ```js
    _bindEvents: function() {
        this.$element
            .on('keypress', this._restrictNumeric.bind(this));
    }
    ```

1. Next, bind a `keyup` event. We'll use this event to correctly format the card on input. 

    ```js
    _bindEvents: function() {
        this.$element
            .on('keypress', this._restrictNumeric.bind(this))
            .on('keyup', this._formatCard.bind(this));
    }
    ```
  
1. Next, bind another `keyup` event. We'll use this function to help us identify the card type being entered. We'll decorate the input with a CSS class to indicate its type.

  ```js
    _bindEvents: function() {
        this.$element
            .on('keypress', this._restrictNumeric.bind(this))
            .on('keyup', this._formatCard.bind(this))
            .on('keyup', this._identifyType.bind(this));
    }
  ```
  
1. And also add a stub for the `_formatCard` and check `_checkCard` functions.

  ```js
    _restrictNumeric: function() {
    },
    
    _formatCard: function() {
    },
    
    _identifyType: function() {
    }
  ```

## Ready to Continue?

Once you're ready to continue, run the following command in your terminal:

```cli
git clean -f && git checkout step-4-respond-to-events
```

Then, follow the directions in that branch's [README](https://github.com/mobify/workshops--building-a-plugin/blob/step-4-respond-to-events/README.md)
