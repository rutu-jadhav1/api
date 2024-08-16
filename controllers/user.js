import User from "../models/User.js"
import bcrypt from 'bcrypt'

const saltRounds = 10;
const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds)
}

const postUser = async (req, res) => {
    const { Name, email, password, Age, Address } = req.body

    const user = new User({
        Name,
        email,
        password: await hashPassword(password),
        Age,
        Address
    })
    try {
        const savedUser = await user.save();

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: savedUser
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message,
            data: null
        })
    }

}

const getUser = async (req, res) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        message: "All User fetched",
        users: users.map(user => ({
            Name: user.Name,
            email: user.email,
            Age: user.Age,
            Address: user.Address,
            _id: user._id,
            _v: user._v
        }))
    })
}

const getUserI = async (req, res) => {
    const { id } = req.params;
    console.log("userID", id)

    const user = await User.findById(id);

    const userData = {
        Name: user.Name,
        email: user.email,
        password: await hashPassword(user.password),
        Age: user.Age,
        Address: user.Address,
        _id: user._id,
        _v: user._v
    }
    if (!user) {
        res.status(404).json({
            success: false,
            data: null,
            message: "user not found"
        })
    }
    res.status(200).json({
        success: true,
        data: userData,
        message: "All User fetched"
    })
}

const updateUser = async (req, res) => {
    const { Name, email, password, Age, Address } = req.body;
    const user = await User.findById(req.params.id)

    if(!user){
        return res.status(404).json({
            success : false,
            data : null,
            message : "user not found"
        })
    }
    
    user.Name = Name || user.Name
    user.email = email || user.email
    user.Age = Age || user.Age
    user.Address = Address || user.Address
    if(password){
        user.password = password || user.password
        return res.status(400).json({
            success : false,
            data : null,
            message : 'Password can not be updated'
        })
    }
    await user.save()

    res.status(200).json({
        success : true,
        message : 'User updated successfully !',
        user : user
    })
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.deleteOne({ _id: id })
    res.status(200).json({
        success: true,
        data: null,
        message: "User deleted Successfully"
    })
}
 
const userLogin = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({  email  })

    if(!user)
    {
       return res.status(404).json({
            success : false,
            data : null,
            message : "User not found"
        })
    } 
    const checkPassword = await bcrypt.compare(password,user.password)
    if(!checkPassword){
        return res.status(401).json({
            message : "Invalid Password"
        })
    }
    res.status(200).json({
        message : 'User Login Successful',
        user : user
    })
}

export { postUser, getUser, getUserI, updateUser, deleteUser, userLogin }