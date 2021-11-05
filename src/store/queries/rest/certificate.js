import { get } from './client'

export const downloadCertificate = id => {
	return get(`/certificate/${id}`)
		.then(response => response.json())
		.then(data => {
			if (data.status) {
				window.open(data.url, '_blank')
			} else {
				console.log('Unauthorized, unable to download certificate')
			}
		})
}
