all: build syncfiles invalidate

build:
	npm run prod

clearFiles:
	aws s3 rm s3://www.laylasmathsthingy.com --recursive

syncfiles:
	aws s3 sync ./dist s3://laylasmathsthingy.com --acl bucket-owner-full-control --acl public-read --profile s3
	# aws s3 sync ./dist s3://www.laylasmathsthingy.com --acl bucket-owner-full-control --acl public-read --profile s3

invalidate:
	aws cloudfront create-invalidation --distribution-id ERU3E3HYFLS6X --paths /index.html --profile cloudfront
