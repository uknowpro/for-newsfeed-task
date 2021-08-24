export const errorResponseConst = { 
    errorType: { type: 'string' }, 
    errorMessage: { type: 'string' }, 
    errors: { type: 'array', example: [] } 
};

export const exceptionConst = {
    UnexpectedException: 'UnexpectedException',
    NotFoundException: 'NotFoundException',
    BadRequestException: 'BadRequestException',
    ForbiddenException: 'ForbiddenException',
    InternalServerErrorException: 'InternalServerErrorException'
}

export const errorMessageConst = {
    BadRequest: 'Bad request.',
    NotFound: 'Not found.',
    InternalServerError: 'Internal server error.',
    Forbidden: 'Forbidden.',
    Unexpected: 'Unexpected exception arise.'
}
