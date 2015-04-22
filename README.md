# Step 3 - Bind events

Our plugin needs to respond to events that happen on the element. The first thing we need to do to respond to events is bind them.

Before we add events using `Function.prototype.bind`, and because its support is spotty across all browsers (iOS5 and phantomjs, which we're using for tests), we need to add it. Let's add it now just above the constructor.

```js
/**
 * Function.prototype.bind polyfill required for < iOS6
 */
/* jshint ignore:start */
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}
/* jshint ignore:end */
```

## Task:

1. First, bind a `keypress` event to the element in the `_bindEvents` function. We'll use this to restrict input to numeric values only. 

    ```js
    _bindEvents: function() {
        this.$element
            .on('keypress', this._restrictNumeric.bind(this));
    }
    ```
    
1. Next, bind a `keypress` event. We'll use this to restrict the allowable length.

    ```js
    _bindEvents: function() {
        this.$element
            .on('keypress', this._restrictNumeric.bind(this))
            .on('keypress', this._restrictLength.bind(this));
    }
    ```

1. Next, bind a `keyup` event. We'll use this event to correctly format the card on input. 

    ```js
    _bindEvents: function() {
        this.$element
            .on('keypress', this._restrictNumeric.bind(this))
            .on('keypress', this._restrictLength.bind(this))
            .on('keyup', this._formatCard.bind(this));
    }
    ```
  
1. Next, bind another `keyup` event. We'll use this function to help us identify the card type being entered. We'll decorate the input with a CSS class to indicate its type.

  ```js
    _bindEvents: function() {
        this.$element
            .on('keypress', this._restrictNumeric.bind(this))
            .on('keypress', this._restrictLength.bind(this))
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
