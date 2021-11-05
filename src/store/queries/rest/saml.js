import { get } from './client'

export const samlRequest = (SAMLRequest, RelaySate) => {
	return get(`/saml/login?SAMLRequest=${SAMLRequest}&RelaySate=${RelaySate}`)
}
