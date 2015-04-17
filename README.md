# Step 2 - Initialize

Now that our plugin scaffold has been created, let's start adding some functionality. The first step to adding functionality is to define our plugin's structure using the `_init` method. The `_init` method is the entry point to our plugin's construction, and allows us to manipulate the element we've initialized the plugin against.

## Task:

1. We need to ensure we're initializing against an `input` element. To do so, let's add some validation logic into the `_init` function.

  Open up `seesee.js`, and add the following code directly after the `this.$element` assignment in the `_init` function:

  ```js
  _init: function(element) {
      this.$element = $(element);

      if (!this.$element.is('input')) {
          throw new Error('Seesee must be initialized against elements of type input');
      }

      this._bindEvents();
  }
  ```
  
1. Since we're wanting our plugin fully tested, let's add a test to ensure this logic is working as expected. In `tests/plugin.js`, add the following:

  ```js
  describe('initializing seesee', function() {
    it('does not throw when initializing against an element of type input', function() {
      expect(function() {
        $('<input />').seesee();
      }).to.not.throw();
    });
    
    it('does throws when not initializing against an element of type input', function() {
      expect(function() {
        $('<div />').seesee();
      }).to.throw();
    });
  });
  ```

1. The next thing we want to do is force the numeric keypad to display on mobile. To do this, we add an attribute to the input.

  ```js
  _init: function(element) {
      this.$element = $(element);

      if (!this.$element.is('input')) {
          throw new Error('Seesee must be initialized against elements of type input');
      }
      
      this.$element.attr('type', 'tel');

      this._bindEvents();
  }  
  ```
  
1. Let's also write a test to verify this works. Inside `tests/plugin.js` inside the `describe` block you added above add a new test:

  ```js
  it('sets the correct type attribute on the input', function() {
    var $creditCard = $('<input />').seesee();
    
    expect($creditCard.attr('type')).to.equal('tel');
  }
  ```

## Ready to Continue?

Once you're ready to continue, run the following command in your terminal:

```cli
git clean -f && git checkout step-2-
```

Then, follow the directions in that branch's README
