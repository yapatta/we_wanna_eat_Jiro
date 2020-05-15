import {categories, createRoom, joinRoom, leaveRoom, rooms} from "./index";
import DocumentData = firebase.firestore.DocumentData;
import {Room} from "./model";

/**
 * 動作確認用のテストメソッドです。これらはdbとの疎通テスト用に使われます。
 * https://console.firebase.google.com/u/0/project/we-wanna-eat-jiro/database/firestore/
 */
describe('categories が動作すること。', () => {
    test('データ数テスト', async () => {
        const c = await categories();
        const docs = await c.get();

        docs.forEach(doc => {
            console.log(doc.id,'=>',doc.data());
        })

        expect(docs.docs.length).toEqual(2);
    })

})

describe('roomの取得メソッドrooms が動作すること。', () => {
    test('データ数テスト', async () => {
        const rs = await (await rooms(2)).get();
        rs.forEach(el => {
            console.log(el.id,'=>',el.data())
        })
        expect(rs.docs.length).toEqual(2);
    })
})

describe('roomの作成メソッド createRoom が動作すること。', () => {
    test('投稿テスト', async () => {
        const room:Room = {
            name : "test_room",
            admin: "test_admin",
            admin_uid: "test_uid",
            description: "test_description",
            users: []
        }
        await createRoom(2,room);
    })
})

describe('leaveRoom 人間の退出メソッド', () => {
    test('退出テスト', async () => {
        await leaveRoom(2,"uw7D5CSkHs8qcyRMncMw",{
            uid: "test uid",
            nickname: "test nickname",
            introduction: "Howdy!",
            evaluation: 3
        })
    })
})