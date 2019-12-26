// extracts the hostname from any url
const getHostname = (url) => {
	return new URL(url).hostname
}

export default getHostname
