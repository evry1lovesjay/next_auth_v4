"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/userModel";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import CryptoJS from "crypto-js";
import { generateToken, verifyToken } from "@/utils/token";
import sendEmail from "@/utils/sendEmail";


const BASE_URL = process.env.NEXTAUTH_URL

export async function updateUser ({name, image}){

    try {
        const session = await getServerSession(authOptions)
        if(!session) throw new Error("Unauthorized!, get lost!!!")

        const user = await User.findByIdAndUpdate(session?.user?._id,
            {name, image},
        {new: true}).select("-password")

        if(!user) throw new Error("Email does not exist!")

        return {msg: "Profile Updated Successfully!"}
    } catch (error) {
        redirect(`/errors?error=${error.message}`)
        console.log(error)
    }
}

export async function signUpWithCredentials (data){
    try {
        const user = await User.findOne({email:data.email})
        if(user) throw new Error("Email already exists!")

        if(data.password){
            data.password = await CryptoJS.AES.encrypt( data.password, 
                process.env.PASSWORD_SEC).toString()
        }

        const token = generateToken({user: data})

        await sendEmail({
            to: data.email,
            url: `${BASE_URL}/verify?token=${token}`,
            text: "VERIFY EMAIL"
        })

        console.log({data})

        return {msg: "Sign Up Successful!, Please check your email to complete the verification process."}
    } catch (error) {
        redirect(`/errors?error=${error.message}`)
        console.log(error)
    }
}

export async function verifyWithCredentials (token){
    try {
        const {user} = verifyToken(token)

        const userExist = await User.findOne({email: user.email})

        if(userExist) return {msg: "Verification Successful!!!."}

        const newUser = new User(user)

        await newUser.save()

        return {msg: "Verification Successful!!!."}
    } catch (error) {
        redirect(`/errors?error=${error.message}`)
        console.log(error)
    }
}

export async function changePasswordWithCredentials ({old_pass, new_pass}){

    try {

        const session = await getServerSession(authOptions)

        if(!session) throw new Error("Unauthorized Action!!!, get lost!!!")

        if (session?.user?.provider !== "credentials"){
            throw new Error(`This account is signed in with ${session?.user?.provider}. You can't use this function!`)
        }

        const user = await User.findById(session?.user?._id)
        if(!user) throw new Error("User does not exist!")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SEC);

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
    
        if(originalPassword !== old_pass) throw new Error("Old Password incorrect!")

        const newPass = await CryptoJS.AES.encrypt( new_pass, 
            process.env.PASSWORD_SEC).toString()

        await User.findByIdAndUpdate(user._id, {password: newPass})
        
        return {msg: "Password changed Successfully!!!."}
    } catch (error) {
        redirect(`/errors?error=${error.message}`)
        console.log(error)
    }
}


export async function forgotPasswordWithCredentials ({email}){

    try {

        const user = await User.findOne({email})
        if(!user) throw new Error("Email does not exist!")

        if (user?.provider !== "credentials"){
            throw new Error(`This account is signed in with ${user?.provider}. You can't use this function!`)
        }

        const token = generateToken({userId: user._id})

        await sendEmail({
            to: data.email,
            url: `${BASE_URL}/reset_password?token=${token}`,
            text: "RESET PASSWORD"
        })
       
        return {msg: "Success!, Kindly check your email to reset your password."}
    } catch (error) {
        redirect(`/errors?error=${error.message}`)
        console.log(error)
    }
}

export async function resetPasswordWithCredentials ({token, password}){

    try {
        const {userId} = verifyToken(token)

        const newPass = await CryptoJS.AES.encrypt(password, 
            process.env.PASSWORD_SEC).toString()
        
        await User.findByIdAndUpdate(userId, {password: newPass})
       
        return {msg: "Password reset successfully!!!... Go and forget no more with your small brain"}
    } catch (error) {
        redirect(`/errors?error=${error.message}`)
        console.log(error)
    }
}
