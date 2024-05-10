import joi from 'joi';
export default joi.string().max(32, 'utf8').min(1).pattern(/^[a-zA-Z0-9_]*$/);