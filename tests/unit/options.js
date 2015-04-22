define([
    'test-sandbox',
    'text!fixtures/seesee.html'
], function(testSandbox, fixture) {
    var Seesee;
    var seesee;
    var $element;
    var $;

    describe('Seesee options', function() {
        beforeEach(function(done) {
            var setUpComplete = function(iFrame$, dependencies) {
                $ = iFrame$;
                Seesee = $.fn.seesee.Constructor;
                $element = $(fixture);

                done();
            };

            testSandbox.setUp('sandbox', setUpComplete);
        });

        describe('creates default options when no options parameter not used', function() {
            beforeEach(function() {
                seesee = new Seesee($element);
            });

            it('correctly defines the identified event', function() {
                expect(seesee.options.identified).to.be.a('function');
            });
        });

        describe('creates custom options when options parameter used', function() {
            it('correctly defines identified event', function() {
                var identified = function() {
                    console.log('I\'m identified!')
                };

                seesee = new Seesee($element, { identified: identified });

                expect(seesee.options.identified).to.equal(identified);
                expect(seesee.options.identified).to.be.a('function');
            });
        });
    });
});
