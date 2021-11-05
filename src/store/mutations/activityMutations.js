import gql from 'graphql-tag'

export const ACTIVITY_ACTIONS = gql`
	mutation users($actions: ActivityActionsInput!, $filters: ActivityFiltersInput) {
		activityActions(actions: $actions, filters: $filters)
	}
`
