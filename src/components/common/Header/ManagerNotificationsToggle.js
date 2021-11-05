import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Popup } from 'semantic-ui-react'

import { withContext } from 'Context/index'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_PROFILE_MUTATION } from 'Mutations/profileMutations'
import { profileUpdateAction } from 'Actions/profileActions'

const ManagerNotificationsToggle = ({ user, updateProfileSuccess }) => {
	const [loading, setLoading] = useState(false)

	const [updateProfileMutation] = useMutation(UPDATE_PROFILE_MUTATION)

	const switchToggle = useCallback(() => {
		setLoading(true)

		const newValue = !user.account.manager_notifications

		updateProfileMutation({
			variables: {
				id: user.id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				username: user.username,
				manager_notifications: newValue,
			},
		})
			.then(() => {
				updateProfileSuccess({ ...user, account: { ...user.account, manager_notifications: newValue } })
			})
			.finally(() => {
				setLoading(false)
			})
	}, [user])

	return (
		<Popup
			content={`Manager notifications are switched ${user.account.manager_notifications ? 'on' : 'off'}`}
			trigger={
				<Checkbox
					checked={user.account.manager_notifications}
					className="manager-notifications-toggle"
					toggle
					disabled={loading}
					onChange={switchToggle}
				/>
			}
		/>
	)
}

ManagerNotificationsToggle.propTypes = {
	user: PropTypes.object.isRequired,
	updateProfileSuccess: PropTypes.func.isRequired,
}

export default withContext(
	([{ user }, dispatch]) => ({
		user,
		updateProfileSuccess: data => profileUpdateAction(data, dispatch),
	}),
	ManagerNotificationsToggle,
)
