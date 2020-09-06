import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function lists(event, context, callback) {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': true,
	};

	const params = {
    TableName: process.env.TABLE_NAME,
	};

	const response = (status, res) => ({
		statusCode: status,
		headers: headers,
		body: JSON.stringify(res),
	});

	try {
		const {Items } = await dynamoDb.scan(params).promise();
		callback(null, response(200, Items));
	} catch (error) {
		callback(null, response(500, { status: false, error }));
	}
}
