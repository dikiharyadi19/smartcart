https://github.com/gruhn/vue-qrcode-reader


# Deploy heroku

heroku create app-name
heroku config:set NPM_CONFIG_PRODUCTION=false
npm run build
npm run start
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
heroku config

add to package.json after start

```
"heroku-postbuild": "nuxt build",
```

create Procfile
`web: nuxt start`

# Note
subscribe channel
tampung dari local ke variable
looping
cocoking kalo sama jngn di tambahin cuma tambah pricenya sama qty, 
kalo beda tambahin