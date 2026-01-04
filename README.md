## Architecture

```mermaid



flowchart TD
    Client[Client - Browser or Postman]
    Client -->|HTTP JSON + token cookie| ExpressApp[Express App src/app.js]

    ExpressApp --> Middleware[Global Middleware express.json cookie-parser]

    ExpressApp --> AuthRouter[Auth Router routes/auth.js]
    ExpressApp --> ProfileRouter[Profile Router routes/profile.js]
    ExpressApp --> RequestRouter[Request Router routes/request.js]
    ExpressApp --> UserRouter[User Router routes/user.js]

    AuthRouter --> Validation[Validation utils/validation.js]
    Validation --> UserModel[User Model models/user.js]
    AuthRouter --> Bcrypt[bcrypt password hashing]
    AuthRouter --> JWT[JWT creation and cookie set]

    ProfileRouter --> AuthMw[userAuth middleware]
    RequestRouter --> AuthMw
    UserRouter --> AuthMw

    AuthMw --> JWTVerify[Verify JWT jsonwebtoken]
    JWTVerify --> UserModel

    RequestRouter --> RequestModel[ConnectionRequest Model]
    UserRouter --> RequestModel

    ExpressApp --> DB[MongoDB Connection config/database.js]
    DB --> UserModel
    DB --> RequestModel


