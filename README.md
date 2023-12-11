# 각 피드를 가져와서 잔디에 webhooks을 연결하거나 문자열로 받을지 여부에 따라서 다르게 리턴해주는 라이브러리

## 사용설명서

1. 함수 인자에 대한 type

```typescript
  // 연결할 feed url
  url: string;

  // html tag가 있는 string 받을 지 아니면, string으로 받을 지 여부
  htmlParser?: string;

  // 잔디 url을 넣을 지 말지, 잔디 url이 없으면 return을 해줌
  jandi?: string[];
```

2. 사용 설명서

```javascript
geekNewsRSS({
  url: "",
  htmlParser: undefined,
  jandi: undefined,
});
```

3. return 방식

- 잔디 url이 있으면 잔디로 내용을 보낸다.
- 잔디 url이 없다면, parser 여부에 따라 html이나, string을 return 해줌
