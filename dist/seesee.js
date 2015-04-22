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

    var cards = [
        {
            type: 'visa',
            pattern: /^4/,
            format: /(\d{1,4})/g,
            maxLength: 16
        },
        {
            type: 'mastercard',
            pattern: /^5[1-5]]/,
            format: /(\d{1,4})/g,
            maxLength: 16
        }
    ];

    function Seesee(element, options) {
        Seesee.__super__.call(this, element, options, Seesee.DEFAULTS);
    }

    Seesee.VERSION = '0.0.1';

    Seesee.DEFAULTS = {};

    Seesee.classes = {
        INPUT: 'seesee__input'
    };

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
                .on('keypress', this._restrictNumeric.bind(this))
                .on('keyup', this._formatCard.bind(this))
                .on('keyup', this._identifyType.bind(this));
        },

        _restrictNumeric: function(e) {
            if (e.metaKey || e.ctrlKey || e.which === 0 || e.which < 33) {
                return true;
            }

            if (e.which === 32) {
                return false;
            }

            return !!/[\d\s]/.test(String.fromCharCode(e.which));
        },

        _formatCard: function() {
            var number = this.$element.val();
            var type = this._getCardType(number);

            if (type) {
                var match = number.match(type.format);

                if (match) {
                    this.$element.val(match.join(' '));
                }
            } else {
                this.$element.val(number);
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

        _getCardType: function(number) {
            for (var i = 0, l = cards.length; i < l; i++) {
                var type = cards[i];

                if (type.pattern.test(number)) {
                    return type;
                }
            }

            return false;
        }
    });

    return $;
}));
