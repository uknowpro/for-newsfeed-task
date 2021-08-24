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

export const apiHeaderConst = { 
    name: 'Authorization', 
    description: '우측 자물쇠 버튼으로 토큰을 설정해주세요.', 
    example: 'Bearer {token}', 
    schema: { type: 'string', default: 'Bearer {token}' } 
}
