import swaggerAutogen from 'swagger-autogen';
const doc = {
    info: {
        version: '1.0.0',
        title: 'My API',
        description: 'Some description...',
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
    ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    import('./server.js').then(() => {
        console.log('Project root file loaded.');
    });
});
