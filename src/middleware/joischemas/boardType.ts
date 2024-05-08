import joi from 'joi';
export default joi.string().valid('official', 'usermade', 'profile');