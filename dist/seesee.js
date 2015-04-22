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

        },

        _formatCard: function() {

        },

        _identifyType: function() {

        }
    });

    return $;
}));
