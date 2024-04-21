export interface User {
    username: string,
    password: string,
    fullName?: string,
    email?: string,
    identification?: string,
}

export interface LoginResponse {
    token: string;
    profile: string; // Specify a more detailed type if possible
    user: string;    // Specify a more detailed type if possible
}