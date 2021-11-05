import gql from 'graphql-tag'

export const UPDATE_GROUPS_ON_DRAG = gql`
	mutation groups($rebuild_tree: DDGroupsInputs!) {
		updateOrCreate(rebuild_tree: $rebuild_tree) {
			id
		}
	}
`

export const UPDATE_CREATE_GROUP = gql`
	mutation groups($rebuild_tree: DDGroupsInputs!) {
		updateOrCreate(rebuild_tree: $rebuild_tree) {
			id
			name
			deletable
			users_count
			parent_id
		}
	}
`

export const DELETE_GROUP = gql`
	mutation groups($id: Int!) {
		delete(id: $id)
	}
`
