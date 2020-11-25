
export type ObjMap<T> = { [key : string] : T }
export const range = (i : number) : Array<number> => Array(i).map((v, i) => i)

export function map<T, S>(x : ObjMap<T>, f : (key : string, val : T) => S) : ObjMap<S> 
{
    let result : ObjMap<S> = {};
    for (const key in x) {
        result[key] = f(key, x[key])
    }
    return result;
}

export function objJoin(a, b) {
    return {...a, ...b}
}

export function flatMap<T, S>(x : ObjMap<T>, f : (key : string, val : T) => Array<S>) : Array<S>
{
    let result : Array<S> = [];
    for (const key in x) {
        const values = f(key, x[key]);
        result = result.concat(values)
    }
    return result;
}

export function concat<T>(a : Array<T>, b : Array<T>) : Array<T> {
    return a.concat(b);
}
