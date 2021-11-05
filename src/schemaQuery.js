const fetch = require('node-fetch')
const fs = require('fs')

fetch(process.env.REACT_APP_GRAPHQL_PATH, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		authorization:
			'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA4OTc4YzI4MzhiNDQ4NDYyMjMxN2MzM2IxNGExYWYwMWVhNTUwZDY4YTU3Yzg3ZTc2MzdhZDBjZjBhYmY2MTg2NmMyOWY4NTlhZWM5YzIxIn0.eyJhdWQiOiIxIiwianRpIjoiMDg5NzhjMjgzOGI0NDg0NjIyMzE3YzMzYjE0YTFhZjAxZWE1NTBkNjhhNTdjODdlNzYzN2FkMGNmMGFiZjYxODY2YzI5Zjg1OWFlYzljMjEiLCJpYXQiOjE1NTg2MDIyODgsIm5iZiI6MTU1ODYwMjI4OCwiZXhwIjoxNTU5NDY2Mjg4LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.jDzg9n_ERuaqnolzfRYzeLjAJ7-vEgtpWNn7RKWRCR2EmqeCzO_83DwY5WLD9epL9O9yBD2tFKgmwzNuF3xFwWH8rs6ZJM1Dsv9jLsRV0JdavvzgO3kRZWgkD0_glwXax-UV-nfwZ_LX5w1p8UIUAPvUjGYnCytO6s_h_uNb1BAenhroPuu8SScBDTRcM6V2kfjAXWW3lP0yohpxVkPsR8Sk14EV_FookE7OGGmFgWSr2q-4I5RfP_62xyjBr_sG-eqbNI6JxGHfH7qfxV4afBh5T8uX-fld4KlUwR_QKEW_Uhf9WzccG-hyhKvSuR8UuN9hXrTivBs7X8QrkNutwIyi9gDtwGPd_KEPPH8PE555ngIBK1NAB5095ndopAjkL2zIkkHSNuuzrBhB8WEFHKQ8Ffi06OuvYErEpEl6SOpnp65AsAQFZLcui3x9UdZAQX69WWXpf1W3wFKA9qrkAvGWq_yc6q9o5b9maUzOHC_6WJIosHDzUGxGPySfcV57LydGPbX9rUoyC-nd1FhtUw8nBsq-5zz64aXBZoz-iDbqMKLc1Im4JdLIiEMNexAu1AATbKUFrXLUH8gw4lNXAmA49rgvXpXAj6TMjUbwp0zrihFuh4q0p8ibyLIz8Rb7_V4j6LmaoIlcdKhf8oppEJ6UJ8ES3I-d9p0fNCOkYsY', // eslint-disable-line
		accountId: 2,
		'X-Requested-With': 'XMLHttpRequest',
	},
	body: JSON.stringify({
		variables: {},
		query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
	}),
})
	.then(result => result.json())
	.then(result => {
		// here we're filtering out any type information unrelated to unions or interfaces
		const filteredData = result.data.__schema.types.filter(type => type.possibleTypes !== null)
		result.data.__schema.types = filteredData
		fs.writeFileSync('./fragmentTypes.json', JSON.stringify(result.data), err => {
			if (err) {
				console.error('Error writing fragmentTypes file', err)
			} else {
				console.log('Fragment types successfully extracted!')
			}
		})
	})
	.catch(error => console.log(error))
