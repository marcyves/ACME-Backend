const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models/index');

class UserController {

  constructor() {
    this.User = db.user;
    this.Order = db.order;
    this.basket = [];
  }

  async tobasket(id){
    console.log(`== basket ${id}`);
    this.basket.push(id);
  }

  async basket(){
    this.basket = [];
    return this.basket;
  }

  async checkout(){
    return ['OK'];
  }

  async orders(){
    return this.Order.findAll({
      where: { userId: userId }
    });
  }

  async order(id){
    return this.Order.findAll({
      where: { orderId: id }
    });
    
  }

  async profile(id){
    return this.User.findOne({where: {userId: id}});    
  }

  async crud(){
    return this.User.findAll({});
  }

  async edit(id){
    return this.User.findOne({where: {userId: id}});
  }

  async delete(id){
    await this.User.findOne({
      where: { userId: id }
    }).then((aUser) => {
      this.User.destroy({ where: {userId: id}})
      .then(() => {
          console.log(`-- User [${aUser.firstname} ${aUser.lastname}] effacé`);
      })
      .catch((err) => {
          console.log(`** User [${aUser.firstname} ${aUser.lastname}] non effacé`, err.message);
      });
    })
    .catch((err) => {
        console.log(`** User ${id} non trouvé`);
    });
  return ["OK"];
  }

  async save(data){
    let { surname, firstname, email, pwd, level, cmr } = data;
    console.log(`== userController save name: ${surname} ref: ${ref}`);
    bcrypt.hash(pwd, 10)
    .then(this.#userCreate(hash))
    .catch(error => res.status(500).json({ error }));
    return ["OK"];
  }

  async #userCreate(hash){
    await this.User.create({ 
      surname: surname,
      firstName: firstname,
      email: email,
      pwd: hash,
      pwdDatetime: Date.now(),
      level: level,
      CMR: cmr
     });
  }

  async signin(){
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  }

  async login(requete){
    
    console.log(`== LOGIN email: ${requete.email}, password: ${requete.password}`);
    
    await this.User.findOne({
      where: { email: requete.email }
    }).then(user => {
      console.log(`== user id: ${user.userId} password: ${user.pwd}`);
      if (!user) {
        return { status: 401, retour: 'Utilisateur non trouvé !' };
      }
      var valid = bcrypt.compare(requete.password, user.pwd);
      console.log(`== valid ${valid}`);
      if (valid) {
        console.log('true');
        return { status: 200, retour: json({
          userId: user.userId,
          token: jwt.sign(
            { userId: user._id },
            process.env.TOKEN_KEY,
            { expiresIn: '3600s' }
          )
        }) };
      }else{
        console.log('false');
        return { status: 401, retour: 'Mot de passe incorrect !' };
      };
    })
    .catch(error => {
      return { status: 401, retour: `02 Utilisateur non trouvé ! (${error})` };
    });
    console.log('== LOGIN EXIT');
    return { status: 401, retour: '03 Utilisateur non trouvé !' };
  }

  async logout(){
    if (request.session.userId) {
      delete request.session.userId;
      response.json({result: 'SUCCESS'});
    } else {
        response.json({result: 'ERROR', message: 'User is not logged in.'});
    }    
  }

  async password_1(){
    
  }
  async password_2(data){
    let { email } = data;
    let aUser = await this.User.findOne({where: { email: email }});
  }
  async password_3(){
    
  }
  async password_4(data){
    let { id, pwd } = data;
    let aUser = await this.User.findOne({where: { userId: id }});

    if(aUser){
      console.log(`Modification mot de passe de ${aUser.surname}`);
      bcrypt.hash(pwd, 10)
      .then((hash) =>{
        this.User.update(
          { pwd: hash,
            pwdDatetime: Date.now()
          },
          {where: { userId: id }}
        );
      } )
      .catch(error => res.status(500).json({ error }));
    }

    return ["OK"];
  }

}

module.exports = UserController;