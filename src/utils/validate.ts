import { ObjectSchema, ValidationError } from "yup"

export default async function validate(schema: ObjectSchema<Record<string, any>>, value: Record<string, any>) {
    try {
       await schema.validate(value, {abortEarly: false})
       return {}
      } catch(err) {
        if (err instanceof ValidationError) {
          return err.inner.reduce((acc, current) => ({ ...acc, [current.path!]: current.errors }) , {})
        }
        
        return {};
      }
}