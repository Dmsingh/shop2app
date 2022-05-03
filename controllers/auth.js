const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET


exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: true,
      message: errors.array()[0].msg,
      data: null,
    })
  }

  const user = new User(req.body);
  
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: "NOT able to save Data in DB (Duplicate Entry !)",
        data: null,
      })
    };
    console.log("Line No 28 -> New user created successfully....\n",user)
    return res.status(200).json({
      error: false,
      message: "User Successfully Signed up. Please login to proceed",
      data: {
        user: {
          name: user.name,
          email: user.email,
          password: user.encry_password,
          role: user.role
        }
      }
    });

  })
}

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: true,
      message: errors.array()[0].msg,
      data: null,
    })
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: true,
        data: null,
        message: "Email doesn't exist !",
      })
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: true,
        data: null,
        message: "Email and password doesn't matches !"
      })
    };

    //Creat token
    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, SECRET.toString(), { expiresIn: '24h' })

    //Sending response to the front end
    const { _id, email, role, name,storeName } = user;
    console.log("Line No 79 -> User logged In  successfully....\n",user)
    return res.status(200).json({
      error: false,
      message: "Successfully Logged in.",
      data: {
        token,
        user: { _id, email, role, name,storeName }
      }
    })

  });

};

exports.getAllStoreOwner = (req, res) => {
  return User.find({ role: 1 }, (err, obj) => {
    
    if (err) return res.status(500).json({ error: true, message: err.message ? err.message : "Mongo Error in deletion" });
    else {
  
    
    console.log("Line No 100 -> List of all storeOwner...\n",obj)
    

      return res.status(200).json({
        error: false,
        message: "Successfully Extracted all store creator.",
        data:obj
      })
    };
  })
}

// Custom middlewares
//It is used to populate the user
exports.populateUser = (req, res, next) => {
  const token = req.headers['access_token'];
  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Unauthorised User",
      data: null
    })
  } else {
    jwt.verify(token, SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          error: true,
          message: err.message,
        })
      }
      // Get User from database
      const email = decoded['email']
      return User.findOne({ email }, function (err, data) {
        if (err) {
          return res.status(404).json({
            error: true,
            message: "No User found with these credentials.",
            data: null
          })
        } else {
          
          req.user = data
          next();
        }
      })

    });
  }
}
//This middleware is used to check, whether user is Authorized or not
exports.isAuthenticated = (req, res, next) => {
  let checker = req.user;
  if (!checker) {
    return res.status(403).json({ err: "Access denied , Unauthorised !" })
  };
  next()
}

//This middleware is used to check, whether extracted user is storeOwner or not
exports.isStoreOwner = (req, res, next) => {
  if (req.user.role != 1) {
    return res.status(403).json({
      error: true,
      message: "Not an Admin , Permission denied for admin request !"
    })
  };
  next()
}


