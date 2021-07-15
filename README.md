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
