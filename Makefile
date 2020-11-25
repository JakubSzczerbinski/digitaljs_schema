
.PHONY: build_all test

BUILD_SRC = $(wildcard src/*)
BUILD_TARGETS = \
	$(addprefix build/,$(addsuffix .js,$(notdir $(basename ${BUILD_SRC}))))

src/schema.ts: src/types.ts
	(echo 'export default' && ./node_modules/ts-json-schema-generator/bin/ts-json-schema-generator --path 'src/types.ts' --type Digitaljs) > src/schema.ts

$(BUILD_TARGETS): src/* src/schema.ts
	yarn tsc

build_all: $(BUILD_TARGETS)

test: build_all
	node ./tests/test.mjs
