import type {ObjectSchema, ValidationError} from 'joi';

export function validateSchema<Props>(
  schema: ObjectSchema,
  props: Record<string, unknown>
): Props {
  if (!props) {
    props = {};
  }

  const {error, value} = schema.validate(props, {
    abortEarly: true,
    allowUnknown: true,
  }) as {error: ValidationError; value: Props};

  if (error) {
    throw new Error(error.details[0].message);
  }

  return value;
}
