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

            it('correctly defines the typeIdentified event', function() {
                expect(seesee.options.typeIdentified).to.be.a('function');
            });
        });

        describe('creates custom options when options parameter used', function() {
            it('correctly defines typeIdentified event', function() {
                var typeIdentified = function(e, ui) {
                    console.log(ui.type);
                };

                seesee = new Seesee($element, { typeIdentified: typeIdentified });

                expect(seesee.options.typeIdentified).to.equal(typeIdentified);
                expect(seesee.options.typeIdentified).to.be.a('function');
            });
        });
    });
});
