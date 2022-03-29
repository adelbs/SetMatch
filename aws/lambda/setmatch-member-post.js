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
        const body = JSON.parse(event.body);

        if (!pathParameters || !body || !body.secret || !pathParameters.member || !pathParameters.band) {
            response.body = 'missing fields';
            response.statusCode = 400;
        }
        else {
            const file = await s3.getObject({
                Bucket: 'set-match',
                Key: `${pathParameters.band}/secret`
            }).promise();

            const secret = file.Body.toString();
            if (body.secret != secret) {
                response.statusCode = 404;
            }
            // Existing member
            else if (body.kind == 0) {
                try {
                    await s3.headObject({
                        Bucket: 'set-match',
                        Key: `${pathParameters.band}/member/${pathParameters.member}`
                    }).promise();
                }
                catch (error) {
                    response.statusCode = 404;
                }
            }
            // New member
            else if (body.kind == 1) {

                if (!body.name || !body.role) {
                    response.statusCode = 400;
                }
                else {
                    const file = {
                        name: body.name,
                        role: body.role,
                        musics: [],
                        likes: {}
                    };

                    await s3.putObject({
                        Bucket: 'set-match',
                        Key: `${pathParameters.band}/member/${pathParameters.member}`,
                        Body: Buffer.from(JSON.stringify(file), 'utf8')
                    }).promise();
                }
            }
            // Update member
            else if (body.kind == 2) {

                if (!body.name || !body.role || !body.musics || !body.likes) {
                    response.statusCode = 400;
                }
                else {
                    const file = {
                        name: body.name,
                        role: body.role,
                        musics: body.musics,
                        likes: body.likes
                    };

                    await s3.putObject({
                        Bucket: 'set-match',
                        Key: `${pathParameters.band}/member/${pathParameters.member}`,
                        Body: Buffer.from(JSON.stringify(file), 'utf8')
                    }).promise();
                }
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
