require.config({
    baseUrl: '../',
    paths: {
        'text': 'bower_components/requirejs-text/text',
        '$': 'lib/zeptojs/dist/zepto',
        'plugin': 'bower_components/plugin/dist/plugin',
        'seesee': 'src/js/seesee'
    },
    'shim': {
        '$': {
            exports: '$'
        }
    }
});
