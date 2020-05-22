import {
  selectCategories,
  selectRoomDocument,
  insertRoomDocument,
  updateRoomDocumentWhenLeaved,
  updateRoomDocumentWhenJoined,
  _insertCategoryDocument,
  selectCategory,
  updateUsername,
} from './index';

const developers = [
  '8yIhMQblMofewsdeX1heNEbsoop2',
  'KmIfPpsbS3h91ddQxcc8EgH3DOm2',
  'VtEbFaaE0fY5n0EoMtFt9KzIqBg2',
  'tCwhq7mRfpSU18eNo6lA0R3wj9F3',
];

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const createTestRoomDocument = async () => {
  const v = getRandomInt(developers.length);
  return {
    name: `ラーメン二郎 ${v}号店`,
    admin: `developer[${v}]`,
    adminUid: developers[v],
    description: 'ニンニクヤサイアブラな人募集中！',
    users: [],
  };
};

/**
 * 動作確認用のテストメソッドです。これらはdbとの疎通テスト用に使われます。
 * https://console.firebase.google.com/u/0/project/we-wanna-eat-jiro/database/firestore/
 */
describe('selectCategories が動作すること。', () => {
  test('データ数テスト', async () => {
    const c = await selectCategories();
    const docs = await c.get();

    docs.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  });
});

describe('RoomDocumentの取得メソッドselectRoomDocument が動作すること。', () => {
  test('取得テスト', async () => {
    const rs = await (await selectRoomDocument(2)).get();
    rs.forEach((el) => {
      console.log(el.id, '=>', el.data());
    });
  });
});

/**
 * 存在しているカテゴリ全てに適当なルームを作成します。
 */
describe('RoomDocumentの作成メソッド insertRoomDocument  が動作すること。', () => {
  const MAX_CATEGORIES = 2;
  for (let i = 0; i < MAX_CATEGORIES; ++i) {
    test('投稿テスト', async () => {
      const ret = await insertRoomDocument(i, await createTestRoomDocument());
      // ret.idでDocumentのidを取得できます。
      console.log(ret.id);
    });
  }
});

describe('人間の侵入メソッド updateRoomDocumentWhenJoinedが動作すること。', () => {
  test('退出テスト', async () => {
    await updateRoomDocumentWhenJoined(1, 'aWF0r7FaOvMEh4RN3SVL', {
      uid: 'test uid',
      nickname: 'test nickname',
      introduction: 'Howdy!',
      evaluation: 3,
    });
  });
});

describe('人間の退出メソッド updateRoomDocumentWhenLeavedが動作すること。', () => {
  test('退出テスト', async () => {
    // doc Id決め打ちなのでテストしたい場合は諸々返る必要があります。
    await updateRoomDocumentWhenLeaved(1, 'aWF0r7FaOvMEh4RN3SVL', {
      uid: 'test uid',
      nickname: 'test nickname',
      introduction: 'Howdy!',
      evaluation: 3,
    });
  });
});

/**
 * 元ネタ
 * [もう「飲み会の話題がない」と困らない！盛り上がるネタと会話術25選](https://dekirukaiwajutu.com/category4/)
 * このメソッドをテストするとカテゴリが追加されるので気をつけてください。
 */

describe('カテゴリ追加メソッド', () => {
  const nomikaiSubj = [
    '失敗談',
    '趣味',
    '休日の過ごし方',
    '食べ物',
    'お酒',
    '美容',
    '出身地',
    '恋愛',
    'テレビ',
    'スポーツ',
    '昔話',
  ];
  jest.setTimeout(1000000);
  test('カテゴリ追加', async () => {
    for (let i = 0; i < nomikaiSubj.length; i++) {
      const c = {
        cid: i,
        name: nomikaiSubj[i],
        description: `${nomikaiSubj[i]}について話しましょう！`,
        rooms: [],
      };
      // doc id指定してdocument
      await _insertCategoryDocument(i, c);
      const doc = await selectCategory(i);
      await doc.collection('rooms').add(await createTestRoomDocument());
    }
  });
});

/**
 * ルールをガバガバにしないとこれは叩け無い
 */
describe('ニックネームのアップデートメソッド', () => {
  test('アップデートテスト', async () => {
    await updateUsername('dGBaomqi1oddIrnj4wVuZtbaZWJ2', 'test hoge太郎');
  });
});
