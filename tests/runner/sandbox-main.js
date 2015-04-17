
require(['sandbox-config'], function() {
    require([
        '$',
    
        'plugin',
        'seesee'
    ],
        function(
            $
    ) {

            var dependencies = {};

            dependencies.$ = $;

            window.dependencies = dependencies;

            window.parent.postMessage('loaded', '*');
        });
});
