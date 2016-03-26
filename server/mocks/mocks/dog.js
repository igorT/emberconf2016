module.exports = function(app) {
  var data = [
      {id:"1",  name: 'dog1', image: "http://i3.kym-cdn.com/photos/images/newsfeed/000/217/040/48ACD.png", likes_cats: true, plays_fetch: false},
      {id: "2", name: 'dog2', image: "http://www.ljplus.ru/img4/m/i/mister_trash/tumblr_lht7cvv39S1qamjl2o1_1280.jpg_AWSAccessKeyId_AKIAJ6IHWSU3BX3X7X3Q-Expires_1302934942-Signature_T1_2B9PPWHwEePu4hsLHTosJKnli4_3D", likes_cats: false, plays_fetch: true},
      {id: "3", name: 'dog3', image: "http://i.imgur.com/sCcYF.jpg", likes_cats: true, plays_fetch: true},
      {id: "4", name: 'dog4', image: "http://i.imgur.com/bRwvu16.jpg", likes_cats: true, plays_fetch: true}
    ];
  var express = require('express');

  var dogRouter = express.Router();

  dogRouter.get('/', function(req, res) {
    res.send(data);
  });
  dogRouter.get('/:id', function(req, res) {
    var id = req.params.id;
    id = parseInt(id);
    for(var i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        res.send(data[i]);
        return;
      }
    }
    //send error
  });
  dogRouter.delete('/:id', function(req, res) {
    var id = req.params.id;
    id = parseInt(id);
    for(var i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data.splice(i, 1);
        res.send();
        return;
      }
      //send erro
      res.send();
    }
  });
  dogRouter.put('/:id', function(req, res) {
    var id = req.params.id;
    id = parseInt(id);
    for(var i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data[i] =  req.body;
        res.send();
        return;
      }
      //send error
      res.send();
    }
  });
  dogRouter.post('/', function(req, res) {
    var dog = req.body;
    dog.id = data.length;
    data.push(dog);
    res.send(dog);
  });
  app.use('/api/dogs', dogRouter);
};
