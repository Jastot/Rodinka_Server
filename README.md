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
- `PUT//api/users/user/photo`; add a consultation to a user; doesnt work xd