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
    
1. Additionally, we want to fill in the bodies of the functions we'd defined as event handlers. Let's add that now.

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
    
1. Things wouldn't be complete without us writing some tests. Let's write some tests to simulate events. Let's open `tests/unit/events.js` so that we can add some tests to it.

    First, we need to ensure our element is appended correctly to the DOM. This is a critical step in testing events. We need to change our `beforeEach` call to the following:
    
    ```js
    beforeEach(function(done) {
        var setUpComplete = function(iFrame$, dependencies) {
            $ = iFrame$;
            Seesee = $.fn.seesee.Constructor;
            $element = $(fixture).appendTo('body');

            done();
        };

        testSandbox.setUp('sandbox', setUpComplete);
    });
    ```
    Pay special attention to this line: `$element = $(fixture).appendTo('body');`. We've ensured our element is attached to the DOM, so any events triggered will correctly bubble. 

    Second, we'll need a helper function that allows us to simulate typing keys. Simulating events in unit tests is tricky. Merely triggering an event isn't enough because the character that is propagated through the event is never actually appended to the value of the input field. Also, just appending the character manually to the input field is an option, but doesn't reflect the true behavior of the browser. 
    
    Because our `keypress` events return either `true` or `false`, they allow the event to either bubble or not. In simpler terms, if our `keypress` handler returns `true`, the character typed would be appended to the value of the input field. If the handler returns `false`, bubbling would be cancelled and the character would not be appended. 
    
    To mimic this, we attach a `keypress` handler to the `body` of the page. If the event bubbles, we know our handler evaluated to `true`, and allowed the event to propagate up the DOM. This is akin to a `keypress` allowing a character to be typed in the input. So, we append that character ourselves to mimic the browser behavior.  

    ```js
    var sendKey = function(char) {
        var charCode = char.charCodeAt(0);

        $('body').on('keypress', function(e) {
            $element.val($element.val() + String.fromCharCode(e.which));
            $('body').off('keypress');
        });

        $element.trigger($.Event('keypress', { which: charCode, keyCode: charCode}));
        $element.trigger($.Event('keyup', { which: charCode, keyCode: charCode}));
    };    
    ```

1. Finally, we'll want to write our unit tests.

    ```js
    it('restricts length of input', function() {
        $element.seesee();

        $element.val('4500 0000 0000 0000');
        sendKey('0');

        expect($element.val()).to.equal('4500 0000 0000 0000');
    });

    it('restricts type of input to numeric', function() {
        $element.seesee();

        $element.val('4500');
        sendKey('f');

        expect($element.val()).to.equal('4500');
    });

    it('allows numeric input', function() {
        $element.seesee();

        $element.val('4500');
        sendKey('0');

        expect($element.val()).to.equal('4500 0');
    });

    it('correctly formats card', function() {
        $element.seesee();

        $element.val('450000000000000');
        sendKey('0');

        expect($element.val()).to.equal('4500 0000 0000 0000');
    });

    it('correctly identifies visa card type and sets class', function() {
        $element.seesee();

        $element.val('450000000000000');
        sendKey('0');

        expect($element.hasClass('visa')).to.be.true;
    });

    it('correctly identifies mastercard card type and sets class', function() {
        $element.seesee();

        $element.val('540000000000000');
        sendKey('0');

        expect($element.hasClass('mastercard')).to.be.true;
    });

    it('correctly ignores unrecognized card types', function() {
        $element.seesee();

        $element.val('770000000000000');
        sendKey('0');

        expect($element.hasClass('visa')).to.be.false;
        expect($element.hasClass('mastercard')).to.be.false;
    });
    ```
    
    Run the tests using `grunt test` and ensure they all pass.

## Ready to Continue?

Once you're ready to continue, run the following command in your terminal:

```cli
git clean -f && git checkout step-5-options
```

Then, follow the directions in that branch's [README](https://github.com/mobify/workshops--building-a-plugin/blob/step-5-options/README.md)
