import appMiddleware from './appMiddleware'
import authMiddleware from './authMiddleware'
import profileMiddleware from './profileMiddleware'
import subjectMiddleware from './subjectMiddleware'

export const mainMiddleware = action => {
	return {
		appMiddleware: appMiddleware(action),
		authMiddleware: authMiddleware(action),
		profileMiddleware: profileMiddleware(action),
		subjectMiddleware: subjectMiddleware(action),
	}
}
