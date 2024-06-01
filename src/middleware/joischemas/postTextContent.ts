import joi from 'joi';
export default joi.string().max(256, 'utf8');