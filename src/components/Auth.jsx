import { useState } from "react"
import { auth, googleProvider} from "../config/firebase/config"
import { createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"

export const Auth = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn = async (e) => {
        e.preventDefault()

        try {
        await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err)
        }

    }

    const signInWithGoogle = async (e) => {
        e.preventDefault()

        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.error(err)
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.error(err)
        }
    }
    
    return (
        <>
            <label>Email</label><br/>
            <input 
            onChange={(e) => {
                setEmail(e.target.value)
            }}
            placeholder="Email..."/><br/>

            <label>Password</label><br/>
            <input 
            onChange={(e) => {
                setPassword(e.target.value)
            }}
            placeholder="Password..."/><br/>

            <button onClick={handleSignIn}>Sign In</button>

            <button onClick={signInWithGoogle}>Sign In with Google</button>
            <button onClick={logOut}>LogOut</button>
        </>
    )
}