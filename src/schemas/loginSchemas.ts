import Joi from "joi";

const SignUpSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	confirmPassword: Joi.ref("password"),
});

const SignInSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});
export {SignUpSchema, SignInSchema};