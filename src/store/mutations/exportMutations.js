import gql from 'graphql-tag'

export const EXPORT_TRAINING_MATRIX = gql`
	mutation export($filters: TrainingMatrixFilters) {
		createTrainingMatrixExport(filters: $filters) {
			id
		}
	}
`

export const EXPORT_ACTIVITY = gql`
	mutation export($filters: ActivityFiltersInput) {
		createActivityExport(filters: $filters) {
			id
		}
	}
`

export const EXPORT_USERS = gql`
	mutation export($filters: UserFiltersInput) {
		createUsersExport(filters: $filters) {
			id
		}
	}
`
