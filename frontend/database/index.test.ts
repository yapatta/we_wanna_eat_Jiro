import {categories} from "./index";


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