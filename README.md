# Rodinka_Server

### API
#### Users `(/api/users)`
- `GET//api/users/`;  gets all users
- `GET//api/users/people/`; gets all users of certain type;  
    params: `"userType"`
- `GET//api/users/user/`; get user by id;  
    params: `"_id"`
- `POST//api/users/user`; creates new user;  
    params: `"surname", "name", ?"additional_name", "dateOfBirth"(YYYY-mm-dd), "email", "password", "?userType" ("client"/"doctor"/"admin")`  
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
    ConsultationSchema editable parameters: `"examination" (String), "complaints" (String), "plans" (String), "recommendations" (String), "diagnosis" (String), ?"date" (String, UNIX timestamp)`  
- `POST//api/consultations/addConsultation`; create a new consultation and add it to a specified user;  
    params: `"_id"` - userId  
- `POST//api/consultations/updateConsultation`; get a consultation by id;      
    params: `"_id"` - consultationId  
- `POST//api/consultations/updateConsultation`; update a consultation;  
    params: `"_id"` - consultationId and others which you'd like to modify   
- `POST//api/consultations/removeConsultation`; removes a consultation from user's array and consultations collection;  
    params: `"_id"` - consultationId  

#### Operations `(/api/operations)`  
    OperationSchema editable parameters: `"descriptionTLDR" (String), "description" (String), "diagnosis" (String), "recommendations" (String), ?"date" (String, UNIX timestamp)`  
- `POST//api/operations/addOperation`; create a new operation and add it to a specified user;  
    params: `"_id"` - userId  
- `POST//api/operations/getOperation`; get an operation by id;      
    params: `"_id"` - operationId  
- `POST//api/operations/updateOperation`; update an operation;  
    params: `"_id"` - operationId and others which you'd like to modify   
- `POST//api/operations/removeOperation`; removes an operation from user's array and operations collection;  
    params: `"_id"` - operationId  

#### Analyzes `(/api/analyzes)`  
    AnalysisSchema editable parameters: `"type" (String), "description" (String), "conclusion" (String), "attachments" (Array, feature to add pics and so on?), ?"date" (String, UNIX timestamp)`  
- `POST//api/operations/addAnalysis`; create a new analysis and add it to a specified user;  
    params: `"_id"` - userId  
- `POST//api/operations/getAnalysis`; get an analysis by id;      
    params: `"_id"` - analysisId  
- `POST//api/operations/updateAnalysis`; update an analysis;  
    params: `"_id"` - analysisId and others which you'd like to modify   
- `POST//api/operations/removeAnalysis`; removes an analysis from user's array and analyzes collection;  
    params: `"_id"` - analysisId  

#### Diagnoses `(/api/diagnoses)`
    DiagnosisSchema editable parameters: `"diagnosis" (String), "diagnosisTLDR" (String), "TNMStage" (String), "analyzes" - id array (?)`
- `POST//api/diagnoses/addDiagnosis`; create a new diagnosis and add it to a specified user;  
    params: `"_id"` - userId  
- `POST//api/diagnoses/getDiagnosis`; get a diagnosis by id;      
    params: `"_id"` - diagnosisId  
- `POST//api/diagnoses/updateDiagnosis`; update a diagnosis;  
    params: `"_id"` - diagnosisId and others which you'd like to modify   
- `POST//api/diagnoses/removeDiagnosis`; removes a diagnosis from user's array and diagnoses collection;  
    params: `"_id"` - diagnosisId  