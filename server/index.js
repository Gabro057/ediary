//nodemon index.js

const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const xss = require('xss')

// run like nodemon index.js
const SECRET_KEY = 'hdh455yt4hg65dsx6f'

const {
  ApolloServer,
  gql,
  AuthenticationError
} = require('apollo-server-express')
//const { Pool } = require('pg')

//https://www.pgadmin.org/
//https://elephantsql.com/
const { Client } = require('pg')
const client = new Client({
  user: 'vjbpkzzr',
  host: 'tai.db.elephantsql.com',
  database: 'vjbpkzzr',
  password: 'RZhpUeBTXKyoiBN1lGuxl79z2F3BJL57',
  port: 5432
})
/*
const client = new Client({
  user: 'lzynaoih',
  host: 'rogue.db.elephantsql.com',
  database: 'lzynaoih',
  password: 'yJ0yjONZAbe-54n_obYgPre0KOtG5vAH',
  port: 5432
})*/

const initDb = async () => {
  await client.connect()
}
initDb()
/*
const users = [{  
  email: 'your@email.cz',
  password: '123456'
},
{  
  email: 'gabro057@email.cz',
  password: '987654321'
}]*/
/*
const activities = [
  {
    title: "Programovani",    
    lat: 51.473599521024354,
    lng: -0.03158569335937501,    
    description: "REACT nebo PREACT Co byste zvolili? 1234567890+ěščřžýáíé",
    datetime: "2021-03-01T15:55:58.422Z"
  },
  {
    title: "Ahoj Alfons",    
    lat: 51.458092962783894,
    lng: -0.14436721801757815,    
    description: "Jak se mas?",
    datetime: "2021-03-01T15:55:58.422Z"
  },
  {
    title: "Beh kolem Olesne",    
    lat: 51.84046568404054,
    lng: -0.8681774139404297,    
    description: "Rano Martik bezel svuj prvni zavod",
    datetime: "2021-03-02T11:55:58.422Z"
  }
]
*/
//schema
//id: String!
const typeDefs = gql`  
  type Activity {
    id: Int!
    title: String!
    description: String!
    datetime: String!
    lat: String!
    lng: String!
  }

  type Query {
    activities: [Activity]
  }

  type Mutation {
    addActivity(
      id: Int!
      title: String!
      description: String!
      datetime: String!
      lat: String!
      lng: String!
    ) : Activity
  }
`

const resolvers = {
  Query: {
    activities: async (root, args, context) => {
      console.log("context.email", context.email)
      const text = 'SELECT * FROM activities WHERE email = $1'
      const values = [context.email]

      try {
        const res = await client.query(text, values)
        console.log("res.rows", res.rows)        
        return res.rows
      } catch(err) {
        console.log(err.stack)
      }      
    }
  },
  Mutation: {
    addActivity: async (root, args, context) => {
      console.log("addActivity=", args,id, args.title, args.description, args.datetime, args.lat, args.lng)
      //const res = await client.query()
      const text = 'INSERT INTO activities (title, description, datetime, lat, lng, email) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
      const values = [args.title, args.description, args.datetime, args.lat, args.lng, context.email]

      try {
        const res = await client.query(text, values) 
        return res.rows[0]
      } catch(err) {
        console.log(err.stack)
      }
    }
  }
}

const context = ({ req }) => {
  //const token = req.headers.authorization || ''  
  const token = req.cookies['token'] || ''
  console.info("token=" + token)
  console.info("SECRET_KEY=" + SECRET_KEY)

  try {
    console.log(jwt.verify(token, SECRET_KEY))
    const { email } = jwt.verify(token, SECRET_KEY) //token.split(' ')[1]
    console.info("email", email)
    return { email }
  } catch (err) {
    throw new AuthenticationError('Authentication error, JWT invalid')
  }
}

async function startApolloServer(typeDefs, resolvers, context) {
  const server = new ApolloServer({ typeDefs, resolvers, context, cors: false }) //cors: false
  await server.start();
  
  const app = express()  
  
  const corsOptions = {    
    origin: ['https://ediary-test.herokuapp.com/', 'http://aub.cz'],
    credentials: true
  }
  //credentials: true,
  //origin: '*'
  //origin: 'http://localhost:3000'
  app.use(cors(corsOptions))
  app.use(cookieParser())
  app.use(express.urlencoded({ extended: true }))

  server.applyMiddleware({ app, cors: false }) //cors: false

  const getToken = email => { 
    console.info("getToken SECRET_KEY", SECRET_KEY)

    return jwt.sign({
      email: email      
    }, SECRET_KEY)
  }

  app.post('/register', async (req, res) => {
    console.info("REGISTER SERVER POST body", req.body)
    const { email, password, passwordConfirmation } = req.body
    console.info("email", email)
    console.info("password", password)
    console.info("passwordConfirmation", passwordConfirmation)

    if(!email) {
      res.status(401).send({
        success: false,
        message: 'Please enter an email'
      })
      return
    }
    
    if(!password) {
      res.status(401).send({
        success: false,
        message: 'Please enter an password'
      })
      return
    }

    if(password.length < 8) {
      res.status(401).send({
        success: false,
        message: 'Please enter a password with at least 8 characters'
      })
      return
    }

    if(password != passwordConfirmation) {
      res.status(401).send({
        success: false,
        message: 'Please enter the same value in both the password fields'
      })
      return
    }

    const hash = await bcrypt.hash(password, 10) //10 rounds
    const text = 'INSERT INTO users (email, password) VALUES($1, $2)'
    const values = [email, hash]

    try {
      const response = await client.query(text, values) 
      console.info("USERS INSERT response", response.rows[0])
      //return response.rows[0]
    } catch(err) {
      console.log(err.stack)
    }
/*
    users.push({
      email: xss(email),
      password: xss(hash)
    })*/
    
    res.cookie('token', getToken(email), {
      httpOnly: true
      //secure: true
    })
    
    res.send({
      success: true      
      //token: getToken(email)
    })
  })

  app.post('/login', async (req, res) => {
    const { email, password } = req.body

    //const theUser = users.find(user => user.email === email)
    const text = 'SELECT * FROM users WHERE email = $1'
    const values = [email]

    try {
      const response = await client.query(text, values)
      const theUser = response.rows[0]
      console.info("user", theUser)
      //return res.rows

      if(!theUser) {
        res.status(404).send({
          success: false,
          message: 'Could not find account: ${email}'
        })
        return
      }
  
      const match = bcrypt.compare(password, theUser.password)
  
      if(!match) {
        res.status(401).send({
          success: false,
          message: 'Incorrect credentials'
        })
        return
      }
      
      res.cookie('token', getToken(email), {
        httpOnly: true
        //secure: true
      })
  
      res.send({
        success: true
        //token: getToken(theUser.email)
      })
    } catch(err) {
      console.log(err.stack)
    }
  })

  app.get('/', (req, res) => {
    res.status(200).send({
      success: true,
      message: `Hello, World!`
    })
  })

  app.listen(process.env.PORT || 3001, () => console.log('Server listening on port 3001'))
  //await new Promise(resolve => app.listen({ port: 3001 }, resolve));
  console.log(`🚀 Server ready on PORT ${process.env.PORT} or 3001`);
}

startApolloServer(typeDefs, resolvers, context)
