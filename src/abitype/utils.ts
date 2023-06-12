export function camelToSnake(camelCaseString: string) {
    if (camelCaseString.length === 0) return camelCaseString;
    const adjust = camelCaseString[0].toLowerCase() + camelCaseString.slice(1);
    return adjust.replace(/[A-Z]/g, (match) => "_" + match.toLowerCase());
}
