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

const users = [{  
  email: 'your@email.cz',
  password: '123456'
},
{  
  email: 'gabro057@email.cz',
  password: '987654321'
}]

const activities = [
  {
    title: "Programovani",
    location: {
      lat: 51.473599521024354,
      lng: -0.03158569335937501
    },
    description: "REACT nebo PREACT Co byste zvolili? 1234567890+ěščřžýáíé",
    datetime: "2021-03-01T15:55:58.422Z"
  },
  {
    title: "Ahoj Alfons",
    location: {
      lat: 51.458092962783894,
      lng: -0.14436721801757815
    },
    description: "Jak se mas?",
    datetime: "2021-03-01T15:55:58.422Z"
  },
  {
    title: "Beh kolem Olesne",
    location: {
      lat: 51.84046568404054,
      lng: -0.8681774139404297
    },
    description: "Rano Martik bezel svuj prvni zavod",
    datetime: "2021-03-02T11:55:58.422Z"
  }
]

//schema
const typeDefs = gql`
  type Location {
    lat: String!
    lng: String!
  }

  type Activities {
    title: String!
    description: String!
    datetime: String!
    location: Location
  }

  type Query {
    activities: [Activities]
  }
`

const resolvers = {
  Query: {
    activities: (root, args) => {
      return activities
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
  } catch (err) {
    throw new AuthenticationError('Authentication error, JWT invalid')
  }
}

async function startApolloServer(typeDefs, resolvers, context) {
  const server = new ApolloServer({ typeDefs, resolvers, context, cors: false }) //cors: false
  await server.start();
  
  const app = express()  
  
  const corsOptions = {    
    origin: 'http://localhost:3000',
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
    console.info("SERVER POST body", req.body)
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

    users.push({
      email: xss(email),
      password: xss(hash)
    })
    
    res.cookie('token', getToken(email), {
      httpOnly: true
      //secure: true
    })
    
    res.send({
      success: true      
      //token: getToken(email)
    })
  })

  app.post('/login', (req, res) => {
    const { email, password } = req.body

    const theUser = users.find(user => user.email === email)

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
  })

  app.listen(3001, () => console.log('Server listening on port 3001'))
  //await new Promise(resolve => app.listen({ port: 3001 }, resolve));
  console.log(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers, context)
