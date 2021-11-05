import { MANAGER_TYPE, REVIEWER_TYPE, NO_SECTION_SIGN_OFF_TYPE, LEARNER_TYPE } from 'Constants'

const userGroupRoles = [
	{
		id: 1,
		role: 'Manager',
		type: [MANAGER_TYPE],
	},
	{
		id: 2,
		role: 'Learner',
		type: [LEARNER_TYPE],
	},
	{
		id: 3,
		role: 'Reporting Manager',
		type: [MANAGER_TYPE, REVIEWER_TYPE, NO_SECTION_SIGN_OFF_TYPE],
	},
	{
		id: 4,
		role: 'Reviewer sign off',
		type: [MANAGER_TYPE, REVIEWER_TYPE],
	},
]

export { userGroupRoles }
