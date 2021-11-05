export function getAuthHeaders() {
	const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

	const account = user.account ? user.account : null

	if (!user && !account) return {}

	return {
		Authorization: 'Bearer ' + user.token,
		accountId: account.id,
	}
}

function getUrl(url) {
	return process.env.REACT_APP_API_PATH + url
}

export const get = url => {
	return fetch(getUrl(url), {
		method: 'GET',
		headers: new Headers({
			...getAuthHeaders(),
		}),
	})
}
