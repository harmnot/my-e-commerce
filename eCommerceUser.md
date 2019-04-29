|        Routers         |                METHOD                 |                 DESCRIPTION                  | HEADER |                             BODY                             | STATUS |              RESPONSE               |                        ERROR/CONTENT                        |
| :--------------------: | :-----------------------------------: | :------------------------------------------: | ------ | :----------------------------------------------------------: | :----: | :---------------------------------: | :---------------------------------------------------------: |
| /api/user/listproducts | <span style="color:green">GET</span>  |            Get list all products             | NONE   |                             NONE                             |  200   |     an Object list of Products      |                      all products list                      |
|                        |                                       |                                              |        |                                                              |  500   |     an Object of internal error     |               an erorr message from Database                |
|    /api/user/login     | <span style="color:green">POST</span> |                    Login                     | NONE   | Username  [<span style="color:blue">STRING</span>], Email [<span style="color:blue">STRING</span>], Password [<span style="color:blue">STRING</span>] |  202   |     an Object of user and token     |                     token and user data                     |
|                        |                                       |                                              |        |                                                              |  404   |     an Object of error message      |                message can't found any user                 |
|                        |                                       |                                              |        |                                                              |  400   |     an Object of error message      |             message incorrect password/username             |
|                        |                                       |                                              |        |                                                              |  500   |     an Object of internal error     |               an erorr message from Database                |
|   /api/user/register   | <span style="color:green">POST</span> |            register for new user             | NONE   | Username [<span style="color:blue">STRING</span>], email [<span style="color:blue">STRING</span>], Password, [<span style="color:blue">STRING</span>], name [<span style="color:blue">STRING</span>],  Address [<span style="color:magenta">STRING</span>], |  201   | an Object of user after registering |                     Object of new user                      |
|                        |                                       |                                              |        |                                                              |  409   |       an Object error message       |                  duplicate username/email                   |
|                        |                                       |                                              |        |                                                              |  500   |     an Object of internal error     |               an erorr message from Database                |
|   /api/user/addcarts   | <span style="color:green">POST</span> | add product to cards and create product list | TOKEN  |    productName [<span style="color:blue">STRING</span>],     |  201   |          an Object message          | a message that tell succesfully to add carts/update/product |
|                        |                                       |                                              |        |                                                              |  500   |     an Object of internal error     |               an erorr message from Database                |
|                        |                                       |                                              |        |                                                              |        |                                     |                                                             |
