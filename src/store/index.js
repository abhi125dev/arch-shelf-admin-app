import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'

import { createUploadLink } from 'apollo-upload-client'
import introspectionQueryResultData from '../fragmentTypes.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData,
})

// Custom Events
function createNewEvent(eventName) {
	var event
	if (typeof Event === 'function') {
		event = new Event(eventName)
	} else {
		event = document.createEvent('Event')
		event.initEvent(eventName, true, true)
	}
	return event
}

const errorEvent = createNewEvent('onError')

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: user && user.token ? `Bearer ${user.token}` : '',
			accountId: user && user.account ? parseInt(user.account.id) : null,
			'X-Requested-With': 'XMLHttpRequest',
		},
	}
})

const baseClient = concatLink => {
	return new ApolloClient({
		link: ApolloLink.from([
			onError(({ graphQLErrors, networkError }) => {
				if (errorEvent && graphQLErrors) {
					errorEvent.error = graphQLErrors[0]
					window.dispatchEvent(errorEvent)
				}
				// graphQLErrors.map(({ message, locations, path, statusCode }) =>
				// 	console.log(
				// 		`[GraphQL error]: Message: ${message}, Location: ${(locations, statusCode)}, Path: ${path}`,
				// 	),
				// )
				if (errorEvent && networkError) {
					errorEvent.error = networkError
					window.dispatchEvent(errorEvent)
				}
			}),
			authLink.concat(concatLink),
		]),
		cache: new InMemoryCache({
			fragmentMatcher,
			dataIdFromObject: o => {
				let key = o.__typename

				if (o.key) {
					key += ':' + o.key
				}
				if (o.id) {
					key += ':' + o.id
				}

				return key
			},
		}),
		connectToDevTools: true,
	})
}

const exportCsvLink = new ApolloLink((operation, forward) => {
	return forward(operation).map(response => {
		const encodedUri = encodeURI(response.download.content)
		const link = document.createElement('a')
		link.setAttribute('href', encodedUri)
		link.setAttribute('download', response.download.filename)
		document.body.appendChild(link)
		link.click()

		return response
	})
})

export const client = baseClient(createUploadLink({ uri: process.env.REACT_APP_GRAPHQL_PATH }))
export const exportClient = baseClient(
	exportCsvLink.concat(createUploadLink({ uri: process.env.REACT_APP_API_PATH + '/export' })),
)
