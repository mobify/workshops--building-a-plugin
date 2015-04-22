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
}(function($, Plugin) {
    var classes = {
        SEESEE: 'seesee'
    };

    function Seesee(element, options) {
        Seesee.__super__.call(this, element, options, Seesee.DEFAULTS);
    }

    Seesee.VERSION = '0';

    Seesee.DEFAULTS = {};

    Seesee.classes = {
        INPUT: 'seesee__input'
    };

    Seesee.CARDS = [
        {
            type: 'visa',
            pattern: /^4/,
            format: /(\d{1,4})/g
        },
        {
            type: 'mastercard',
            pattern: /^5[1-5]]/,
            format: /(\d{1,4})/g
        }
    ];

    Plugin.create('seesee', Seesee, {
        _init: function(element) {
            this.$element = $(element);

            if (!this.$element.is('input')) {
                throw new Error('Seesee must be initialized against elements of type input');
            }

            this.$element
                .addClass(classes.SEESEE)
                .attr('type', 'tel');
            this.currentClass = '';

            this._bindEvents();
        },

        destroy: function() {
            this.$element.removeData(this.name);
        },

        _bindEvents: function() {
            this.$element
                .on('keyup', this._formatCard.bind(this))
                .on('keyup', this._checkCard.bind(this));
        },

        _formatCard: function() {
            var type = this._getCardType(this.$element.val());

            if (type) {
                var number = this.$element.val();
                var match = number.match(type.format);

                if (match) {
                    this.$element.val(match.join(' '));
                }
            }
        },

        _checkCard: function() {
            var type = this._getCardType(this.$element.val());

            if (type) {
                this.$element.removeClass(this.currentClass).addClass(type.type);

                this.currentClass = type.type;
            } else {
                this.$element.removeClass(this.currentClass);
            }
        },

        _getCardType: function(number) {
            for (var i = 0, l = Seesee.CARDS.length; i < l; i++) {
                var type = Seesee.CARDS[i];

                if (type.pattern.test(number)) {
                    return type;
                }
            }

            return false;
        }
    });

    return $;
}));
