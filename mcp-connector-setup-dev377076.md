# MCP Connector Setup — dev377076 PDI

**Date:** 20 May 2026
**Target instance:** `https://dev377076.service-now.com/`
**Pattern:** Same as the Alectri DemoHub connector (SN MCP Server scoped app + claude.ai custom connector registration).

This is a quick-reference you can action whenever — claude.ai needs your clicks, not mine. Once it's done I can read/write the PDI directly during the spine build.

---

## What we're standing up

A claude.ai-hosted custom MCP connector that talks to the **SN MCP Server scoped app** running on dev377076. Same shape as the existing `BT1_MCP` and `ServiceNow_MCP_Demo` connectors you already have. After setup, you'll see something like `mcp__claude_ai_Tertiary_PDI__*` tools appear in deferred-tool listings.

---

## Step 1 — Install the SN MCP Server scoped app on the PDI

Two ways to get it, depending on what's exposed to a fresh PDI:

**Option A — ServiceNow Store (try this first)**
1. Log in to dev377076 as admin.
2. Navigate to **All → System Applications → All Available Applications → All** (or `/$allappdiagscreen.do`).
3. Search for "MCP Server" or "ServiceNow MCP Server".
4. If listed: click **Install** → wait for plugin activation → confirm scope `sn_mcp_server` (or similar) appears in System Definition → Application Scopes.

**Option B — From your Alectri instance (if Store doesn't expose it on PDI)**
1. On the Alectri instance (`demoalectriallwfza137154.service-now.com`), navigate to the scoped app **MCP Server**.
2. Use **Studio → Publish App** or **System Applications → Studio → Export Update Set** to get a portable artefact.
3. Import into dev377076 via **System Update Sets → Retrieved Update Sets**, preview, commit.
4. Verify the scope appears and the `/api/now/mcp` endpoint responds (see Step 4).

> **Watch for:** PDI scoped app installation can be slower than DemoHub because there's no template pre-baking. Give it 2–3 minutes after install before testing.

---

## Step 2 — Create an OAuth client on the PDI

The custom connector in claude.ai authenticates via OAuth 2.0. You need an OAuth Application Registry record on dev377076.

1. In dev377076: **All → System OAuth → Application Registry**.
2. Click **New** → **Create an OAuth API endpoint for external clients**.
3. Fill in:
   - **Name:** `Claude Tertiary PDI Connector`
   - **Client ID:** auto-generated, copy this
   - **Client Secret:** auto-generated, copy this (only shown once)
   - **Redirect URL:** `https://claude.ai/api/mcp/auth_callback` *(verify this against what claude.ai shows when you start the Add Custom Connector flow — it gives you the exact callback URL to paste)*
   - **Refresh Token Lifespan:** 8640000 (100 days) — keeps you from re-auth'ing every day
   - **Access Token Lifespan:** 1800 (30 min, default is fine)
4. Save.

---

## Step 3 — Register the custom connector in claude.ai

1. Open <https://claude.ai/> in browser.
2. **Settings → Connectors → Add Custom Connector** (UI may say "Add Integration" depending on version).
3. Fill in:
   - **Name:** `Tertiary_PDI` (this becomes the prefix in tool names — keep it short and clean)
   - **MCP Server URL:** `https://dev377076.service-now.com/api/now/mcp`
   - **Authentication:** OAuth 2.0
   - **Client ID:** paste from Step 2
   - **Client Secret:** paste from Step 2
   - **Authorization URL:** `https://dev377076.service-now.com/oauth_auth.do`
   - **Token URL:** `https://dev377076.service-now.com/oauth_token.do`
   - **Scopes:** `useraccount` (default ServiceNow OAuth scope — broad, fine for a dev PDI; tighten later if needed)
4. Save.
5. Click **Connect** / **Authorize** — it should redirect you to dev377076 to log in, then bounce you back.
6. Once connected, the connector status should show **Connected** with a timestamp.

---

## Step 4 — Smoke test

Two ways to verify, do at least one:

**A — From here in Claude Code**
After you've done Step 3, drop me a line saying "PDI connector is up" and I'll try a small `query_table` against `sys_user` or `sys_app_module` to confirm I can see the PDI. If the tool name shows up as deferred, I'll load it via ToolSearch and run it.

**B — From PowerShell (independent confirmation)**
```powershell
$pair = "admin:YOUR_ADMIN_PASSWORD"
$encodedCreds = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($pair))
Invoke-RestMethod -Uri "https://dev377076.service-now.com/api/now/table/sys_user?sysparm_limit=1" `
                  -Headers @{ Authorization = "Basic $encodedCreds" } `
                  -Method GET
```
If that returns a user record, REST is healthy and the MCP layer should work too.

---

## Step 5 — Save the credentials

Drop the Client ID, Client Secret, admin password, and the connector callback URL into your password manager / OneDrive somewhere safe. PDI credentials are easy to lose and the SN MCP Server install isn't trivial to repeat.

---

## What this unlocks

Once connected, I can (without you running PowerShell each time):
- Query any table on dev377076 to check state.
- Read/write records — create the Wellbeing case type, KB articles, portal records, AI agent definitions etc.
- Run scripts via the platform script endpoints.
- Inspect the Fluent SDK deployments after we push them.

The Fluent SDK itself doesn't need this — it pushes via credentials directly. But MCP makes the iteration loop much faster for inspection and one-off tweaks.

---

## If you hit trouble

- **"MCP Server scoped app not found in Store"** — that's the option-B path; we'll export from Alectri.
- **OAuth callback fails** — usually means the redirect URL in the Application Registry record doesn't exactly match what claude.ai sent. Open the Application Registry record and paste the URL claude.ai shows verbatim.
- **`/api/now/mcp` returns 404** — scoped app didn't install fully, or hasn't activated its REST endpoint. Re-check application installation status in System Applications → My Company Applications.
- **Connector connects but no tools appear** — usually a scope/role issue; the OAuth user needs `mcp_user` or equivalent role granted by the scoped app. Check the scoped app's docs or look at what role the Alectri user has.
