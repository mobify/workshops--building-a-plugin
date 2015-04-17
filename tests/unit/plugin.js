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

        describe('binding to Zepto\'s fn', function() {
            it('defines seesee in Zepto', function() {
                var seesee = $.fn.seesee;

                expect(seesee).to.be.defined;
            });

            it('defines seesee as a function', function() {
                var seesee = $.fn.seesee;

                expect(seesee).to.be.a('function');
            });
        });

        describe('invoking seesee', function() {
            it('creates seesee instance on $element', function() {
                $element.seesee();

                expect($element.data('seesee')).to.be.defined;
            });

            it('stores $element inside instance', function() {
                $element.seesee();

                expect($element.data('seesee').$element).to.be.defined;
            });
        });
    });
});