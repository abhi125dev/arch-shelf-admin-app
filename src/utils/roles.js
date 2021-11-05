import { userRoles } from 'Constants/userRoles'
import { userGroupRoles } from 'Constants/userGroupRoles'
import _ from 'lodash'
import { LEARNER_TYPE, MANAGER_TYPE, REVIEWER_TYPE, NO_SECTION_SIGN_OFF_TYPE } from 'Constants'

export const allRoles = {
	account: userRoles,
	group: userGroupRoles,
}

export const isLearnerRole = (roleId, roleType) => isRoleType(getAllLearnerRoles(), roleId, roleType)

export const isManagerRole = (roleId, roleType) => isRoleType(getAllManagerRoles(), roleId, roleType)

export const isReviewerRole = (roleId, roleType) => isRoleType(getAllReviewerRoles(), roleId, roleType)

export const isNoSignOffRole = (roleId, roleType) => isRoleType(getNoSignOffRoles(), roleId, roleType)

export const getNoSignOffRoles = () => {
	return filterRoleByType(NO_SECTION_SIGN_OFF_TYPE)
}
export const getAllManagerRoles = () => {
	return filterRoleByType(MANAGER_TYPE)
}

export const getAllReviewerRoles = () => {
	return filterRoleByType(REVIEWER_TYPE)
}

export const getAllLearnerRoles = () => {
	return filterRoleByType(LEARNER_TYPE)
}

const filterRoleByType = neededType => {
	const filteredRoles = _.cloneDeep(allRoles)
	for (const type in filteredRoles) {
		filteredRoles[type] = filteredRoles[type].filter(role => {
			return role.type.includes(neededType)
		})
	}

	return filteredRoles
}

const isRoleType = (correctRoles, roleId, roleType) => {
	return !!_.find(correctRoles[roleType], ['id', roleId])
}
