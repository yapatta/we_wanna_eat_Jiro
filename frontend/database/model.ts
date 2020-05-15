export interface Room{
    name: string;
    admin_uid: string;
    admin: string;
    description: string;
    users: string[];
}

export interface User {
    uid: string;
    nickname: string;
    introduction: string;
    evaluation: number;
}