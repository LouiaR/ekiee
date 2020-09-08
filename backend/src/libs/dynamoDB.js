import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default {
	put: (params) => dynamoDb.put(params).promise(),
	get: (params) => dynamoDb.get(params).promise(),
};