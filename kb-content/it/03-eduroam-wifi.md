---
number: 3
title: Connect to campus Wi-Fi (eduroam) — iOS, Android, Windows, Mac
topic: Connectivity
audience: students
read_time_minutes: 5
deflects: wifi setup (peak volume O-Week and start of each trimester)
---

# Connect to campus Wi-Fi (eduroam)

**eduroam** is the global wifi service used by universities worldwide. Once it's set up on your device, you'll connect automatically every time you're on campus — and at most other universities in NZ and overseas. This article covers the standard setup for iOS, Android, Windows and Mac.

## Before you start

You'll need:

- Your full student email address (e.g. `firstname.lastname@student.[Placeholder: your university domain]`)
- Your student password
- To be physically on campus, or close enough to see the **eduroam** network

If you've just reset your password, wait 5 minutes before connecting — the change takes a moment to propagate.

## Steps

### iOS (iPhone, iPad)

1. Open **Settings** → **Wi-Fi**.
2. Tap **eduroam** in the list of networks.
3. Enter your full student email in the **Username** field and your password.
4. Tap **Join**. When asked to trust the certificate, tap **Trust** in the top right.
   [Screenshot: iOS certificate trust prompt with university certificate name]

### Android

1. Open **Settings** → **Network & Internet** → **Wi-Fi**.
2. Tap **eduroam**.
3. Set the following:
   - **EAP method**: PEAP
   - **Phase 2 authentication**: MSCHAPV2
   - **CA certificate**: Use system certificates (or "Do not validate" on older Android — only if system certs isn't available)
   - **Domain**: `[Placeholder: your university wifi domain, e.g. aotearoa.ac.nz]`
   - **Identity**: your full student email
   - **Password**: your student password
4. Tap **Connect**.

### Windows 10/11

1. Click the wifi icon in the taskbar.
2. Select **eduroam** → **Connect**.
3. Enter your full student email and password when prompted.
4. If a certificate warning appears, click **Connect** to accept it.

### macOS

1. Click the wifi icon in the menu bar.
2. Select **eduroam**.
3. Enter your student email and password, leave **Mode** as Automatic.
4. Click **Continue** to accept the certificate.

## Still stuck?

- **"Authentication failed"** — most often a typo in your email or password. Try signing in to your student email in a browser first to confirm the credentials work.
- **Connected but no internet** — forget the network and reconnect. Restart wifi on the device.
- **Android won't let you skip certificate validation** — use the **geteduroam** app from the Play Store, which auto-configures everything correctly.
- **Older device** — anything pre-2015 may not support the required security. Use **AU-Guest** (limited) and contact IT.

For persistent issues, drop in to the IT helpdesk with your device.

## Related help

- [Reset your student password](?id=kb_article&kb_id=kb-password-reset)
- [Connect personal devices to campus printing](?id=kb_article&kb_id=kb-printing)
- [VPN access for off-campus library resources](?id=kb_article&kb_id=kb-vpn)
