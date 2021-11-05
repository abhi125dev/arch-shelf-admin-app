import gql from 'graphql-tag'

export const SET_BOOKMARK = gql`
	mutation bookmarks($learning_content_id: Int!, $bookmark_id: Int) {
		refresh(learning_content_id: $learning_content_id, bookmark_id: $bookmark_id) {
			id
		}
	}
`

export const ADD_IFRAME_ACTIVITY = gql`
	mutation outcomes($href: String!, $pivot_id: Int!) {
		addActivity(href: $href, pivot_id: $pivot_id)
	}
`
