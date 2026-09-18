.PHONY: install dev build preview test test-headed test-ui break-ui restore-ui

install:            ## Install app + test dependencies (pnpm workspace)
	pnpm install

dev:                ## Run the demo app on http://localhost:5173
	pnpm dev

build:              ## Production build of the demo app
	pnpm build

preview:            ## Serve the production build
	pnpm preview

test:               ## Run the Playwright suite (starts the app itself)
	pnpm exec playwright test

test-headed:        ## Run the suite with a visible browser
	pnpm exec playwright test --headed

test-ui:            ## Playwright's interactive runner
	pnpm exec playwright test --ui

break-ui:           ## Rename the classes the selector-based tests depend on
	./scripts/break-ui.sh

restore-ui:         ## Undo break-ui
	./scripts/restore-ui.sh
