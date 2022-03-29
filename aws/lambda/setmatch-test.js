var AWS = require('aws-sdk');

exports.handler = async (event) => {

    const s3 = new AWS.S3();
    const response = { body: '' };

    try {
        const band = 'prototipo';
        const secret = '123455';

        const params = {
            Bucket: 'set-match',
            Key: `${band}/secret`,
            Body: Buffer.from(secret, 'utf8')
        };

        await s3.putObject(params).promise();
    }
    catch (err) {
        console.error(err);
        response.body = err.message;
    }

    return response;
};
