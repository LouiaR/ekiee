import handler from './libs/handler';
import dynamoDb from './libs/dynamoDB';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

	const params = {
		TableName: process.env.tableName,
		Key: {
			userId: event.requestContext.identity.cognitoIdentityId,
			blogId: event.pathParameters.id,
		},
		UpdateExpression:
			'SET body = :body, imageUrl = :imageUrl, published = :published, title = :title',
		ExpressionAttributeValues: {
			':imageUrl': data.imageUrl || null,
			':body': data.body || null,
			':published': data.published || false,
			':title': data.title || null,
		},
		ReturnValues: 'ALL_NEW',
	};
	await dynamoDb.update(params);
	return { status: true };
});
