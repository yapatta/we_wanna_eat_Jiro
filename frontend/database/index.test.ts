import {categories, rooms} from "./index";
import DocumentData = firebase.firestore.DocumentData;


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

describe('rooms が動作すること。', () => {
    test('データ数テスト', async () => {
        const rs = await (await rooms(2)).get();
        expect(rs.docs.length).toEqual(2);
    })
})