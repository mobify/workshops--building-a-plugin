
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        factory();
    }
}(function() {
    var CC = {};
    var defaultFormat = /(\d{1,4})/g;

    var cards = CC.cards = [
        {
            type: 'visa',
            pattern: /^4/,
            format: defaultFormat,
            length: [13, 16],
            cvcLength: [3],
            luhn: true
        }, {
            type: 'mastercard',
            pattern: /^5[0-5]/,
            format: defaultFormat,
            length: [16],
            cvcLength: [3],
            luhn: true
        }, {
            type: 'amex',
            pattern: /^3[47]/,
            format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
            length: [15],
            cvcLength: [3, 4],
            luhn: true
        }
    ];

    CC.restrictNumeric = function(e) {
        var input;
        if (e.metaKey || e.ctrlKey) {
            return true;
        }
        if (e.which === 32) {
            return false;
        }
        if (e.which === 0) {
            return true;
        }
        if (e.which < 33) {
            return true;
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    };

    var cardFromNumber = CC.cardFromNumber = function(num) {
        var card;

        num = (num + '').replace(/\D/g, '');

        for (var i = 0, len = cards.length; i < len; i++) {
            card = cards[i];

            if (card.pattern.test(num)) {
                return card;
            }
        }
    };

    /*jshint ignore:start */
    CC.formatCardNumber = function(e) {
        var $target;
        var card;
        var digit;
        var length;
        var re;
        var upperLength;
        var value;

        digit = String.fromCharCode(e.which);

        if (!/^\d+$/.test(digit)) {
            return;
        }

        $target = $(e.currentTarget);
        value = $target.val();
        card = cardFromNumber(value + digit);
        length = (value.replace(/\D/g, '') + digit).length;
        upperLength = 16;

        if (card) {
            upperLength = card.length[card.length.length - 1];
        }

        if (length >= upperLength) {
            return;
        }

        if (($target.prop('selectionStart') !== null) && $target.prop('selectionStart') !== value.length) {
            return;
        }

        if (card && card.type === 'amex') {
            re = /^(\d{4}|\d{4}\s\d{6})$/;
        } else {
            re = /(?:^|\s)(\d{4})$/;
        }

        if (re.test(value)) {
            e.preventDefault();
            return setTimeout(function() {
                return $target.val(value + ' ' + digit);
            });
        } else if (re.test(value + digit)) {
            e.preventDefault();
            return setTimeout(function() {
                return $target.val(value + digit + ' ');
            });
        }
    };
    /*jshint ignore:end */

    CC.restrictCardNumber = function(e) {
        var $target;
        var card;
        var digit;
        var value;

        $target = $(e.currentTarget);
        digit = String.fromCharCode(e.which);
        if (!/^\d+$/.test(digit)) {
            return;
        }
        if (hasTextSelected($target)) {
            return;
        }
        value = ($target.val() + digit).replace(/\D/g, '');
        card = cardFromNumber(value);
        if (card) {
            return value.length <= card.length[card.length.length - 1];
        } else {
            return value.length <= 16;
        }
    };

    CC.reFormatCardNumber = function(e) {
        return setTimeout(function() {
            var $target;
            var value;

            $target = $(e.currentTarget);
            value = $target.val();
            value = CC.formatCardNumber(value);
            return $target.val(value);
        });
    };

    CC.setCardType = function(e) {
        var $target, allTypes, card, cardType, val;
        $target = $(e.currentTarget);
        val = $target.val();
        cardType = $.payment.cardType(val) || 'unknown';
        if (!$target.hasClass(cardType)) {
            allTypes = (function() {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = cards.length; _i < _len; _i++) {
                    card = cards[_i];
                    _results.push(card.type);
                }
                return _results;
            })();
            $target.removeClass('unknown');
            $target.removeClass(allTypes.join(' '));
            $target.addClass(cardType);
            $target.toggleClass('identified', cardType !== 'unknown');
            return $target.trigger('payment.cardType', cardType);
        }
    };

    /* jshint ignore:start */
    var hasTextSelected = CC.hasTextSelected = function($target) {
        var _ref;
        if (($target.prop('selectionStart') !== null) && $target.prop('selectionStart') !== $target.prop('selectionEnd')) {
            return true;
        }
        if ((typeof document != 'undefined' && document !== null ? (_ref = document.selection) != null ? _ref.createRange : void 0 : void 0) != null) {
            if (document.selection.createRange().text) {
                return true;
            }
        }
        return false;
    };
    /* jshint ignore:end */

    window.CC = CC;

    return CC;
}));
