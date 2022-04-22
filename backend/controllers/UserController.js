const jwt = require('jsonwebtoken');

class UserController {

  constructor(userModel, orderModel) {
    this.User = userModel;
    this.Order = orderModel;
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

  async login(email, password){
    User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }else{
            res.status(200).json({
              userId: user.userId,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '3600s' }
              )
            });
          }
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
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