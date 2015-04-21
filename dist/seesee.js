(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            '$',
            'plugin'
        ], factory);
    } else {
        var framework = window.Zepto || window.jQuery;
        factory(framework, window.Plugin);
    }
}(function($, Plugin, CC) {
    function Seesee(element, options) {
        Seesee.__super__.call(this, element, options, Seesee.DEFAULTS);
    }

    Seesee.VERSION = '0.0.1';

    Seesee.DEFAULTS = {};

    Seesee.classes = {
        INPUT: 'seesee__input'
    };

    Seesee.CARDS = [
        { type: 'visa', pattern: /^4/ },
        { type: 'mastercard', pattern: /^5[1-5]]/ },
        { type: 'amex', pattern: /^3[47]/ }
    ];

    Plugin.create('seesee', Seesee, {
        _init: function(element) {
            this.$element = $(element);

            if (!this.$element.is('input')) {
                throw new Error('Seesee must be initialized against elements of type input');
            }

            this.$element
                .addClass(Seesee.classes.INPUT)
                .attr('type', 'tel');
            this.currentClass = '';

            this._bindEvents();
        },

        destroy: function() {
            this.$element.removeData(this.name);
        },

        _bindEvents: function() {
            this.$element
                .on('keyup', this._checkCard.bind(this));
        },

        _checkCard: function() {
            var type = this._getCardType(this.$element.val());

            if (type) {
                this.$element.removeClass(this.currentClass).addClass(type);

                this.currentClass = type;
            } else {
                this.$element.removeClass(this.currentClass);
            }
        },

        _getCardType: function(number) {
            for (var i = 0, l = Seesee.CARDS.length; i < l; i++) {
                var type = Seesee.CARDS[i];

                if (type.pattern.test(number)) {
                    return type.type;
                }
            }

            return false;
        }
    });

    return $;
}));
