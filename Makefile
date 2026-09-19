# Slow-motion delay (ms) for the headed targets — override: make test-headed SLOWMO=800
SLOWMO ?= 400

# Limit a run to one file or a filter — Make needs this as a variable, not a
# bare argument:  make test-headed SPEC=tests/auth/login.spec.ts
SPEC ?=

# Regenerate one intent instead of all of them:
#   make generate INTENT=e2e/intents/auth/login.intent.md
INTENT ?=

.PHONY: install dev build preview test test-headed test-chrome test-ui test-debug test-video report generate restore-generated break-ui restore-ui

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

generate:           ## Regenerate every spec from e2e/intents/ with agy (INTENT=… for one)
	./scripts/generate-specs.sh $(INTENT)

restore-generated:  ## Fallback: copy the reference generated specs into tests/
	./scripts/restore-generated.sh

test-video:         ## Record a .webm of every test into playwright-report/ (SPEC=… to narrow)
	VIDEO=1 pnpm exec playwright test --reporter=html $(SPEC)

report:             ## Open the last HTML report — videos and traces included
	pnpm exec playwright show-report

break-ui:           ## Rename the classes the selector-based tests depend on
	./scripts/break-ui.sh

restore-ui:         ## Undo break-ui
	./scripts/restore-ui.sh
