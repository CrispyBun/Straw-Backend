import joi from 'joi';
export default joi.string().max(64, 'utf8').min(8);