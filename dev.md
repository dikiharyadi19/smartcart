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

[{"image":"https://cdn.vuetifyjs.com/images/cards/foster.jpg","item_id":402,"order_id":43,"price":100000,"qty":2,"type":"Minuman"},{"item_id":302,"order_id":43,"price":20000,"qty":1,"image":"https://cdn.vuetifyjs.com/images/cards/foster.jpg","type":"Minuman"},{"image":"https://cdn.vuetifyjs.com/images/cards/foster.jpg","item_id":502,"order_id":43,"price":140000,"qty":2,"type":"Vitamin"}]