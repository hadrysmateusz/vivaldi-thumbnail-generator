export const gcd = (p, q) => {
	return q === 0 ? p : gcd(q, p % q)
}

export const getRatio = (a, b) => {
	const _gcd = gcd(a, b)
	return { value: a / b, divident: a / _gcd, divisor: b / _gcd }
}

export default getRatio
