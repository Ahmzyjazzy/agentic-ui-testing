.PHONY: install dev build preview break-ui restore-ui

install:            ## Install demo app dependencies
	npm install --prefix demo-app

dev:                ## Run the demo app on http://localhost:5173
	npm run dev --prefix demo-app

build:              ## Production build
	npm run build --prefix demo-app

preview:            ## Serve the production build
	npm run preview --prefix demo-app

break-ui:           ## Rename the login button + dashboard heading classes (demo step)
	./scripts/break-ui.sh

restore-ui:         ## Undo break-ui
	./scripts/restore-ui.sh
