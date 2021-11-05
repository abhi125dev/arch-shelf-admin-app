import gql from 'graphql-tag'

export const CHANGE_ACCOUNT = gql`
	mutation users($account_id: Int!) {
		changeAccount(account_id: $account_id) {
			id
			name
			photo
			manager_notifications
			role
			roleType
		}
	}
`

export const USER_ADD_SUBJECT = gql`
	mutation users(
		$id: Int!
		$pivot_id: Int
		$subject_id: Int
		$target_completion: String
		$refresh_period: Int
		$update: Boolean
	) {
		syncSubjects(
			id: $id
			subject_id: $subject_id
			pivot_id: $pivot_id
			target_completion: $target_completion
			refresh_period: $refresh_period
			update: $update
		)
	}
`

export const USERS_ACTIONS = gql`
	mutation users($actions: UserActionsInput!, $filters: UserFiltersInput) {
		actions(actions: $actions, filters: $filters)
	}
`
