export default async function validate(schema, value) {
    try {
       await schema.validate(value, {abortEarly: false})
       return {}
      } catch(err) {
        return err.inner.reduce((acc, current) => ({ ...acc, [current.path]: current.errors }) , {})
      }
}