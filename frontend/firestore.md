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
        allow create: if request.auth.uid != null; // join room and create room
        allow update: if request.auth.uid != null  &&
                         request.resource.data.users.size() <= 4;
        allow delete: if request.auth.uid == resource.data.admin_uid;
      }
    }
    match /users/{user} {
      allow read: if true;
      allow create: if request.auth.uid != null; 
      allow update: if request.auth.uid == resource.data.uid;
      allow delete: if false; // deleteいらんでしょうw
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