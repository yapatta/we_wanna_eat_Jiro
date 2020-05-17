export interface RoomDocument {
    name: string;
    admin_uid: string;
    admin: string;
    description: string;
    users: string[];
}

export interface UserDocument {
    uid: string;
    nickname: string;
    introduction: string;
    evaluation: number;
}