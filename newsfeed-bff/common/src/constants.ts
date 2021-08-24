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

export const statusExceptionConst = {
    1000: 'UnexpectedException',
    404: 'NotFoundException',
    400: 'BadRequestException',
    403: 'ForbiddenException',
    500: 'InternalServerErrorException'
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

export function toExceptionConst(e: number): string {
    switch (e) {
        case 400: return statusExceptionConst[e];
        case 403: return statusExceptionConst[e];
        case 404: return statusExceptionConst[e];
        case 500: return statusExceptionConst[e];
        default: return statusExceptionConst[1000];
    }
}
