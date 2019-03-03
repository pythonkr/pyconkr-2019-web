## MobX Store 기본 작업 방법

### 1. Typescript Class 생성

타입스크립트 클래스를 생성합니다. 클래스는 `export` 하고, Singleton 방식으로 아래와 같이 `new AuthStore()` 객체를 생성해 내 보내 줍니다. 

```typescript
export class PyconStore {
}

export default new PyconStore()
```

### 2. State and Action 생성

- @observable 데코레이션을 사용해 MobX State를 선언한 뒤 아래처럼 타입을 함께 지정해 줍니다.
- @action 데코레이터를 이용해 State 변경에 필요한 Action을 선언 및 정의해 줍니다.
- @computed 데코레이터를 사용해 현재 정의된 State를 사용해 계산을 수행할 수 있습니다. 단, State값에는 변경이 일어나지 않습니다.

```typescript
export class PyconStore {
  @observable someState: boolean = false
  @observable someState2: string = 'pending' 
  @observable someState3: number = 0

  @action
  someActions () {
    ...
  }

  @computed
  get someComputed() {
      return this.someState3 * 3;
  }
}
...
```

### 3. Async 액션 사용 시

- Async 액션이 필요할 경우 아래와 같이 `async/await` 키워드를 사용하면 됩니다.
- [`plugin-transform-async-to-generator`](https://babeljs.io/docs/en/babel-plugin-transform-async-to-generator) 패키지로 인해 Async 액션 후 State 변경 시 MobX [`runInAction`](https://mobx.js.org/best/actions.html) 을 사용하지 않고 `async/await` 키워드만으로 Generator 사용이 가능합니다.

```typescript
export class PyconStore {
  ...

  @action
  async someActions () {
    const result = await asyncFetchSomething()
    return result
  }
}
...
```

### 3. Graphql 클라이언트 호출

GraphQL 클라이언트를 사용할 때는 아래 순서로 진행합니다.

1) Apollo Client 임포트
2) Apollo Query 혹은 Mutation 을 임포트
3) @action MobX 데코레이터를 사용해 Graphql 액션을 생성해 줍니다.
3) 아래와 같이 먼저 임포트한 Graphql Query에 Apollo Client를 먼저 넘겨 준 뒤 필요한 Graphql Variables (파라미터)를 보내줍니다. 만약, Variables가 필요 없을 경우 `{}` 와 같이 빈 값을 보내줍니다.  

```typescript

import { client } from 'lib/apollo_graphql/client'
import { getDataFromGraphql } from 'lib/apollo_graphql/query/getDataFromGraphql'



export class PyconStore {
  ...

    @action
    async graphqlAction () {
    
        const result = await getDataFromGraphql(client)({ parameter1, parmeter2, ...})
        return result
    }

}
...
```

### 4. 더 알아보기

MobX에 대해서 더 많은 것을 보길 원하신 다면 아래 공식문서 링크를 통해 알아보실 수 있습니다.

https://mobx.js.org/index.html