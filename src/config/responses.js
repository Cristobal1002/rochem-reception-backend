import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';

export const success =  (req, res, data) => {
    res.status(StatusCodes.OK).send({
        stamp: new Date(),
        status: ReasonPhrases.OK,
        code: StatusCodes.OK,
        data: data || null,
        error: null,
    });
};

export const error = (req, res, error) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        stamp: new Date(),
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
        error: error || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
};

export const unauthorized = (req, res, error) => {
    res.status(StatusCodes.UNAUTHORIZED).send({
        stamp: new Date(),
        status: ReasonPhrases.UNAUTHORIZED,
        code: StatusCodes.UNAUTHORIZED,
        data: null,
        error: error || ReasonPhrases.UNAUTHORIZED,
    });
}

export const warning = (req, res, msj) => {
    res.status(StatusCodes.BAD_REQUEST).send({
        stamp: new Date(),
        status: ReasonPhrases.BAD_REQUEST,
        code: StatusCodes.BAD_REQUEST,
        data: null,
        error: msj,
    });
};