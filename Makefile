.PHONY: install dev build preview

install:            ## Install the demo app (pnpm workspace)
	pnpm install

dev:                ## Run the demo app on http://localhost:5173
	pnpm dev

build:              ## Production build of the demo app
	pnpm build

preview:            ## Serve the production build
	pnpm preview
