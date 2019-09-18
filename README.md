# G5 Auth JS

G5 auth provides a solution to enable express apps to use g5 auth

## Requirements

G5 Auth should work with and database type that sequelize supports though it was only tested with postgres

## Usage
`Init()` - Takes two params 
* app - The express app()
* config - The following object 
```
{
  passport: {
    authorizationURL,
    tokenURL,
    clientID,
    clientSecret,
    callbackURL,
  },
  authMeEndpoint,
  session: {
    secret
  },
  sucessRedirectPath: 
}
 ```
`isAuthenticated()` - Takes req, res, next from express

  Example of use : 
```
app.get('/client', , g5Auth.isAuthenticated, (req, res) => res.sendFile('client/index.html'))
```


G5 Updatable also exposes two GET endpoints:

*  `/g5_auth/users/auth/g5` used to authenticate the user
*  `/g5_auth/users/auth/g5/callback` used to redirect the authenticated user
