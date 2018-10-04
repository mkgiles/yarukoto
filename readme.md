# yarukoto - A RESTful TO-DO API
An app back-end written in Node.js for users to store and schedule their to-dos.
## Dependencies
* UUID -- for session IDs
* Mongoose -- for storing lists and users
* Express -- for the endpoint routers
* cookie-parser -- for saving user log in sessions
* bcrypt -- for hashing passwords
## REST Endpoints
Call|URI|Purpose|Required fields
-|-|-|-
GET|`/notes`|Get a list of all notes belonging to the logged in user|---
GET|`/notes/overdue`|Get a list of all overdue notes|---
GET|`/notes/search/:tag`|Get a list of all notes tagged with the queried tag|---
GET|`/notes/:id`|Get a specific note by its ID|---
POST|`/notes`|Create a new note with a uniquely generated ID|---
DELETE|`/notes/:id`|Delete a specific note by its ID|---
POST|`/notes/:id`|Attach a to-do item to the specified note.|label
POST|`/notes/:id/tag`|Attach a tag to the specified note.|tag
DELETE|`/notes/:id/tag`|Delete a tag from the specified note.|tag
POST|`/notes/:id/:label/deadline`|Set the deadline for the specified to-do item|deadline
PUT|`/notes/:id/:label`|Toggle whether the to-do item is completed or not|---
DELETE|`/notes/:id/:label`|Delete the specified to-do item from the note|---
POST|`/users/login`|Log in user|username,pass
POST|`/users/register`|Register user|username,pass
DELETE|`/users/logout`|Log out|---
DELETE|`/users/deregister`|Delete user|---
