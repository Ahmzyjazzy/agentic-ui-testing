# Slow-motion delay (ms) for the headed targets — override: make test-headed SLOWMO=800
SLOWMO ?= 400

.PHONY: install dev build preview test test-headed test-chrome test-ui test-debug break-ui restore-ui

install:            ## Install app + test dependencies (pnpm workspace)
	pnpm install

dev:                ## Run the demo app on http://localhost:5173
	pnpm dev

build:              ## Production build of the demo app
	pnpm build

preview:            ## Serve the production build
	pnpm preview

test:               ## Run the Playwright suite headless (starts the app itself)
	pnpm exec playwright test

test-headed:        ## Watch it: real browser window, slowed down (SLOWMO=$(SLOWMO)ms)
	HEADED=1 SLOWMO=$(SLOWMO) pnpm exec playwright test

test-chrome:        ## Same, but drive your installed Google Chrome
	HEADED=1 SLOWMO=$(SLOWMO) BROWSER=chrome pnpm exec playwright test

test-ui:            ## Playwright's interactive runner (time-travel debugging)
	pnpm exec playwright test --ui

test-debug:         ## Step through action by action in the Playwright Inspector
	PWDEBUG=1 HEADED=1 pnpm exec playwright test

break-ui:           ## Rename the classes the selector-based tests depend on
	./scripts/break-ui.sh

restore-ui:         ## Undo break-ui
	./scripts/restore-ui.sh
