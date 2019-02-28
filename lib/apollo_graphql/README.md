## Apollo Client 사용방법

### 1. Graphql Query 혹은 Mutation 작성

- *.graphql 파일명으로 Graphql Server 로 보낼 Query 혹은 Mutation을 정의합니다.

```graphql
query getData {
    data {
        field1
        field2
        field3
        ...
    }
}
```

### 2. Graphql Type 생성

- `/lib/apollo_graphql/apollo_codegen.sh` 파일을 실행해 Graphql 타입을 생성합니다.
- 생성된 타입은 `lib/apollo_graphql/__generated__/`에 생성됩니다.

### 3. Graphql 호출 메소드 정의

- `1`과 `2`에서 만들었던 graphql query 혹은 mutation과 graphql 타입을 사용해 최종적으로 Graphql 호출 메소드를 정의합니다.
- `lib/apollo_graphql/queries`와 `lib/apollo_graphql/mutations` 폴더에는 각각 `__base__.ts` 파일이 있으며 이 파일들에 선언된 기본적인 Query 및 Mutation 메소드를 이용해 아래와 같이 Graphql 호출 메소드를 생성해 줍니다.


>Query Example

```typescript
import {
  getData as getDataType,
  getData_data as DataType,
} from 'lib/apollo_graphql/__generated__/getData'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getData from './_getSponsors.graphql'

export const getDataQueryDefinition = createQueryDefinition<
  getDataType,
  {}
>(_getData)

export const getData = sendQuery(
  getDataQueryDefinition,
)

export {
  DataType,
}
```

> Mutation Example

```typescript
import {
    updateData as updateDataType,
    updateData_updateData as DataType,
    setDatahVariables as updateDataVariablesType,
  } from 'lib/apollo_graphql/__generated__/updateData'
import {
    createMutationDefinition,
    sendMutation,
  } from '../mutations/__base__'
import * as _updateData from './_updateData.graphql'

export const updateDataMutationDefinition = createMutationDefinition<
    updateDataType,
    updateDataVariablesType
  >(_updateData)

export const updateData = sendMutation(
  updateDataMutationDefinition,
)

export {
  DataType,
}
```

