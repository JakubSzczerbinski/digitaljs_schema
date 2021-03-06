import Ajv from 'ajv';
import { Digitaljs } from './types';
import schema from './schema';

const pretty_str = (obj : any) => JSON.stringify(obj, undefined, 4)
const ajv = new Ajv({jsonPointers: true});
const validate = ajv.compile(schema);

export const isDigitaljs = (obj : any) : obj is Digitaljs => {
  if (validate(obj))
    return true;
  else {
    return false;
  }
}

export const assertIsDigitaljs = (obj : any) : obj is Digitaljs => {
  if (validate(obj)) {
    return true;
  }

  throw new Error(`
  Failed to validate: 
${pretty_str(obj)}
  with errors: 
${pretty_str(validate.errors)}
`);
}

export const asDigitaljs = (obj: any) : Digitaljs => {
  if (validate(obj)) {
    const djs : Digitaljs = obj;
    return djs;
  }
  else 
    throw new Error(`
  Failed to validate: 
${pretty_str(obj)}
  with errors: 
${pretty_str(validate.errors)}
`);
}

export const parseDigitaljs = (text : string) : Digitaljs => {
  const json : any = JSON.parse(text);
  if (isDigitaljs(json))
    return json;
  else
    throw "Failed to validate against digitaljs schema";
}
