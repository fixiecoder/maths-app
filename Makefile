all: build invalidate syncfiles

build:
	npm run prod

invalidate:
	aws cloudfront create-invalidation --distribution-id E2442G9F5YP549 --paths /* --profile cloudfront

syncfiles:
	aws s3 sync ./dist s3://www.laylasmathsthingy.com --acl bucket-owner-full-control --acl public-read --profile s3
