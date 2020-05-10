import {categories, rooms} from "./index";


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
        const j = await rooms(1);
        console.log(j);
    })

})