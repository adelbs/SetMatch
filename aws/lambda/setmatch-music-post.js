var AWS = require('aws-sdk');

exports.handler = async (event) => {

    const s3 = new AWS.S3();
    const response = {
        statusCode: 200, 
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: ''
    };

    try {
        const pathParameters = event.pathParameters;
        const body = event.body;

        if (!pathParameters || !body || !pathParameters.band || !pathParameters.key) {
            response.statusCode = 400;
        }
        else {
            const params = {
                Bucket: 'set-match',
                Key: `${pathParameters.band}/music/${pathParameters.key}`,
                Body: Buffer.from(body, 'utf8')
            };

            await s3.putObject(params).promise();
        }

    }
    catch (err) {
        console.error(err);
        response.body = err.message;
        response.statusCode = 500;
    }

    return response;
};
