const ReImg = {
	OutputProcessor: function(encodedData) {
		var isPng = function() {
			return encodedData.indexOf("data:image/png") === 0
		}

		var downloadImage = function(data, filename) {
			var a = document.createElement("a")
			a.href = data
			a.download = filename
			document.body.appendChild(a)
			a.click()
		}

		return {
			toBase64: function() {
				return encodedData
			},
			toImg: function() {
				var imgElement = document.createElement("img")
				imgElement.src = encodedData
				return imgElement
			},
			toPng: function() {
				if (isPng()) {
					var img = document.createElement("img")
					img.src = encodedData
					return img
				}

				this.toCanvas(function(canvas) {
					var img = document.createElement("img")
					img.src = canvas.toDataURL()
					return img
				})
			},
			download: function(filename) {
				filename = filename || "image.png"
				if (isPng()) {
					// it's a canvas already
					downloadImage(encodedData, filename)
					return
				}

				// convert to canvas first
				this.toCanvas(function(canvas) {
					downloadImage(canvas.toDataURL(), filename)
				})
			}
		}
	},

	fromCanvas: function(canvasElement) {
		var dataUrl = canvasElement.toDataURL()
		return new this.OutputProcessor(dataUrl)
	}
}

export default ReImg
