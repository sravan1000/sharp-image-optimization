# install
 
 - do yarn install
 - do yarn build
 - do yarn start

 # copy menu to menu.json

 - example menu

 ```
    {
        "menus": [
            {
                "isActive": true,
                "products": [
                    {
                        "posId": "sample",
                        "imageUri": "https://example.com/sample.png"
                    }
                ]
            }
        ]
    }

 ```

 - run cmd `yarn build`
 - run cmd `yarn start`
 - you can check compressed images in output folder

 # tested this with sys requirements
 - yarn 1.22.19
 - nvm 0.39.3
 - node v18.17.0
