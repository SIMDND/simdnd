const bcrypt = require('bcryptjs')
module.exports={
    async login(req, res){
        const db = req.app.get('db')
        let {email, password} = req.body;
        let [foundUser] = await db.auth.user_check([email])
        if(!foundUser)return res.status(200).send('invalid email or password')
        let result = bcrypt.compareSync(password, foundUser.user_hash)
        if(result){
            req.session.user = foundUser;
            res.status(200).send({status:'loggedIn', userEmail:req.session.user.user_email, userName: req.session.user_name})
        }else{
            console.log('invalid user or pass')
            res.status(401).send('invalid username or password');
        }
    },
    async register(req, res){
        const db = req.app.get('db')
        let {email, password, userName} = req.body;
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let user = db.auth.create_user([email, userName, hash])
        req.session.user = user;
        res.status(200).send({status:'loggedIn', userEmail:req.session.user.user_email, userName: req.session.user_name})
    }
}