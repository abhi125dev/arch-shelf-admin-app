import { useCallback, useMemo, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { saveAs } from 'file-saver'
import { getAuthHeaders } from 'Queries/rest/client'

export default (mutation, filters) => {
	const [loading, setLoading] = useState(false)
	const [fetch] = useMutation(mutation)

	const handleExport = useCallback(() => {
		setLoading(true)

		fetch({
			variables: {
				filters,
			},
		})
			.then(({ data }) => {
				const es = new EventSourcePolyfill(
					`${process.env.REACT_APP_API_PATH}/export-sse/${data[Object.keys(data)[0]].id}`,
					{
						headers: getAuthHeaders(),
					},
				)

				es.addEventListener(
					'message',
					event => {
						if (event.data) {
							saveAs(event.data)
							es.close()
							setLoading(false)
						}
					},
					false,
				)

				es.addEventListener(
					'error',
					event => {
						console.error(event)
						es.close()
						setLoading(false)
					},
					false,
				)
			})
			.catch(() => {
				setLoading(false)
			})
	}, [setLoading, fetch, filters])

	return useMemo(() => [handleExport, loading], [handleExport, loading])
}
