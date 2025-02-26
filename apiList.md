

-POST /signup
-POST /login
-POST /logout


-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password


-POST /request/send/interested/:userID
-POST /request/send/ignored/:userId

-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

-GET /connections
-GET /requests/received
-GET /feed - gets you the profiles of other users on platform


Status : ignore, intrested, accepted, rejected