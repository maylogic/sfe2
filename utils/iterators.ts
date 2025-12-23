export function* circularIterator<T>(arr: T[]): Generator<T, T | undefined> {
    if (arr.length === 0) return undefined;
    let i = 0;
    while (true) yield arr[i++ % arr.length] as T;
}