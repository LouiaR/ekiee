export default function handler(lambda) {
	return async function (evt, ctx) {
		let body, statusCode;

		try {
			body = await lambda(evt, ctx);
			statusCode = 200;
		} catch (error) {
			body = { message: error.message };
			statusCode = 500;
		}
		return {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			statusCode,
			body: JSON.stringify(body),
		};
	};
}
