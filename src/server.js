import express from 'express';
import listEndpoints from 'express-list-endpoints'
import postsRouter from './services/posts/index.js';
import mongoose from 'mongoose';

const server = express()

const port = 3002

server.use(express.json()) // if you don't add this line BEFORE the endpoints, all requests' bodies will be UNDEFINED

// _____________ Endpoints ______________


server.use("/posts", postsRouter) // all the endpoints in the usersRouter will have http://localhost:3001/users as a URL
// _____________ Database Connection ______________

mongoose.connect(process.env.MONGO_CONNECTION_URL)

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB`)
server.listen(port, () =>{
    console.table(listEndpoints(server))
    console.log(`Server is running on port ${port}`) // backtick (don't forget)
})

})