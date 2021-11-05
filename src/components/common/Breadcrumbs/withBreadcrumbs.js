import React, { useEffect } from 'react'

import { withContext } from 'Context'

import './style.scss'
import { resetBreadcrumbs, setBreadcrumbs } from 'Actions/appActions'
import PropTypes from 'prop-types'

const withBreadcrumbs = Component => {
	const WrappedComponent = ({ setBreadcrumbs, resetBreadcrumbs, matchForExport, ...props }) => {
		useEffect(() => {
			if (!matchForExport) return () => resetBreadcrumbs()
		}, [])

		return <Component setBreadcrumbs={data => setBreadcrumbs(data)} matchForExport={matchForExport} {...props} />
	}

	WrappedComponent.propTypes = {
		setBreadcrumbs: PropTypes.func.isRequired,
		resetBreadcrumbs: PropTypes.func.isRequired,
		matchForExport: PropTypes.object,
	}

	WrappedComponent.defaultProps = {
		matchForExport: null,
	}

	return withContext(
		([, dispatch]) => ({
			setBreadcrumbs: data => setBreadcrumbs(data, dispatch),
			resetBreadcrumbs: () => resetBreadcrumbs(dispatch),
		}),
		WrappedComponent,
	)
}

export default withBreadcrumbs
