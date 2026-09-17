.PHONY: install dev build preview test test-headed test-ui break-ui restore-ui

install:            ## Install app + test dependencies
	npm install
	npm install --prefix demo-app

dev:                ## Run the demo app on http://localhost:5173
	npm run dev --prefix demo-app

build:              ## Production build of the demo app
	npm run build --prefix demo-app

preview:            ## Serve the production build
	npm run preview --prefix demo-app

test:               ## Run the Playwright suite (starts the app itself)
	npx playwright test

test-headed:        ## Run the suite with a visible browser
	npx playwright test --headed

test-ui:            ## Playwright's interactive runner
	npx playwright test --ui

break-ui:           ## Rename the classes the selector-based tests depend on
	./scripts/break-ui.sh

restore-ui:         ## Undo break-ui
	./scripts/restore-ui.sh
