import React from 'react'
import { DefaultToastContainer } from 'react-toast-notifications'

const CustomToast = props => {
	return <DefaultToastContainer style={{ zIndex: 9999 }} {...props} />
}

export { CustomToast }
