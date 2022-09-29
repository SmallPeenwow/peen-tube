import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10); // For encryption
		const hash = bcrypt.hashSync(req.body.password, salt); // What will be encrypted

		const newUser = new User({ ...req.body, password: hash });

		await newUser.save(); // Will save to mongoDB
		res.status(200).send('User has been created');
	} catch (err) {
		next(err);
	}
};

export const signin = async (req, res, next) => {
	try {
		const user = await User.findOne({ name: req.body.name }); // Finds the user by using name

		if (!user) return next(createError(404, 'User not found'));

		const isCorrect = await bcrypt.compare(req.body.password, user.password); // Compares password in database from user

		if (!isCorrect) return next(createError(400, 'Wrong credentials'));

		const token = jwt.sign({ id: user._id }, process.env.JWT);

		// Makes sure password is not sent to the user
		const { password, ...others } = user._doc;

		// Creates cookie to identify users
		res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.status(200)
			.json(others);
	} catch (err) {
		next(err);
	}
};
