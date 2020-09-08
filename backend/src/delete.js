import handler from './libs/handler';
import dynamoDb from './libs/dynamoDB';

export const main = handler(async (event, context) => {
	const params = {
		TableName: process.env.tableName,
		Key: {
			userId: event.requestContext.identity.cognitoIdentityId,
			blogId: event.pathParameters.id,
		},
	};
	await dynamoDb.delete(params);
	return { status: true };
});
