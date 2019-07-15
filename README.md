# tz-itunse
tz-itunse

# Agent
## Quick start


```bash
npm install
node app.js
```

# Master

## Quick start
Need mongodb

```bash
npm install
node app.js
```

## APi

POST /registration 
```js
{
username: username,
password: password
}
```

POST /login 
```js
{
username: username,
password: password
}
```

GET /logout 

GET /user   //Get user data

GET /getMusic //get music
```js
{
artistList: ['queen', 'ozzy ozborn],
timeout: 10000
}
```
