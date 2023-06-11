const uuid=require('uuid').v4
const express = require('express')
const app = express()
const port = 5000
const mongoDB=require("./db")
const paymentController=require('./Routes/paymentController')
mongoDB();

  
   let paytmParams = {};
   let paytmMerchantId="FUKAcs67157862624795"

app.use ((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));

app.post('/orders',paymentController.orders)
app.post('/verify',paymentController.verify)
// paytmParams['MID'] = paytmMerchantId,
// paytmParams['WEBSITE'] = 'DIYtestingweb',
// paytmParams['CHANNEL_ID'] = 'WEB',
// paytmParams['INDUSTRY_TYPE_ID'] = 'Retail',
// paytmParams['ORDER_ID'] = uuid(),
// paytmParams['CUST_ID'] = 'FUKAcs67157862624795',
// paytmParams['TXN_AMOUNT'] = '100',
// paytmParams['CALLBACK_URL'] = 'http://localhost:5000/callback'
// paytmParams['EMAIL'] = 'kuku12@gmail.com'
// //paytmParams['MOBILE_NO'] = '1234567852'
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

