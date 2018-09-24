const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');
//get a list of ninjas from database
router.get('/ninjas',function(req,res){
/*Ninja.find({}).then(function(ninjas){
 res.send(ninjas);
});*/
/*Ninja.geoNear(
  {type:'Point',coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
  {maxDistance:100000,spherical:true}
).then(function(ninjas){
  res.send(ninjas);
});*/

Ninja.aggregate(
        [
            {
                '$geoNear': {
                    'near': {type:'Point',coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
                    'spherical': true,
                    'distanceField': 'dist',
                    'maxDistance': 100000
                }
            }
        ]).then(function(ninjas){
          res.send(ninjas);
        });

});

//add new ninjas to the db
router.post('/ninjas',function(req,res,next){
  //console.log(req.body);
   Ninja.create(req.body).then(function(ninja){
   res.send(ninja);
 }).catch(next);
});

//update a ninja in the db
router.put('/ninjas/:id',function(req,res){
  Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    Ninja.findOne({_id:req.params.id}).then(function(ninja){
      res.send(ninja);
    });
  });
});

//delete a ninja from the db
router.get('/ninjas/:id',function(req,res){
  res.send({type:'DELETE'});
});

router.delete('/ninjas/:id',function(req,res){
  Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
    res.send(ninja);
    console.log(ninja);
  });
  res.send({});
});

module.exports = router;
