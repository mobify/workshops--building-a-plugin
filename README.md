# Step 4 - Respond to events

Now that we've bound our events, we need to respond to them when we receive user input. 

## Task:

1. We need some credit card data for use when masking and validating our input. Let's add a new object containing that credit card data. Let's add this just below the `classes` variable.

    ```js
    var cards = [
        {
            type: 'visa',
            pattern: /^4/,
            format: /(\d{1,4})/g,
            maxLength: 16
        },
        {
            type: 'mastercard',
            pattern: /^5[1-5]/,
            format: /(\d{1,4})/g,
            maxLength: 16
        }
    ];
    ```
    
    We're only defining data for two cards. Of course we can add more if we want to validate more cards.
    
1. Next, let's add a function that allows us to retrieve the card type during masking and validating.

    ```js
    _getCardType: function(number) {
        for (var i = 0, l = cards.length; i < l; i++) {
            var type = cards[i];

            if (type.pattern.test(number)) {
                return type;
            }
        }

        return false;
    }
    ```
    
1. Finally, we want to fill in the bodies of the functions we'd defined as event handlers. Let's add that now.

    ```js
    _restrictNumeric: function(e) {
        if (e.metaKey || e.ctrlKey || e.which === 0 || e.which < 33) {
            return true;
        }

        if (e.which === 32) {
            return false;
        }

        return !!/[\d\s]/.test(String.fromCharCode(e.which));
    },

    _restrictLength: function(e) {
        var digit = String.fromCharCode(e.which);
        var number = this.$element.val().replace(/\s/g, '') + digit;
        var type = this._getCardType(number);

        return number.length <= type.maxLength;
    },

    _formatCard: function() {
        var number = this.$element.val();
        var type = this._getCardType(number);

        if (type) {
            var match = number.match(type.format);

            if (match) {
                this.$element.val(match.join(' '));
            }
        }
    },

    _identifyType: function() {
        var type = this._getCardType(this.$element.val());

        if (type) {
            this.$element.removeClass(this.currentClass).addClass(type.type);

            this.currentClass = type.type;
        } else {
            this.$element.removeClass(this.currentClass);
        }
    },
    ```
    
    Notice that because we've bound the context of these functions to the plugin instance using `.bind(this)` in `_bindEvents`, we can now access any methods the plugin instance has. This is useful as it allows us to keep our code clean and doesn't require us to pass data as parameters in our code.

## Ready to Continue?

Once you're ready to continue, run the following command in your terminal:

```cli
git clean -f && git checkout step-5-options
```

Then, follow the directions in that branch's README
