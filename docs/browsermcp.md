# BrowserMCP setup (demo only)

BrowserMCP lets the agent drive **your own Chrome tab**. It's the fastest way
to show intent-driven testing live — and deliberately *not* part of this repo's
test setup, because it needs an open browser and can't run headless in CI.

## 1. Install the extension

Follow https://docs.browsermcp.io to add the BrowserMCP extension to Chrome.

## 2. Register the server with Antigravity CLI

```bash
cp mcp_config.example.json ~/.gemini/config/mcp_config.json
```

```json
{
  "mcpServers": {
    "browsermcp": {
      "command": "npx",
      "args": ["-y", "@browsermcp/mcp@latest"]
    }
  }
}
```

## 3. Connect and verify

```bash
make dev                       # app on http://localhost:5173
# open that URL in Chrome, click the BrowserMCP icon -> Connect
agy                            # new terminal
> /mcp                         # browsermcp should be listed as connected
```

Then paste the Lab 1 prompt from [prompts.md](prompts.md).

## Where it stops

- Needs an open browser with the extension connected
- Chromium browsers only
- No file system access — it can't save a screenshot for you
- A surprise pop-up can derail it
- No headless mode, so no CI

That's why step 3 moves to the Playwright skill for anything repeatable.

## Turning it off before Lab 2

In `agy`: type `/mcp`, arrow to `browsermcp`, press Enter, choose **Disable**.
With both tools available the agent may reach for the wrong one.
