import dynamoDb from './libs/dynamoDB';
import handler from './libs/handler';

export const main = handler(async (evt, ctx) => {
	const params = {
		TableName: process.env.tableName,
		Key: {
			// userId: evt.requestContext.identity.cognitoIdentityId,
			blogId: evt.pathParameters.id,
		},
	};
	const res = await dynamoDb.get(params);
	const userId = evt.requestContext.identity.cognitoIdentityId;
	if (userId === res.Item.userId) {
		return res.Item;
	}
	if (res.Item.published) {
		return res.Item;
	}
	return { message: 'No item match that ID' };
});
