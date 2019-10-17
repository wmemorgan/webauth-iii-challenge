## Web Auth API Documentation

### Routes

#### Endpoint
https://wme-auth-iii-api.herokuapp.com/api

#### Authentication

| Method | Endpoint                        | Description                                        |
|--------|---------------------------------|----------------------------------------------------|
| POST   | `/register` | Add new users who are authorized to get jokes |
| POST    | `/login` | Authenticate users for API access |

#### Users

| Method | Endpoint                | Description                                                      |
| ------ | ----------------------- | ---------------------------------------------------------------- |
| GET    | `users`     | Retrieves an array of objects listing all users in the database. |
| GET    | `/users/:id` | Retrieves a specific user based on the id.                       |
| PUT    | `/users/:id` | Modifies an existing user.                                       |
| DELETE | `/users/:id` | Delete a user.                                                   |

---
### Data Models

#### Global Models
| Method | Description |
|--------|-------------|
| `find()` | Returns a promise that resolves to an array of all the resources contained in the database. |
| `findById()` | Takes an id as the argument and returns a promise that resolves to the resource with that id if found. |
| `findByUser()` | Takes the username as the argument and returns a promise that resolves to the resource with that id if found. |
| `findByField()` | Takes search criteria as the argument and returns a promise that resolves to the resource with that id if found. |
| `addRecord()` | Accepts a `resource` object to add it to the database and return the new `resource`.
| `updateRecord()` | Accepts two arguments, the first is the id of the resource to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly. |
| `removeRecord()` | Accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted. |

#### Application Models
| `getUsers()` | Retrieves an array of objects listing all users in the database.  |