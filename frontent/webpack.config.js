module.exports = {
    resolve: {
        fallback: {
            http: require.resolve('http-browserify'),
            https: require.resolve('https-browserify'),
            url: require.resolve('url'),
            stream: require.resolve('stream-browserify'),
        },
    },
};
