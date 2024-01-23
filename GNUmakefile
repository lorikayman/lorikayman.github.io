install:
	poetry install
	npm install

python:
	poetry run python ./run.py \
		--root-dir ./src/lib/sixth-chamber/doc \
		--output-dir ./src/lib/mawanet \
		--whitelist ./src/lib/sixth-chamber/whitelist.json

build: python
	npm run build

preview:
	npm run preview

dev: python
	npm run dev
