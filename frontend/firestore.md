Firestoreのルール設定メモ
===

# 運用時

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /categories/{category} {
      allow read: if true; // for debug from jest
      allow write: if false;
      match /rooms/{room} {
        allow read: if true; // for debug from jest
        allow create,update: if request.auth; // join room and create room
        allow delete: if request.auth.uid == resource.data.admin_uid;
      }
    }
  }
}
```

# DB初期化時

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```