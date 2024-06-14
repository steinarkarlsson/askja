import { ZodError, ZodSchema } from 'zod';

export function validateSchema(data: any, schema: ZodSchema<any>) {
    try {
        schema.parse(data);
        return {};
    } catch (e) {
        if (e instanceof ZodError) {
            return Object.entries(e.errors).reduce((acc, [key, value]) => {
                acc[key] = value.message;
                console.log(acc)
                return acc;
            }, {});
        }
        console.log(e);
        return e;
    }
}
