## Biger Posts and Preferences Service | Bangkit Academy 2023 Batch 2
#### Capstone Team ID : CH2-PS514
This is a feature of community posts that allows all Biger users to share experiences or simply share knowledge. Based on the business idea recommendations in the Biger app, users can share the execution of business ideas, calculations, progress, as well as obstacles or challenges encountered when implementing those business ideas.

___
### Add User Preferences
> URL : https://posts-dot-capstone-ch2-ps514.et.r.appspot.com/api/v1/preferences
- Method
  
  /POST
- Headers

  > **`Authorization: `** Bearer `<token_authorization>`
- Request Body
  
  > **`address`** as `string`, **required**, address bias not to be specific allowed
  > 
  > **`route`** as `string`, **required**, user street name must be exist in Google Maps
  > 
  > **`administrative_area_level_5`** as `string`, **required**, referred to as _**dusun**_ in Indonesia
  > 
  > **`administrative_area_level_4`** as `string`, **required**, referred to as _**desa**_ in Indonesia
  > 
  > **`administrative_area_level_3`** as `string`, **required**, referred to as _**kecamatan**_ in Indonesia
  >
  > **`administrative_area_level_2`** as `string`, **required**, referred to as _**kabupaten/kota**_ in Indonesia
  > 
  > **`administrative_area_level_1`** as `string`, **required**, referred to as _**provinsi**_ in Indonesia
  >
  > **`postal_code`** as `int`, **required**, referred to as _**kodepos**_ in Indonesia
- Response 

  ```json
  {
    "success": true,
    "preferences": {
        "address": "Jl. Production 0.0.1Beta, N-56",
        "route": "Jl. Production 0.0.1Beta",
        "administrative_area_level_5": "Dusun Production 0.0.1Beta",
        "administrative_area_level_4": "Desa Production 0.0.1Beta",
        "administrative_area_level_3": "Kecamatan Production 0.0.1Beta",
        "administrative_area_level_2": "Kabupaten Production 0.0.1Beta",
        "administrative_area_level_1": "Jawa Timur | Production",
        "postal_code": 61262,
        "country_code": "ID"
    }
  }
  ```
  The returned response always provides a **`true`** value for the success `property` when the operation is successful. Additionally, the response is accompanied by detailed information about user preferences.
  > **NOTE:** The `success` property always has a value of **`false`** if the request or operation fails.

### Update User Preferences
> URL : https://posts-dot-capstone-ch2-ps514.et.r.appspot.com/api/v1/preferences
- Method
  
  /PATCH
- Headers

  > **`Authorization: `** Bearer `<token_authorization>`
- Request Body
  
  All properties in the request body are optional, just include the properties you want to modify.
  > **`address`** as `string`, **optional**, address bias not to be specific allowed
  > 
  > **`route`** as `string`, **optional**, user street name must be exist in Google Maps
  > 
  > **`administrative_area_level_5`** as `string`, **optional**, referred to as _**dusun**_ in Indonesia
  > 
  > **`administrative_area_level_4`** as `string`, **optional**, referred to as _**desa**_ in Indonesia
  > 
  > **`administrative_area_level_3`** as `string`, **optional**, referred to as _**kecamatan**_ in Indonesia
  >
  > **`administrative_area_level_2`** as `string`, **optional**, referred to as _**kabupaten/kota**_ in Indonesia
  > 
  > **`administrative_area_level_1`** as `string`, **optional**, referred to as _**provinsi**_ in Indonesia
  > 
  > **`postal_code`** as `int`, **optional**, referred to as _**kodepos**_ in Indonesia
- Response 

  ```json
  {
    "country_code": "ID",
    "address": "Jl. Production 0.0.1Beta, N-56",
    "administrative_area_level_2": "Kabupaten Production 0.0.1Beta",
    "administrative_area_level_3": "Kecamatan Production 0.0.1Beta",
    "administrative_area_level_1": "Jawa Timur | Production",
    "administrative_area_level_5": "Dusun Production 0.0.1Beta",
    "postal_code": 61262,
    "route": "Jl. Production 0.0.1Beta | Updated",
    "administrative_area_level_4": "Desa Production 0.0.1Beta | Updated"
  }
  ```
  The returned response only contains the `object` of the user's latest preference data after the update. Once again, when the operation fails, the returned value of the `success` property is always **`false`**.

### Add User Place Types
> URL : https://posts-dot-capstone-ch2-ps514.et.r.appspot.com/api/v1/preferences/types
- Method
  
  /PUT
- Headers

  > **`Authorization: `** Bearer `<token_authorization>`
- Query Params

  > **`update`** as `string`, **optional**, the value must be `add` or `rm`
- Request Body
  
  > **`types`** as `array`, **required**, user's place types choices in an array
- Response 

  ```json
  {
    "success": true,
    "placesTypes": [
        "place 1",
        "place 2",
        "place 3"
    ]
  }
  ```
  When successful, the returned response is a `success` status with a **`true`** value, followed by the `placeTypes` property containing the user's location choices in the form of an array.
  ### Updating placeTypes
  > **NOTE:** This request is made when the user first enters place types data. When updating values by adding or removing, add the query parameter `?update=add` to add a value and `?update=rm` to remove a value from the array. If you do not add the query parameter `update` to adding or removing, all values in `placeTypes` will be replaced with the new values.

### Get User Preferences
> URL : https://posts-dot-capstone-ch2-ps514.et.r.appspot.com/api/v1/preferences
- Method
  
  /GET
- Headers

  > **`Authorization: `** Bearer `<token_authorization>`
- Query Parameters

  > **`formatted`** as `string`, **optional**, with value "true" or "false" and this will return formatted address to provides readable user's address.
- Request Body
  
  > { }
- Response 

  ```json
  {
    "success": true,
    "preferences": {
        "addressComponents": {
            "country_code": "ID",
            "address": "Jl. Production 0.0.1Beta, N-56",
            "administrative_area_level_2": "Kabupaten Production 0.0.1Beta",
            "administrative_area_level_3": "Kecamatan Production 0.0.1Beta",
            "administrative_area_level_1": "Jawa Timur | Production",
            "administrative_area_level_5": "Dusun Production 0.0.1Beta",
            "postal_code": 61262,
            "route": "Jl. Production 0.0.1Beta | Updated",
            "administrative_area_level_4": "Desa Production 0.0.1Beta | Updated"
        },
        /*
        * if query params {formatted=true} included
        */
        "formattedAddress": "Jl. Production 0.0.1Beta | Updated, Dusun Production 0.0.1Beta, Desa Production 0.0.1Beta | Updated, Kecamatan Production 0.0.1Beta, Kabupaten Production 0.0.1Beta, Jawa Timur | Production 61262, Indonesia",
        "placeTypes": [
            "place 1",
            "place 2",
            "place 3"
        ]
    }
  }
  ```
  This request returns a response in the form of user preference details in the `addressComponents` format.
### Add Post on Community Posts
> URL : https://posts-dot-capstone-ch2-ps514.et.r.appspot.com/api/v1/posts
- Method
  
  /POST
- Headers

  > **`Authorization: `** Bearer `<token_authorization>`
- Query Parameters

  > { }
- Request Body
  
  > **`post_pict`** as `file`, **required**, only [ .jpg, .jpeg, .png ] mimetypes are allowed.
  >
  > **`title`** as `string`, **required**, user's post title
  > 
  > **`text`** as `string`, **required**, user's post text display
- Response 

  ```json
  {
    "success": true,
    "status": "post added successfully!"
  }
  ```
  The response always returns a **`true`** value for the `success` property. When the operation fails, an `error message` will be thrown.

### Update Post
> URL : https://posts-dot-capstone-ch2-ps514.et.r.appspot.com/api/v1/posts/[POST-DOCUMENT_ID]
- Method

  /PATCH
- Headers

  > **`Authorization: `** Bearer `<token_authorization>`
- Request Params

  > **`POST-DOCUMENT_ID`** as `string`, **required**, add unique post document id in the last URL
- Request Body
  
  > **`title`** as `string`, **required**, user's post title
  > 
  > **`text`** as `string`, **required**, user's post text display
- Response 

  ```json
  {
    "_writeTime": {
        "_seconds": 1702482060,
        "_nanoseconds": 32831000
    }
  }
  ```
  The response return property `_writeTime` indicate that updating post successfully. Otherwise, it will return error message when fail to update.

### Like Post
> URL : https://posts-dot-capstone-ch2-ps514.et.r.appspot.com/api/v1/posts/[POST-DOCUMENT_ID]
- Method

  /PUT
- Headers

  > **`Authorization: `** Bearer `<token_authorization>`
- Request Params

  > **`POST-DOCUMENT_ID`** as `string`, **required**, add unique post document id in the last URL
- Request Body

  > { }
- Response

  ```json
  {
    "_writeTime": {
        "_seconds": 1702482315,
        "_nanoseconds": 811060000
    }
  }
  ```
  The response return property `_writeTime` indicate that performing like to the post successfully. Otherwise, it will return error message when fail like the post.

### Get Post Collection
>  URL : https://posts-dot-capstone-ch2-ps514.et.r.appspot.com/api/v1/posts
- Method

  /GET
- Query Parameters

  > **`page`** as `string` or `int`, it will determine which collection data will be returned. example {`?page=2`}
- Response

  ```json
  {
    "totalPages": 1,
    "posts": [
        {
            "documentId": "wQOIfFx5mT94cawagxN9",
            "post": {
                "imageName": "images/\\tmp\\finaldeliverable@barjakoub.co.idM0bSk6lnxUlQ20bE.png",
                "imageMedia": "https://storage.googleapis.com/download/storage/v1/b/biger-posts/o/images%2F%5Ctmp%5Cfinaldeliverable@barjakoub.co.idM0bSk6lnxUlQ20bE.png?generation=1702481700820178&alt=media",
                "imageUrl": "https://storage.googleapis.com/biger-posts/images%2F%5Ctmp%5Cfinaldeliverable%40barjakoub.co.idM0bSk6lnxUlQ20bE.png",
                "publisher": "finaldeliverable@barjakoub.co.id",
                "postId": "bigposthpJnNvJEpJQgMD3E",
                "userReference": "users/SGKA9xlDs21KEdEM",
                "likes": 0,
                "dateCreated": {
                    "_seconds": 1702481701,
                    "_nanoseconds": 376000000
                },
                "text": "THERE IS A CAPTION HERE",
                "title": "FINAL TEST | PROD-0.0.1BETA",
                "dateUpdated": {
                    "_seconds": 1702482060,
                    "_nanoseconds": 15000000
                }
            }
        },
    ]
  }
  ```
  The response will return the information of total page in `totalPages` property and 20 collection of post in `posts` property. Look at the example response above to know the detail of post property.

  > **NOTE :** If the send `page` greater than `totalPages` property, it will fail. Check the `message` property for information.