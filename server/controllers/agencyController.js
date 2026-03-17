import Agency from "../models/Agency.js";
import User from "../models/User.js";

//Register a new agency
 export const agencyReg = async (req, res) => {
    try {
        const {name, email, address, contact, city} = req.body
        const owner = req.user._id

        //Check if your user has already registerd agency
        const agency = await Agency.findOne({owner})
        if(agency){
            return res.json({success: false, message: "Agency already registered."})
        }

        await Agency.create({name, email, contact, city, address})
        await User.findByIdAndUpdate (owner, {role:"AgencyOwner"})

        res.json({success: true, message: "Agency registered successfully."})
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
 }