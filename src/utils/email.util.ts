//Email regex
export function isEmailValid(email: string): boolean {
    return /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(email);
}