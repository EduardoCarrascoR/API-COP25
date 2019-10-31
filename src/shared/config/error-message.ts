import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from './interfaces/error-message.interface';

export const errorMessagesConfig: { [messageCode: string]: IErrorMessages } = {
    'user:create:missingInformation': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user with missing information.',
        userMessage: 'Can not create a user with missing data.'
    },
    'user:create:missingRut': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without rut.',
        userMessage: 'Please enter your rut.'
    },
    'user:create:missingRutValidation': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'You cannot create a new user without a valid rut',
        userMessage: 'Please enter your rut correctly.'
    },
    'user:create:missingName': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without name.',
        userMessage: 'Please enter your name.'
    },
    'user:create:missingFirstSurname': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without first Surname.',
        userMessage: 'Please enter your first Surname.'
    },
    'user:create:missingSecondSurname': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without second Surname.',
        userMessage: 'Please enter your second Surname.'
    },
    'user:create:missingEmail': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without email.',
        userMessage: 'Please enter your email address.'
    },
    'user:create:missingPassword': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without password.',
        userMessage: 'Please enter your password.'
    },
    'user:create:emailAlreadyExist': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user with this email.',
        userMessage: "The email address you provided is already in use."
    },
    'user:show:missingId': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to find the user caused by missing information.',
        userMessage: "Can not find a user without providing an id."
    },
    'user:update:missingInformation': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to update the user caused by missing information.',
        userMessage: "Unable to update the user with missing data."
    },
    'user:update:missingId': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to update the user caused by missing information.',
        userMessage: "Unable to update the user with missing data."
    },
    'user:delete:missingId': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to delete the user caused by missing information.',
        userMessage: "Can not delete a user without providing an id."
    },
    'user:updateState:missingId': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to update state the user caused by missing id.',
        userMessage: "Can not update state a user without providing an id."
    },
    'user:updateState:missingState': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to update state the user caused by missing state.',
        userMessage: "Can not update state a user without providing an state."
    },
    'user:notFound': {
        type: 'notFound',
        httpStatus: HttpStatus.NOT_FOUND,
        errorMessage: 'Unable to found the user with the provided information.',
        userMessage: 'No users found with the information provided.'
    },
    'request:unauthorized': {
        type: 'unauthorized',
        httpStatus: HttpStatus.UNAUTHORIZED,
        errorMessage: 'Access unauthorized.',
        userMessage: 'Unauthorized access.'
    },
    'auth:login:missingEmail': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to connect the user without email.',
        userMessage: 'Please enter your email address.'
    },
    'auth:login:missingPassword': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to connect the user without password.',
        userMessage: 'Please enter your password.'
    },
    'news:create:missingInformation': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a news with missing information.',
        userMessage: 'Can not create a news with missing data.'
    },
    'news:create:missingTitle': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to connect the new without title.',
        userMessage: 'Please enter your title.'
    },
    'news:create:missingDescription': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to connect the new without description.',
        userMessage: 'Please enter your description.'
    },
    'news:create:missingSubTitle': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to connect the new without subTitle.',
        userMessage: 'Please enter your subTitle.'
    },
    'image:create:missingInformation': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a image with missing information.',
        userMessage: 'Can not create a image with missing data.'
    },
    'image:create:missingName': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without name.',
        userMessage: 'Please enter your name.'
    },
    'image:create:missingPath': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without path.',
        userMessage: 'Please enter your path.'
    },
    'image:show:missingId': {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to find the image caused by missing information.',
        userMessage: "Can not find a image without providing an id."
    }
};
