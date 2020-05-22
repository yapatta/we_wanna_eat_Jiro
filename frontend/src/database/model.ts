export interface RoomDocument {
  name: string;
  adminUid: string;
  admin: string;
  description: string;
  users: UserDocument[];
}

export interface UserDocument {
  uid: string;
  nickname: string;
  introduction: string;
  evaluation: number;
}

export interface CategoryDocument {
  cid: number;
  name: string;
  description: string;
}

export interface RoomCardProp extends RoomDocument{
  cid: number;
  rid: string;
}

