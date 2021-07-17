# Rodinka_Server

### API
#### Users `(/api/users)`
- `GET//api/users/`;  gets all users
- `GET//api/users/people/`; gets all users of certain type;  
    params: `"userType"`
- `GET//api/users/user/`; get user by id;  
    params: `"_id"`
- `POST//api/users/user`; creates new user;  
    params: `"surname", "name", ?"additional_name", "dateOfBirth"(YYYY-mm-dd), "userType" ("client"/"doctor"/"admin")`  
- `DELETE//api/users/user`; deletes a user;  
    params: `"_id"`  
- `PUT//api/users/user`; modifies a user;  
    params: `"_id"` and params which you would like to modify  
  
#### Photos `(/api/photos)`
- `POST//api/photos/uploadPhoto`; add a photo;  
    send as BLOB using form or something like that;  body = form-data; 
    params: `"img": BLOB img`, `"_id":consultation _id`
    returns a JSON with either `"_id"` or `"error"`
- `POST//api/photos/getPhoto`; get a photo;  
    params: `_id`  
    returns a JSON with either `"data"` or `"error"`

#### Consultations `(/api/consultations)`  
- `POST//api/consultations/addConsultation`; create a new consultation and add it to a specified user;  
    params: `"_id"` - userId  
- `POST//api/consultations/updateConsultation`; get a consultation by id;      
    params: `"_id"` - consultationId  
- `POST//api/consultations/updateConsultation`; update a consultation;  
    params: `"_id"` - consultationId and others which you'd like to modify   
- `POST//api/consultations/removeConsultation`; removes a consultation from user's array and consultations collection;  
    params: `"_id"` - consultationId  