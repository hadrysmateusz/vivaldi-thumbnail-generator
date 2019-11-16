export const getImageBounds = (canvas) => {
	const ctx = canvas.getContext("2d")
	const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
	let x, y

	let bounds = {
		top: null,
		left: null,
		right: null,
		bottom: null
	}

	// Iterate over every pixel to find the highest
	// and where it ends on every axis ()
	for (let i = 0; i < pixels.data.length; i += 4) {
		if (pixels.data[i + 3] !== 0) {
			x = (i / 4) % canvas.width
			y = ~~(i / 4 / canvas.width)

			if (bounds.top === null) {
				bounds.top = y
			}

			if (bounds.left === null) {
				bounds.left = x
			} else if (x < bounds.left) {
				bounds.left = x
			}

			if (bounds.right === null) {
				bounds.right = x
			} else if (bounds.right < x) {
				bounds.right = x
			}

			if (bounds.bottom === null) {
				bounds.bottom = y
			} else if (bounds.bottom < y) {
				bounds.bottom = y
			}
		}
	}

	return bounds
}

export const gcd = (p, q) => {
	return q === 0 ? p : gcd(q, p % q)
}

export const getRatio = (a, b) => {
	const _gcd = gcd(a, b)
	return { value: a / b, divident: a / _gcd, divisor: b / _gcd }
}
