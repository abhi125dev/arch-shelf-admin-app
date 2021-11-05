import { useState } from 'react'
import { exportClient } from '../store'

const useCsvImport = (query, variables, exportType) => {
	const [loading, setLoading] = useState(false)

	const runCallback = () => {
		setLoading(true)
		return exportClient
			.query({
				query: query,
				variables: Object.assign(variables, { export_type: exportType }),
				fetchPolicy: 'network-only',
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return [runCallback, { loading }]
}

export default useCsvImport
