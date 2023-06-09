const mongoose = require('mongoose');
const mongoURI = 'mongodb://mealmonkey:mealmonkey@ac-zyjvqhd-shard-00-00.64ztodp.mongodb.net:27017,ac-zyjvqhd-shard-00-01.64ztodp.mongodb.net:27017,ac-zyjvqhd-shard-00-02.64ztodp.mongodb.net:27017/mealmonkey?ssl=true&replicaSet=atlas-pkizuq-shard-0&authSource=admin&retryWrites=true&w=majority'

const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true },  (err, result) => {
        if (err) console.log("---", err)
        else {     
            console.log("connected");            
            const fetched_data =  mongoose.connection.db.collection("food_data");
            fetched_data.find({}).toArray(async function(err,data){
                const canteen = await mongoose.connection.db.collection("canteen_names");
                canteen.find({}).toArray(function(err,canData){
                         
                    if(err) 
                       console.log(err);
                    else{
                        global.food_items=data;
                        global.can_names=canData;
                    }
                })                
                
                
                // if (err) console.log(err);
                // else {
                // global.food_items=data;
                
              
                 //console.log(global.food_data);
           // }

               
        })


        }
    });
}

module.exports = mongoDB;