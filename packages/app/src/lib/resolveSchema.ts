import { ZodError, ZodSchema } from 'zod';

export function resolveSchema(schema: ZodSchema<any>) {
    return async (data: any) => {
        try {
            schema.parse(data);
            return;
        } catch (e) {
            if (e instanceof ZodError) {
                return Object.entries(e.errors).reduce((acc, [key, value]) => {
                    acc[key] = value.message;
                    return acc;
                }, {});
            }
            return {};
        }
    };
}
