# Setting Up a Custom Resend Domain for Lieron Engineering

## Why This Is Needed

Resend's default sandbox domain (`onboarding@resend.dev`) can **only send emails to the Resend account owner's email**. To send to any recipient (e.g., `noriel@lieron.co.nz`), you need to add and verify your own domain.

---

## Step 1 — Add Your Domain in Resend

1. Go to [https://resend.com/domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter: `lieron.co.nz`
4. Select your region (closest to NZ would be **US** or **EU** — either works)
5. Click **"Add"**

Resend will show you a list of **DNS records** you need to add. Keep this page open.

---

## Step 2 — Add DNS Records

Go to your domain registrar's DNS settings (wherever `lieron.co.nz` is managed — e.g., Cloudflare, GoDaddy, Namecheap, etc.).

Resend will give you **3 types of records** to add:

### 1. SPF Record (TXT)
| Type | Name/Host | Value |
|------|-----------|-------|
| TXT | `send._domainkey` | *(copy from Resend dashboard)* |

### 2. DKIM Records (TXT)
Resend typically provides **2-3 DKIM TXT records**. Add all of them exactly as shown.

### 3. Return-Path / MX Record
| Type | Name/Host | Value |
|------|-----------|-------|
| MX | `bounces` | *(copy from Resend dashboard)* |

> [!IMPORTANT]
> Copy the exact values from the Resend dashboard — they are unique to your account. The table above shows the record *types* and *hosts*, but the actual values will be provided by Resend.

> [!TIP]
> If your domain is managed by **Cloudflare**, make sure the DNS records are set to **DNS Only** (grey cloud), not **Proxied** (orange cloud).

---

## Step 3 — Verify the Domain

1. After adding all DNS records, go back to the [Resend Domains page](https://resend.com/domains)
2. Click **"Verify"** next to `lieron.co.nz`
3. DNS propagation can take **a few minutes to 48 hours** (usually under 10 minutes)
4. Once verified, the status will change to ✅ **Verified**

---

## Step 4 — Update the Project Code

Once the domain is verified, update the `from` address in [route.ts](file:///c:/Users/jonat/OneDrive/Desktop/Projects/Lerion/lieron-engineering/src/app/api/contact/route.ts):

```diff
  const { error } = await resend.emails.send({
-   from: "Lieron Engineering <onboarding@resend.dev>",
+   from: "Lieron Engineering <contact@lieron.co.nz>",
    to: [RECIPIENT_EMAIL],
    replyTo: email,
```

> [!NOTE]
> You can use any prefix you like — `contact@`, `noreply@`, `info@`, etc. The domain part must match what you verified in Resend.

---

## Step 5 — Add CONTACT_EMAIL to Vercel (Optional)

If you want `noriel@lieron.co.nz` to receive the form submissions:
- The code already defaults to `COMPANY.email` (`noriel@lieron.co.nz`) — no env var needed.

If you want to override the recipient without code changes:
1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add: `CONTACT_EMAIL` = `noriel@lieron.co.nz`

---

## Step 6 — Deploy and Test

1. Commit and push the `from` address change
2. Wait for Vercel to deploy
3. Go to `www.lieron.co.nz/contact`
4. Submit a test message
5. Check `noriel@lieron.co.nz` for the email

---

## Quick Fix (While Waiting for DNS Verification)

If you need the form working immediately while DNS propagates, add this env var in Vercel:

| Key | Value |
|-----|-------|
| `CONTACT_EMAIL` | `jonathan.ripas14@gmail.com` |

This sends form submissions to your Resend account email (which works with `onboarding@resend.dev`). Remove it once the custom domain is verified and the `from` address is updated.

---

## Summary of Changes

| What | Before | After |
|------|--------|-------|
| Sending domain | `onboarding@resend.dev` (sandbox) | `contact@lieron.co.nz` (custom) |
| Recipient limit | Account owner only | Anyone |
| From address | `Lieron Engineering <onboarding@resend.dev>` | `Lieron Engineering <contact@lieron.co.nz>` |
