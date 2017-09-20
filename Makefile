all: build syncfiles invalidate

build:
	npm run prod

clearFiles:
	aws s3 rm s3://www.laylasmathsthingy.com --recursive

syncfiles:
	aws s3 sync ./dist s3://www.laylasmathsthingy.com --acl bucket-owner-full-control --acl public-read --cache-control="max-age=2592000" --profile s3

invalidate:
	aws cloudfront create-invalidation --distribution-id E2442G9F5YP549 --paths /index.html --profile cloudfront
