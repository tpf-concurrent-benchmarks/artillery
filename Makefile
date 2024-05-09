-include .env

copy_env:
	if [ ! -f .env ]; then cp .env.example .env; fi

create_directories:
	mkdir -p results

build:
	docker build -t http_artillery .

setup: copy_env create_directories

test_load_prod: build
	docker run -it \
	-v "$(PWD)/resources:/opt/app/resources" \
	-v "$(PWD)/results:/opt/app/results" \
	-v "$(PWD)/scenarios:/opt/app/scenarios" \
	-v "$(PWD)/processor.js:/opt/app/processor.js" \
	-v "$(PWD)/.env:/opt/app/.env:ro" \
	--network $(NETWORK) \
	http_artillery load prod