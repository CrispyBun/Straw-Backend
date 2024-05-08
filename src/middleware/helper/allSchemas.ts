import joi from 'joi';
import boardName from '../joischemas/boardName';
import boardSummary from '../joischemas/boardSummary';
import boardType from '../joischemas/boardType';
import userEmail from '../joischemas/userEmail';
import userPassword from '../joischemas/userPassword';
import userUsername from '../joischemas/userUsername';

export const schemas: {[id: string]: joi.Schema} = {
    boardName: boardName,
    boardSummary: boardSummary,
    boardType: boardType,
    email: userEmail,
    password: userPassword,
    username: userUsername
}

export const renames: {[id: string]: string} = {
    boardName: "name",
    boardSummary: "summary",
    boardType: "type"
}