const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken')


const SECRET = 'nqdvbjejjejf';
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config({
	path: './config.env',
});

const url = process.env.MONGO_URI;

const port = 3000;

MongoClient.connect(url)
	.then((client) => {
		console.log('connected to mongodb server');

		const db = client.db('OwnerDB');


        const userSchema = {
            username: { type: 'string' },
            password: { type: 'string' },
            purchasedCars: { type: 'array', items: { type: 'objectId' } }
          };
        
          // Define admin schema
          const adminSchema = {
            username: { type: 'string' },
            password: { type: 'string' }
          };
        
          // Define course schema
          const carSchema = {
            title: {type:'string'},
            description: { type: 'string' },
            price: { type: 'number' },
            image: { type: 'string' },
            
            
          };

          const dealSchema = {
            Name: { type: 'string' },
            description: { type: 'string' },
            image: { type: 'string' },
          };


          const dealerSchema  = {
            username: { type: 'string' },
            email : {type : 'string'},
            dealer_info: { type: 'string' },
            password: { type: 'string' },
            purchasedCars: { type: 'array', items: { type: 'objectId' } }

          }
        const Admin = db.collection('Admin', adminSchema);
        const User = db.collection('User',userSchema);
        const Dealer = db.collection('Dealer',dealerSchema);
        const Car = db.collection('Car',carSchema)
        const Deal  = db.collection('Deal',dealSchema)

        const authenticateJwt = (req, res ,next) => {
            const authHeader = req.headers.authorization
            if(authHeader){
             const token = authHeader.split('')[1];
             jwt.verify(token, SECRET, (err,user) =>{
               if(err){
                 return res.sendStatus(403)
               }
               req.user = user
               next()
             })
   
            } else {
               res.sendStatus(401);
             
            }
     }
     

       //Admin Routes
        app.post('/admin/signup', async (req, res) => {
		     const {username, password} = req.body
             function callback(admin) {
                if (admin) {
                  res.status(403).json({ message: 'Admin already exists' });
                } else {
                  const newAdmin = { username: username, password: password };
                 Admin.insertOne(newAdmin)
                const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
                  res.json({ message: 'Admin created successfully', token });
                }
            
              }
              Admin.findOne({ username }).then(callback);
		});

        app.post('/admin/login', async (req, res) => {
            const {username, password} = req.headers
            const admin = await Admin.find({username, password}).toArray()
            if(admin) {
                const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
               res.json({message: 'Logged in Successfully', token})
            }
            else {
               res.status(403).json ({message:"Invalid username or password"})
            }
       });

       app.post('/admin/cars', authenticateJwt, async(req, res) => {
           const car  =  (req.body)
        Car.insertOne(car)
        res.json({message: 'car creaed successfully' , carId: car.id})

      });
      
      app.put('/admin/cars/:carId', (req, res) => {
        // logic to edit a car
        const car =  Car.fieldByIdAndUpdate(req.params.carId.req.body,{new: true})
        if(car) {
          res.json({message: 'car updatted successfully'})
      
        }
        else {
          res.status(404).json({message:'car not found'})
        }
      });

      app.post('/admin/deal', authenticateJwt, async(req, res) => {
        const deal  =  (req.body)
         Deal.insertOne(deal)
         res.json({message: 'Deal creaed successfully' , dealId: deal.id})

   });

   app.put('/admin/deal/:dealId', (req, res) => {
    // logic to edit a car
    const deal =  Deal.fieldByIdAndUpdate(req.params.dealId.req.body,{new: true})
    if(deal) {
      res.json({message: 'dea; updatted successfully'})
  
    }
    else {
      res.status(404).json({message:'deal not found'})
    }
  });

   

       
       

        //user Routes
        app.post('/user/signup', async (req, res) => {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(user) {
               res.status(403).json({message: 'user already exist'})
            }
            else {
               const newUser = {username, password}
               User.insertOne(newUser)
               const token = jwt.sign({username,role:'user'},SECRET, {expiresIn:'1h'})
               res.json ({message:"user created successfully", token})
            }
       });
   

       app.post('/user/login', async (req, res) => {
        const {username, password} = req.headers
        const user = await User.find({username, password})
        if(user) {
            const token = jwt.sign({username, role:'user'}, SECRET, {expiresIn: '1h'})
            res.json ({message:"Logged in success",  token})
         } 
        else {
            res.status(403).json({message: 'Invalid username and password'})
        }
   });
//Dealer Routes

   

   app.post('/dealer/signup', async (req, res) => {
    const {username, password} = req.body
    const dealer = await Dealer.findOne({username})
    if(dealer) {
       res.status(403).json({message: 'dealer already exist'})
    }
    else {
       const newDealer = {username, password}
       Dealer.insertOne(newDealer)
       const token   = jwt.sign({username,role:'dealer'},SECRET, {expiresIn:'1h'})
       res.json ({message:"dealer  created", token})
    }
});


app.post('/dealer/login', async (req, res) => {
    const {username, password} = req.headers
    const dealer = await Dealer.find({username, password})
    if(dealer) {
        const token = jwt.sign({username, role:'dealer'}, SECRET, {expiresIn: '1h'})
        res.json ({message:" Dealer Logged in success",  token})
       
    }
    else {
        res.status(403).json({message: 'Invalid dealer  username and password'})
    }
});

app.post('/dealer/cars', authenticateJwt, async(req, res) => {
  const car  =  (req.body)
Car.insertOne(car)
res.json({message: 'car creaed successfully' , carId: car.id})

});

app.put('/dealer/:carId', (req, res) => {
// logic to edit a car
const car =  Car.fieldByIdAndUpdate(req.params.carId.req.body,{new: true})
if(car) {
 res.json({message: 'car updatted successfully'})

}
else {
 res.status(404).json({message:'car not found'})
}
});

app.post('/dealer/deal', authenticateJwt, async(req, res) => {
  const deal  =  (req.body)
   Deal.insertOne(deal)
   res.json({message: 'Deal creaed successfully' , dealId: deal.id})

});


app.put('/dealer/deal/:dealId', (req, res) => {
  // logic to edit a car
  const deal =  Deal.fieldByIdAndUpdate(req.params.dealId.req.body,{new: true})
  if(deal) {
    res.json({message: 'deal updatted successfully'})

  }
  else {
    res.status(404).json({message:'deal not found'})
  }
});


        app.listen(port, () => console.log('listening on port ' + port));
	})
	.catch(console.error);