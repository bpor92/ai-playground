up:
	$(shell echo 'npm i')
	$(shell echo 'npm run dev')

clean:
	rm -rf node_modules
	rm -rf .nuxt