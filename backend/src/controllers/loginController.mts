import User from "../models/userSchema.mjs";
import bcrypt from "bcryptjs";
import { convertDbUserToDto } from "./registerController.mjs";


export const login = async (email: string, password: string) => {
    const foundUser = await User.findOne({ email: email });

    if (!foundUser) throw Error("Did not find user with email " + email);

    const success = await bcrypt.compare(password, foundUser.password);

    if (success) {
        return convertDbUserToDto(foundUser);
    } else {
        return null;
    }
};