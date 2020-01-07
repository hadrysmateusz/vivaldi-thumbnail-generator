exports.handler = function(event, context, callback) {
	const url = event.queryStringParameters.url

	try {
		fetch(url, { mode: "cors" })
			.then((response) => response.blob())
			.then((blob) => {
				callback(null, {
					statusCode: 200,
					body: { image: blob },
					headers: { "Access-Control-Allow-Origin": "*" }
				})
			})
	} catch (error) {
		callback(null, {
			statusCode: 500,
			body: { error }
		})
	}
}
