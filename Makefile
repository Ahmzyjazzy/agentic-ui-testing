# Slow-motion delay (ms) for the headed targets — override: make test-headed SLOWMO=800
SLOWMO ?= 400

# Limit a run to one file or a filter — Make needs this as a variable, not a
# bare argument:  make test-headed SPEC=tests/auth/login.spec.ts
SPEC ?=

.PHONY: install dev build preview test test-headed test-chrome test-ui test-debug break-ui restore-ui

install:            ## Install app + test dependencies (pnpm workspace)
	pnpm install

dev:                ## Run the demo app on http://localhost:5173
	pnpm dev

build:              ## Production build of the demo app
	pnpm build

preview:            ## Serve the production build
	pnpm preview

test:               ## Run the suite headless (SPEC=path/to.spec.ts to narrow it)
	pnpm exec playwright test $(SPEC)

test-headed:        ## Watch it: real browser, slowed down (SLOWMO=$(SLOWMO)ms, SPEC=… to narrow)
	HEADED=1 SLOWMO=$(SLOWMO) pnpm exec playwright test $(SPEC)

test-chrome:        ## Same, but drive your installed Google Chrome
	HEADED=1 SLOWMO=$(SLOWMO) BROWSER=chrome pnpm exec playwright test $(SPEC)

test-ui:            ## Trace explorer: press the ▶ in the TESTS panel, then click an action
	pnpm exec playwright test --ui $(SPEC)

test-debug:         ## Step through action by action in the Playwright Inspector
	PWDEBUG=1 HEADED=1 pnpm exec playwright test $(SPEC)

break-ui:           ## Rename the classes the selector-based tests depend on
	./scripts/break-ui.sh

restore-ui:         ## Undo break-ui
	./scripts/restore-ui.sh
