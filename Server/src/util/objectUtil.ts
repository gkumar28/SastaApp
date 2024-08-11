export const filterObj = (input: any, allowedFields : string[]) => {
    return Object.fromEntries(
        Object.entries(input)
            .filter(([key, value]) => allowedFields.includes(key) && value != null)
    );
}