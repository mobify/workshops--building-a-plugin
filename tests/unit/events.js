define([
    'test-sandbox',
    'text!fixtures/seesee.html'
], function(testSandbox, fixture) {
    var Seesee;
    var $element;
    var $;

    describe('Seesee events', function() {
        var sendKey = function(char) {
            var charCode = char.charCodeAt(0);

            $('body').on('keypress', function(e) {
                $element.val($element.val() + String.fromCharCode(e.which));
                $('body').off('keypress');
            });

            $element.trigger($.Event('keypress', { which: charCode, keyCode: charCode}));
            $element.trigger($.Event('keyup', { which: charCode, keyCode: charCode}));
        };

        beforeEach(function(done) {
            var setUpComplete = function(iFrame$, dependencies) {
                $ = iFrame$;
                Seesee = $.fn.seesee.Constructor;
                $element = $(fixture).appendTo('body');

                done();
            };

            testSandbox.setUp('sandbox', setUpComplete);
        });

        describe('internal events respond correctly', function() {
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
        });
    });
});