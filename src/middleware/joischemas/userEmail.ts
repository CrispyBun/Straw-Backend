import joi from 'joi';
export default joi.string().max(128, 'utf8').min(1).email();