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
                    $('<input />').seesee();
                }).to.not.throw();
            });

            it('does throws when not initializing against an element of type input', function() {
                expect(function() {
                    $('<div />').seesee();
                }).to.throw();
            });
        });
    });
});