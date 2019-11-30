/**
 * A higher-order function that makes the function passed as its argument run asynchronously
 * @param {function} fn - function to asynchronify
 * @returns Asynchronous version of the function
 */

const makeAsync = (fn) => (...args) => {
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve(fn(...args))
		}, 0)
	)
}

export default makeAsync
