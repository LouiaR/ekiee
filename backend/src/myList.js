import handler from './libs/handler';
import dynamoDb from './libs/dynamodb';

export const main = handler(async (evt, context) => {
	const params = {
		TableName: process.env.tableName,
		KeyConditionExpression: 'userId = :userId',
		ExpressionAttributeValues: {
			':userId': evt.requestContext.identity.cognitoIdentityId,
		},
	};

	const result = await dynamoDb.query(params);
	return result.Items;
});
