# Potential issues and improvements

---

- [] fsPromises.appendFile in logger.js can eat a lot of RAM; can create problem in scaling
- [] since the model of users and driver is same, how wise is giving error on same username? at least provide name feild also.
- [] userId should be extract from req.params rather than req.body; Best Practie?
- [] userId can be extract from req.userId?; think?
- [] if decied to go with unique username then it should be extracted from req.params? and should be used to link booking?
- [] please add `isError` in the api error responses
- [] some validations should be removed in production to simplfy the req-res; and make APIs lite weight
- [] 
- [] 

