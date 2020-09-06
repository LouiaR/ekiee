import * as uuid from 'uuid';
import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function create(event, context, callback) {
	const { imageUrl, content } = JSON.parse(event.body);

	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': true,
	};

	const params = {
		TableName: process.env.TABLE_NAME,
		Item: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: uuid.v1(),
			content,
			imageUrl,
			createdAt: Date.now(),
		},
	};

	const response = (status, res) => ({
		statusCode: status,
		headers: headers,
		body: JSON.stringify(res),
	});

	try {
		const { Item } = await dynamoDb.put(params).params;
		callback(null, response(200, Item));
	} catch (error) {
		callback(null, response(500, { status: false, error }));
	}
}
