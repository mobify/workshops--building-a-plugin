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
    });
});
