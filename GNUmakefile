install:
	poetry install
	npm install

python:
	poetry run python ./run.py --root-dir ./mawanet-sixth-chamber/doc --output-dir ./src/lib/mawanet

build: python
	npm run build

preview:
	npm run preview

dev: python
	npm run dev
