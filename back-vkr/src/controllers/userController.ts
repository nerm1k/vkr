import UserService from "../services/userService";
import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/enums";

export default class UserController {
    userService: UserService;

    constructor (userService: UserService) {
        this.userService = userService;
    }

    registerUser = async (req: Request, res: Response) => {
        try {
            const {username, email, password} = req.body;
            const user = await this.userService.registerUser(username, email, password);

            if (user) {
                res.status(HttpStatusCode.CREATED).json({ message: 'User registered', user: user});
            } else {
                res.status(HttpStatusCode.CONFLICT).json({ message: 'Error' });
            }
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    loginUser = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const user = await this.userService.loginUser(username, password);

            if (user == undefined) {
                res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User does not exist' });
            } else if (user == 401) {
                res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Invalid credentials' });
            } else {
                res.status(HttpStatusCode.OK).json({ message: 'Logged in', jwtToken: user.jwtToken});
            } 
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    logout = async (req: Request, res: Response) => {
        res.json({ message: 'Logged out' });
    }
}