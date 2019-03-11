echo $PWD

# default
ENDPOINT=${ENDPOINT:='https://dev.pycon.kr/api/graphql'}

echo $ENDPOINT
apollo service:download --endpoint=$ENDPOINT graphql_schema.json
apollo client:codegen \
  --target typescript \
  --endpoint=$ENDPOINT \
  --outputFlat \
  --includes="lib/apollo_graphql/**/*" \
  --localSchemaFile="graphql_schema.json" \
  lib/apollo_graphql/__generated__
