import gql from 'graphql-tag'

export const GET_GROUPS_LIST = gql`
	query groups($with_child: [Int], $search: String, $parent_id: Int) {
		all(with_child: $with_child, search: $search, parent_id: $parent_id) {
			id
			name
			deletable
			users_count
			parent_id
			is_children_exists
			search_match
		}
	}
`

export const GET_GROUPS_DROPDOWN = gql`
	query groups($search: String, $require_id: Int) {
		dropdown(search: $search, require_id: $require_id) {
			id
			name
		}
	}
`
