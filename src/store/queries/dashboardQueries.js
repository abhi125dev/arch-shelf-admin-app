import gql from 'graphql-tag'

export const GET_MANAGER_DASHBOARD = gql`
	query dashboard($limit: Int) {
		manager(limit: $limit) {
			nearing_completion
			learners_overdue
			learners_in_progress
		}
	}
`

export const GET_LEARNER_DASHBOARD = gql`
	query dashboard {
		learner {
			courses_current
			courses_planned
			courses_completed
			courses_optional
		}
	}
`

export const GET_USER_ROLES = gql`
	query users($id: Int!) {
		byId(id: $id) {
			key
			id
			currentAccount {
				roles {
					role
				}
			}
			groups {
				name
				role
			}
		}
	}
`

export const GET_USER_INFO = gql`
	query users($id: Int!) {
		byId(id: $id) {
			id
			currentAccount {
				name
				is_account_owner
				is_zoho_connected
			}
			groups {
				name
				role
			}
			lastViewedSubject {
				id
				pivot_id
				name
				description
				short_description
				img
				target_completion
				progress
				last_viewed {
					id
					name
				}
			}
		}
	}
`
