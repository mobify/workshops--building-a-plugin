define([
    'test-sandbox',
    'text!fixtures/seesee.html'
], function(testSandbox, fixture) {
    var Seesee;
    var $element;
    var $;

    describe('Seesee plugin', function() {
        beforeEach(function(done) {
            var setUpComplete = function(iFrame$, dependencies) {
                $ = iFrame$;
                Seesee = $.fn.seesee.Constructor;
                $element = $(fixture);

                done();
            };

            testSandbox.setUp('sandbox', setUpComplete);
        });

        describe('initializing seesee', function() {
            it('does not throw when initializing against an element of type input', function() {
                expect(function() {
                    $element.seesee();
                }).to.not.throw();
            });

            it('does throws when not initializing against an element of type input', function() {
                expect(function() {
                    $('<div />').seesee();
                }).to.throw();
            });

            it('sets the correct class on the input', function() {
                var $creditCard = $element.seesee();

                expect($creditCard.hasClass('seesee')).to.be.true;
            });

            it('sets the correct type attribute on the input', function() {
                var $creditCard = $element.seesee();

                expect($creditCard.attr('type')).to.equal('tel');
            });
        });
    });
});