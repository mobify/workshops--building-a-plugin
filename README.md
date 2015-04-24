# Step 5 - Options

Often we want our plugins to take configuration values for things that may want to be changed by the user. This can include responding to events in a custom way. To accomodate this we allow our plugins to take options. 

Let's add a few options to our plugin. 

## Task:

1. Add a config option that exposes an event called `typeIdentified`. This event will fire once the card is identified by its type. To do this, we add the option for the event to the default options object and initialize it to `$.noop`. 

    ```js
    Seesee.DEFAULTS = {
        typeIdentified: $.noop
    };
    ```
    
    The reason we initialize it to the `$.noop` function is so that we can avoid unnecessary logic to test whether the property is defined before it's called. 
    
1. Once we define our event in the default options, it will be available to use through `this.options`. The plugin factory conveniently sets this member for you when the plugin is constructed. Let's invoke this event when the credit card is identified.

    In the `_identifyType` function, we can use the `_trigger` function to invoke our event. 

    ```js
    _identifyType: function() {
        var type = this._getCardType(this.$element.val());

        if (type) {
            this.$element.removeClass(this.currentClass).addClass(type.type);
            
            this._trigger('typeIdentified', { type: type });

            this.currentClass = type.type;
        } else {
            this.$element.removeClass(this.currentClass);
        }
    },
    ```

    Now, if someone initializes their plugin with the `typeIdentified` event, it will be invoked once the card type is identified. You'll notice that the second parameter to `_trigger` is an object. This object is arbitrary data that you can pass to your event handler. 
    
    Here's an example:
    
    ```js
    $('input').seesee({
        typeIdentified: function(e, ui) {
            console.log(ui.type);
        }
    });
    ```
    
1. Of course, we need to write some tests now. We're going to write some tests to validate the options, but also to test whether the event works. Let's do the former first.

    In `tests/unit/options.js`, add the following tests.

    ```js
    describe('creates default options when no options parameter not used', function() {
        beforeEach(function() {
            seesee = new Seesee($element);
        });

        it('correctly defines the typeIdentified event', function() {
            expect(seesee.options.typeIdentified).to.be.a('function');
        });
    });

    describe('creates custom options when options parameter used', function() {
        it('correctly defines typeIdentified event', function() {
            var typeIdentified = function() {
                console.log('I\'m typeIdentified!')
            };

            seesee = new Seesee($element, { typeIdentified: typeIdentified });

            expect(seesee.options.typeIdentified).to.equal(typeIdentified);
            expect(seesee.options.typeIdentified).to.be.a('function');
        });
    });
    ```
    
1. Now let's add some tests to validate the event works. In `tests/unit/events.js`, add the following tests.

    ```js
    describe('options events respond correctly', function() {
        it('correctly invokes the typeIdentified event', function(done) {
            $element.seesee({
                typeIdentified: function() {
                    done();
                }
            });

            $element.val('450000000000000');
            sendKey('0');
        });

        it('passes data to the typeIdentified event', function(done) {
            $element.seesee({
                typeIdentified: function(e, ui) {
                    expect(ui.type.type).to.equal('visa');
                    done();
                }
            });

            $element.val('450000000000000');
            sendKey('0');
        });
    });
    ```
    
    Run `grunt test` and ensure your tests are passing.

## Ready to Continue?

Once you're ready to continue, run the following command in your terminal:

```cli
git clean -f && git checkout step-6-styling
```

Then, follow the directions in that branch's [README](https://github.com/mobify/workshops--building-a-plugin/blob/step-6-styling/README.md)
