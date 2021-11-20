# 🌟 솝커톤 8조 Server repo 🌟

# Service Name, description / 서비스 이름과 소개

🔥Project Title: 전남친 토스트  
📜description: 전남친 토스트 그리워 하지말고, 깔끔하게 잊어먹자 !

## Development Part / 각자 개발 담당 부분

이 곳에서 각자 개발 담당 부분 정리입니다.

- 이제준
  - api/routes/lover/trashPOST
  - api/routes/post/postSuggestPOST
- 최진영
  - api/routes/suggest/suggestIdGET
  - api/routes/post/postIdGET

## Code Convention / 코드 컨벤션

- Feat: 새로운 기능 추가
- Fix: 버그를 고친 경우
- Style: 코드 포맷 변경
- Refactor: 코드 리팩토링
- Merge: 브랜치 머지
- Docs: 문서 작성
- Rename: 파일, 클래스, 메서드명, 폴더명 수정
- Chore: 설정 파일 등

## branch strategy / 브랜치 전략

- main
- feat/feature_name
- 해당 기능 작업 후 main에 merge

## folding project / 프로젝트 폴더링

```
Cocktail_server
|
|- .github
|
|- functions
      |
      |
      |- api
          |- routes
              |- post
              |- suggest
      |- config
      |- constants
      |- lib
      |- db
```

## package.json / package.json 캡쳐

![package-json](https://user-images.githubusercontent.com/81547780/142740656-9ed9d7ea-5381-43c6-9da9-2d835e8a0644.PNG)

## ERD / ERD 캡쳐

![ERD](https://user-images.githubusercontent.com/81547780/142740678-21204a1a-33eb-4a2b-bc0a-8af41cbc73b3.PNG)

## API Specification / API 명세서(Route List)

### Datagrip Table 노션에 있습니다.

https://www.notion.so/4d03a0e205ea48b3a112166414006b9e?v=7fcb8363b9814d548583d452edc6585c

## Base URI / Base URI 링크

https://asia-northeast3-wesopt29-328c5.cloudfunctions.net/api
