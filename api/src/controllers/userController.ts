import { RequestHandler } from "express";
import { User, IUser } from "../models/user";
import { comparePasswords, hashPassword, signUserToken, verifyUser, decodeUsername, decodeUserId } from "../services/auth";

export const createUser: RequestHandler = async (req, res, next) => {
    const newUser: IUser = new User({
        username: req.body.username,
        password: req.body.password,
        country: req.body.country,
        gender: req.body.gender
    });

    try {
        if (newUser.username && newUser.password && newUser.country && newUser.gender) {
            let hashedPassword = await hashPassword(newUser.password);
            newUser.password = hashedPassword;
            let created = await newUser.save();
            res.status(201).json({
                username: created.username,
                userId: created._id
            });
        }
        else {
            res.status(400).send('Username and password required');
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const loginUser: RequestHandler = async (req, res, next) => {
    let existingUser: IUser | null = await User.findOne(
        { username: req.body.username }
    );

    if (existingUser) {
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);
        
        if (passwordsMatch) {
            let token = await signUserToken(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
}

export const getOneUser: RequestHandler = async (req, res, next) => {
    let itemId = req.params.id;
    let user = await User.findById(itemId);
    res.status(200).json(user);
}

export const returnUser: RequestHandler = async (req, res, next) => {
    let ourToken = req.body.token;

    if (!ourToken) {
        res.status(400).json('No token provided');
    };

    const decodedUsername = await decodeUsername(ourToken);

    if (!decodedUsername) {
        res.status(401).json('Unable to decode username. Bad token?');
    };

    try {
        if (decodedUsername) {
            res.status(200).json({ decodedUsername });
        };
    } catch (err) {
        res.status(500).send(err);
    };
}

export const returnUserId: RequestHandler = async (req, res, next) => {
    let ourToken = req.body.token;

    if (!ourToken) {
        res.status(400).json('No token provided');
    };

    const decodedId = await decodeUserId(ourToken);

    if (!decodedId) {
        res.status(401).json('Unable to decode username. Bad token?');
    };

    try {
        if (decodedId) {
            res.status(200).json({ decodedId });
        };
    } catch (err) {
        res.status(500).send(err);
    };
}