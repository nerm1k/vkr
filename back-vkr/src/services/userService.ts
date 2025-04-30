import UserModel from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isValidLogin, isValidNewUser } from "../utils/validations";

export default class UserService {
    userModel: UserModel;

    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }

    async registerUser(username: string, email: string, password: string) {
        if (!isValidNewUser(username, email, password)) {
            return null;
        }

        const isUsernameExists = await this.userModel.findUserByAttribute('username', username);
        const isEmailExists = await this.userModel.findUserByAttribute('email', email);

        if (isUsernameExists || isEmailExists) {
            return;
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS!);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await this.userModel.createUser(username, email, hashedPassword);
        return user;
    }

    async loginUser(username: string, password: string) {
        if (!isValidLogin(username, password)) {
            return;
        }
        
        const user = await this.userModel.findUserByAttribute('username', username);
        if (!user) {
            return;
        }

        const isSameUser = await bcrypt.compare(password, user.password);
        if (!(user && isSameUser)) {
            return 401;
        }

        const secretKey = process.env.SECRET_KEY!;
        const jwtToken = jwt.sign({id: user.user_id, username: user.username}, secretKey, {expiresIn: '1h'});
        return {user, jwtToken};
    }
}