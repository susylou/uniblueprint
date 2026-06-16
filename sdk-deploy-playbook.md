# Deploying a Fluent SDK app to a governed ServiceNow instance — playbook & gotchas

**Context:** getting a `now-sdk` (Fluent SDK) app deployed onto a *governed* instance —
DemoHub / Australia-family / prod-like — where you do **not** have maint access to change
app-author governance. Verified end-to-end on `demoalectriallwfaa151525` (Australia),
16 Jun 2026: full Service Portal + 7 widgets + working nav live at `/student`.

> TL;DR: the SDK isn't the problem. `build` / `pack` / `auth` all work. The deploy fights
> you for two reasons — a **company-code mismatch** and a **Windows credential-store limit**
> — both of which have clean, no-hack fixes below.

---

## The method that works

1. **Build and pack are fine.** `now-sdk build` / `now-sdk pack` validate and package locally
   with no instance contact. If the build is green, your app is fine — any failure after this
   is the *target instance*, not your code.

2. **Scope the app to the instance's company code.** A governed instance only accepts apps
   whose scope prefix `x_<company_code>_` is in its allow-list. Find the instance's code in the
   system property **`glide.appcreator.company.code`** (e.g. `snc` on 151525), then scope your
   app to match in `now.config.json`:

   ```json
   { "scope": "x_snc_blueprint", "scopeId": "<fresh 32-char sys_id>", "name": "Uni Blueprint" }
   ```

   This is the *documented* path when you don't have maint access — not a workaround. Confirm
   it's a real, usable code by checking existing custom apps on the instance
   (`sys_app` where `scope STARTSWITH x_` — dozens of `x_snc_*` apps = `snc` is fine to use).

3. **Install non-interactively via CI auth** — bypasses the interactive prompt *and* the
   Windows credential-store limit (it stores nothing; env vars beat stored creds):

   ```powershell
   $env:SN_SDK_NODE_ENV  = 'SN_SDK_CI_INSTALL'
   $env:SN_SDK_AUTH_TYPE = 'basic'
   $env:SN_SDK_INSTANCE_URL = 'https://<instance>.service-now.com'
   $env:SN_SDK_USER     = 'admin'
   $env:SN_SDK_USER_PWD = '<password>'
   now-sdk install
   ```

   Updates (re-installs) work through this path too, not just first install.

---

## Gotchas (the time-sinks)

1. **`Unable to install application as application was null`** = company-code mismatch.
   Your app's `x_<code>_` prefix isn't in the instance's `sn_appauthor.all_company_keys`.
   **Fix:** re-scope to the instance's `glide.appcreator.company.code` (step 2 above).
   **Do NOT** try to add your code to `all_company_keys` on a governed instance — it's
   ACL-locked: REST PATCH → `ACL Exception`; scoped background script → cross-scope refusal;
   a Global-scope script is blocked because the scope picker reverts on every navigation;
   and there's no maint/security_admin role to escalate. Re-scope, don't fight the property.

2. **`Attribute 'password encoded as UTF-16' is longer than platform limit of 2560 chars`**
   (on `now-sdk auth --add`) = the Windows credential store is full. `now-sdk` packs *all*
   saved instances into one ~2560-char blob; OAuth tokens are huge and blow it.
   **Fix:** use the CI-auth env-vars above (stores nothing), or clear unused logins —
   `now-sdk auth --delete <alias>` (kill OAuth entries first; they're the space hogs).
   The login *succeeds*; only the local *save* fails — so CI auth sidesteps it entirely.

3. **Nav tabs don't appear at all** = the header widget is reading the wrong portal field.
   The portal's main-menu reference is **`sp_portal.sp_rectangle_menu`**, *not* `main_menu`.
   ```javascript
   var menuId = portal.getValue('sp_rectangle_menu') || portal.getValue('main_menu');
   ```
   (`sp_rectangle_menu` is a *field name*, not a table — querying it as a table 404s. The
   menu items live in `sp_rectangle_menu_item`.)

4. **Nav tabs render but don't route** = don't hand-roll `'?id=' + item.page`.
   Use **`$sp.getMenuItems(menuId)`** — it returns each item with `href` already built
   (page → `?id=<suffix>`, url → the url). **`$sp.getMenu()` is not a real API.**

5. **SP widget templates have no `c` controllerAs binding.** Bind `data.X` (never `c.data.X`),
   and use `ng-href` instead of `ng-click="c.method()"`. Pre-compute everything server-side
   onto `data`. Applies to `sp_header_footer` templates too.

6. **Generic IDs collide silently on DemoHub.** Never use bare `home`, `index`, `student` as
   `pageId` / `urlSuffix` / widget `id` — they clash with OOB portal records. Prefix with the
   app short code (`au-home`, `au-get-help`). Remember menu URL placeholders + header hrefs.

---

## Why this matters

This is the repeatable recipe for deploying SDK-built apps onto *governed, latest-release*
(Australia) instances — i.e. the real targets for showing off-platform-AI + modern dev-process
work, not a throwaway PDI. Scope to the instance's company code, install via CI-auth env vars,
and watch for the six gotchas above.
