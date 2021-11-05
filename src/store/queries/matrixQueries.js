import gql from 'graphql-tag'

export const GET_USERS_MATRIX_DATA = gql`
	query users($filters: TrainingMatrixFilters) {
		trainingMatrix(filters: $filters) {
			data {
				data {
					key
					id
					first_name
					last_name
					email
					username
					account {
						start_date
						id
						key
					}
					groups {
						id
						name
					}
					subjects {
						key
						pivot_id
						id
						name
						target_completion
						date_completed
						refresh_period
						progress
						training_status
					}
				}
				per_page
				current_page
				last_page
				total
			}
		}
	}
`

export const GET_SUBJECTS = gql`
	query users($filters: TrainingMatrixFilters) {
		trainingMatrixStats(filters: $filters) {
			key
			id
			name
			course_completed_count
			course_compliance_count
			course_allocated_count
			__typename
		}
	}
`
