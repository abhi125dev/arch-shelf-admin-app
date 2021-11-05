import _ from 'lodash'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, Icon } from 'semantic-ui-react'

import { userRoles } from 'Constants/userRoles'

import { withContext } from 'Context/index'
import { SWITCH_DASHBOARD } from 'Mutations/dashboardMutations'
import { profileUpdateAction } from 'Actions/profileActions'
import { GET_USER_ROLES } from 'Queries/dashboardQueries'
import { getAllManagerRoles, isManagerRole } from 'Utils/roles'
import { userGroupRoles } from 'Constants'

const SwitchDashboard = ({ user, changeRole }) => {
	const [switchDashboardLoading, setSwitchDashboardLoading] = useState(false)

	const [switchDashboard] = useMutation(SWITCH_DASHBOARD)
	const { loading, data } = useQuery(GET_USER_ROLES, {
		variables: { id: user.id },
		fetchPolicy: 'network-only',
	})

	if (loading) return null

	const {
		currentAccount: { roles },
		groups,
	} = data.byId

	const changeToLearner = isManagerRole(user.account.role, user.account.roleType)

	const allGroupManagerRoles = getAllManagerRoles()['group']
	const allAccountManagerRoles = getAllManagerRoles()['account']

	const isGroupUser = !_.isEmpty(groups)

	const canBeGroupManager = isGroupUser ? groups.some(item => _.find(allGroupManagerRoles, ['id', item.role])) : false
	const canBeTopLevelManager =
		canBeGroupManager || roles.some(item => _.find(allAccountManagerRoles, ['id', item.role]))

	if (!canBeGroupManager && !canBeTopLevelManager) return null

	const onSwitchDashboard = () => {
		setSwitchDashboardLoading(true)

		switchDashboard()
			.then(({ data }) => {
				if (data)
					changeRole({
						...user,
						account: {
							...user.account,
							role: _.find(isGroupUser ? userGroupRoles : userRoles, [
								'id',
								changeToLearner ? 2 : isGroupUser ? groups[0].role : roles[0].role,
							]).id,
						},
					})
			})
			.finally(() => {
				setSwitchDashboardLoading(false)
			})
	}

	return (
		<div className="actions">
			<Button
				className="switch-role"
				size="large"
				icon
				loading={switchDashboardLoading}
				disabled={switchDashboardLoading}
				onClick={onSwitchDashboard}
			>
				<Icon name="refresh" />
				Switch To {changeToLearner ? 'Learner' : 'Manager'} Dashboard
			</Button>
		</div>
	)
}

SwitchDashboard.propTypes = {
	user: PropTypes.object.isRequired,
	changeRole: PropTypes.func.isRequired,
}

export default withContext(
	([{ user }, dispatch]) => ({
		user,
		changeRole: data => profileUpdateAction(data, dispatch),
	}),
	SwitchDashboard,
)
