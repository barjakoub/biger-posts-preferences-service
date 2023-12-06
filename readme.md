## Biger Posts and Preferences Service | Bangkit Academy 2023 Batch 2
#### Capstone Team ID : CH2-PS514
This is a feature of community posts that allows all Biger users to share experiences or simply share knowledge. Based on the business idea recommendations in the Biger app, users can share the execution of business ideas, calculations, progress, as well as obstacles or challenges encountered when implementing those business ideas.
> Note: This service has not been deployed yet, but it has already undergone the development testing phase.
___
### Add User Preferences
> URL : https://_**SERVICE**_-dot-_**PROJECT.ID**_._**REGION.ID**_.r.appspot.com/api/v1/preferences
- Method
  
  /POST
- Headers

  > **`Authorization: `** Bearer `<token_authorization>`
- Request Body
  
  > **`address`** as `string`, optional address bias not to be specific allowed
  > 
  > **`route`** as `string`, user street name must be exist in Google Maps
  > 
  > **`administrative_area_level_5`** as `string`, optional and referred to as _**dusun**_ in Indonesia
  > 
  > **`administrative_area_level_4`** as `string`, optional and referred to as _**desa**_ in Indonesia
  > 
  > **`administrative_area_level_3`** as `string`, optional and referred to as _**kecamatan**_ in Indonesia
  >
  > **`administrative_area_level_2`** as `string`, optional and referred to as _**kabupaten/kota**_ in Indonesia
  > 
  > **`administrative_area_level_1`** as `string`, optional and referred to as _**provinsi**_ in Indonesia
- Response 

  ```json
  {
    "success": true,
    "preferences": {
        "address": "Jl. H. Mawardi, RT 03 RW 01",
        "route": "Jl. H. Mawardi",
        "administrative_area_level_5": "JerukGA",
        "administrative_area_level_4": "Jerukgamping",
        "administrative_area_level_3": "Kecamatan Krian",
        "administrative_area_level_2": "Kabupaten Sidoarjo",
        "administrative_area_level_1": "Jawa Timur",
        "postal_code": 61262,
        "country_code": "ID"
    }
  }
  ```
  The returned response always provides a **`true`** value for the success `property` when the operation is successful. Additionally, the response is accompanied by detailed information about user preferences.
  > **NOTE:** The `success` property always has a value of **`false`** if the request or operation fails.

### Update User Preferences
> URL : https://_**SERVICE**_-dot-_**PROJECT.ID**_._**REGION.ID**_.r.appspot.com/api/v1/preferences
- Method
  
  /PATCH
- Headers

  > **`Authorization: `** Bearer `<token_authorization>`
- Request Body
  
  All properties in the request body are optional, just include the properties you want to modify.
  > **`address`** as `string`, optional address bias not to be specific allowed
  > 
  > **`route`** as `string`, user street name must be exist in Google Maps
  > 
  > **`administrative_area_level_5`** as `string`, optional and referred to as _**dusun**_ in Indonesia
  > 
  > **`administrative_area_level_4`** as `string`, optional and referred to as _**desa**_ in Indonesia
  > 
  > **`administrative_area_level_3`** as `string`, optional and referred to as _**kecamatan**_ in Indonesia
  >
  > **`administrative_area_level_2`** as `string`, optional and referred to as _**kabupaten/kota**_ in Indonesia
  > 
  > **`administrative_area_level_1`** as `string`, optional and referred to as _**provinsi**_ in Indonesia
- Response 

  ```json
  {
    "country_code": "ID",
    "route": "Jl. H. Mawardi",
    "administrative_area_level_2": "Kabupaten Sidoarjo",
    "administrative_area_level_3": "Kecamatan Krian",
    "administrative_area_level_1": "Jawa Timur",
    "administrative_area_level_4": "Jerukgamping",
    "administrative_area_level_5": "JerukGA",
    "postal_code": 61262,
    "address": "Jl. Gajah Gg VII, Magersari"
  }
  ```
  The returned response only contains the `object` of the user's latest preference data after the update. Once again, when the operation fails, the returned value of the `success` property is always **`false`**.

### Add User Place Types
> URL : https://_**SERVICE**_-dot-_**PROJECT.ID**_._**REGION.ID**_.r.appspot.com/api/v1/preferences/types
- Method
  
  /PUT
- Headers

  > **`Authorization: `** Bearer `<token_authorization>`
- Request Body
  
  > **`types`** as `array`, user's place types choices in an array
- Response 

  ```json
  {
    "success": true,
    "placesTypes": [
        "office",
        "beach"
    ]
  }
  ```
  When successful, the returned response is a `success` status with a **`true`** value, followed by the `placeTypes` property containing the user's location choices in the form of an array.
  > **NOTE:** This request is made when the user first enters place types data. When updating values by adding or removing, add the query parameter `?update=add` to add a value and `?update=rm` to remove a value from the array. If you do not add the query parameter `update` to adding or removing, all values in `placeTypes` will be replaced with the new values.

### Get User Preferences
> URL : https://_**SERVICE**_-dot-_**PROJECT.ID**_._**REGION.ID**_.r.appspot.com/api/v1/preferences
- Method
  
  /GET
- Headers

  > **`Authorization: `** Bearer `<token_authorization>`
- Query Parameters

  > **`formatted`** as `string`, optional with value "true" or "false" and this will return formatted address to provides readable user's address.
- Request Body
  
  > { }
- Response 

  ```json
  {
    "success": true,
    "preferences": {
        "country_code": "ID",
        "route": "Jl. H. Mawardi",
        "administrative_area_level_2": "Kabupaten Sidoarjo",
        "administrative_area_level_3": "Kecamatan Krian",
        "administrative_area_level_1": "Jawa Timur",
        "administrative_area_level_4": "Jerukgamping",
        "administrative_area_level_5": "JerukGA",
        "postal_code": 61262,
        "address": "Jl. Gajah Gg VII, Magersari"
    },
    /*
    * when the `formatted` query parameter is set to true
    */
    "formattedAddress": "Jl. H. Mawardi, JerukGA, Jerukgamping, Kecamatan Krian, Kabupaten Sidoarjo, Jawa Timur 61262, Indonesia"
  }
  ```
  This request returns a response in the form of user preference details in the `addressComponents` format.
### Add User Community Post
> URL : https://_**SERVICE**_-dot-_**PROJECT.ID**_._**REGION.ID**_.r.appspot.com/api/v1/posts
- Method
  
  /POST
- Headers

  > **`Authorization: `** Bearer `<token_authorization>`
- Query Parameters

  > { }
- Request Body
  
  > **`post_pict`** as `file`, only [ .jpg, .jpeg, .png ] mimetypes are allowed.
  >
  > **`title`** as `string`, user's post title
  > 
  > **`text`** as `string`, user's post text display
- Response 

  ```json
  {
    "success": true,
    "status": "post added successfully!"
  }
  ```
  The response always returns a **`true`** value for the `success` property. When the operation fails, an `error message` will be thrown.