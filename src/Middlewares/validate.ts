import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export function validate(schema: ZodSchema) {
    return (request: Request, response: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: request.body,
                params: request.params,
                query: request.query,
            });

            next();
        } catch(error) {
            next(error);
        }
        
    }
}