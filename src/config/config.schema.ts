import Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  PREFIX_NAME: Joi.string().required(),
  APP_KEY: Joi.string().required(),
  GATEWAY_URL: Joi.string().uri().required(),
  MONGO_URL: Joi.string(),
});
