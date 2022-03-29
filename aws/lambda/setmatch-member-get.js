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

        if (!pathParameters || !pathParameters.band) {
            response.statusCode = 400;
        }
        else {

            const params = { Bucket: 'set-match' };

            if (!pathParameters.member) {
                params.Prefix = `${pathParameters.band}/member`;

                const list = await s3.listObjects(params).promise();
                response.body = JSON.stringify(list.Contents.map(item => item.Key.replace(`${params.Prefix}/`, '')));
            }
            else {
                params.Key = `${pathParameters.band}/member/${pathParameters.member}`;

                const file = await s3.getObject(params).promise();
                response.body = file.Body.toString();
            }
        }

    }
    catch (err) {
        console.error(err);
        response.body = err.message;
        response.statusCode = 500;
    }

    return response;
};
