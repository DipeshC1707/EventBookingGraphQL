
const bcryptjs = require('bcryptjs');
const User = require('../../model/user');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: async args => {
        try {
            const userExists = await User.findOne({ email: args.userInput.email });
            if (userExists) {
                throw new Error("User already exists");
            }
            const hash = await bcryptjs.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hash
            })
            const res = await user.save();
            return { ...res._doc, _id: res.id }
        } catch (err) {
            throw err;
        }
    },
    login:async({email,password}) =>{
        const user = await User.findOne({ email: email});
        if(!user){
            throw new Error("User Does Not Exist");
        }
        const isEqual = bcryptjs.compare(password, user.password);
        if(!isEqual){
            throw new Error("Password is Incorrect!");
        }
        const token = jwt.sign({userId: user.id,email: user.email},
            'somesupersecretkey',
            {
                expiresIn:'1h'
            });
        return {userId: user.id, token: token , tokenExpiry:1}
    }
}