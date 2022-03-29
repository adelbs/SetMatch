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
        const params = { Bucket: 'set-match', Delimiter: '/' };
        const list = await s3.listObjects(params).promise();
        response.body = JSON.stringify(list.CommonPrefixes.map(item => item.Prefix.replace('/', '')));
    }
    catch (err) {
        console.error(err);
        response.body = err.message;
        response.statusCode = 500;
    }

    return response;
};
