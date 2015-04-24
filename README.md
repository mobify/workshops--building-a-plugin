# Step 6 - Styling

It would be great if our credit card input gave us some visual indication of a card being identified. Let's make that happen. 

## Task:

1. First, let's add some SASS variables. Open `src/style/seesee.scss` and add the following variables.

    ```scss
    $font-size: 18px;
    $leading-ratio: 1.5;
    $line-height: $font-size * $leading-ratio;
    $border-color: #BBB;
    ```

1. Next, let's add some basic styling for `seesee`'s input. 

  Add the following to the `.seesee` selector.
  
    ```scss
    .seesee {
        display: block;
    
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: $font-size;
    
        width: 100%;
        height: 40px;
        padding: 10px 15px;
        border: 1px solid $border-color;
    
        border-radius: 4px;
    
        background-color: #fff;
    
        line-height: $line-height;
    
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-appearance: none;
    
        &::-webkit-input-placeholder {
            color: #888;
        }
    
        &:active {
            border-color: darken($border-color, 10);
        }
    
        &:focus {
            border-color: #16a085;
        }
    }
    ```

1. Finally, we want to add specific styles for the input once the card has been identified. Add the following below the above CSS.

    ```scss
    @each $cardType in visa, mastercard {
        .seesee--#{$cardType} {
            background: url('../../dist/i/#{$cardType}.png') no-repeat 98% 50%;
        }
    }
    ```
    
    Now, when we type into our input and the card is identified, we'll get a nice icon representing the card type at the end of the input.

## Ready to Continue?

Once you're ready to continue, run the following command in your terminal:

```cli
git clean -f && git checkout . && git checkout step-7-finished && npm install && bower install
```

Then, follow the directions in that branch's [README](https://github.com/mobify/workshops--building-a-plugin/blob/step-7-finished/README.md)
