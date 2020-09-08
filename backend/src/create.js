import * as uuid from 'uuid';

import dynamoDb from './libs/dynamoDB';
import handler from './libs/handler';

export const main = handler(async (evt, ctx) => {
	const { title, body, imageUrl, published = false } = JSON.parse(evt.body);

	const params = {
		TableName: process.env.tableName,
		Item: {
			userId: evt.requestContext.identity.cognitoIdentityId,
			blogId: uuid.v1(),
			title,
			body,
			imageUrl,
			published,
		},
	};

	await dynamoDb.put(params);
	return params.Item;
});
