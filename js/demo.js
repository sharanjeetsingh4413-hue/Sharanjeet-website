/* =============================================================
   LIVE DEMO — callback request form
   =============================================================

   This form triggers a REAL outbound phone call, which costs real money
   per call. The checks in this file are cost-control speed bumps that
   stop casual abuse from a browser. They are NOT security.

   BEFORE GOING LIVE, the n8n workflow behind DEMO_CONFIG.webhookUrl must
   defend itself, because this repository is public and anyone can read
   this file, copy the webhook URL, and POST to it directly:

     1. Shared-secret header — the workflow should reject any request
        that doesn't carry an agreed header (e.g. X-Demo-Key). Note that
        a value sent from this file would be visible in the page source,
        so it is not a secret. Put the check in front of the webhook
        (a proxy, Cloudflare Worker, or n8n's own auth) rather than
        trusting anything the browser sends.
     2. Server-side rate limiting — per phone number and per IP, with a
        hard daily ceiling on total demo calls. sessionStorage below is
        cleared by opening a new tab.
     3. A cap on spend, so a bad day costs a known amount.

   ============================================================= */

const DEMO_CONFIG = {
  // FILL: n8n webhook URL that triggers the outbound demo call
  webhookUrl: '',

  // FILL: demo agent phone number in international format, e.g. '+919XXXXXXXXX'.
  // This is the demo line, not the contact number above — leave empty until it exists.
  phone: '',
};

const WHATSAPP_URL = 'https://wa.me/919773860448';

// One callback request per browser session. Cleared when the tab closes.
const SESSION_KEY = 'demo-callback-requested';

const form = document.getElementById('demo-form');

/* ---------- Click-to-call path ---------- */
const callWrap = document.getElementById('demo-call-wrap');

if (callWrap) {
  if (DEMO_CONFIG.phone) {
    callWrap.innerHTML =
      '<a class="demo-phone" href="tel:' + DEMO_CONFIG.phone + '">' + DEMO_CONFIG.phone + '</a>';
  } else {
    // Number not supplied yet — say so plainly rather than shipping a dead tel: link.
    callWrap.innerHTML =
      '<p class="form-note">The dial-in number isn\'t published yet. ' +
      '<a class="inline-link" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener">Message me on WhatsApp</a> ' +
      'and I\'ll set up a demo call.</p>';
  }
}

/* ---------- Callback form ---------- */
if (form) {
  const statusBox = document.getElementById('demo-status');
  const submitBtn = document.getElementById('demo-submit');

  const setStatus = (kind, html) => {
    statusBox.className = 'form-status form-status-' + kind;
    statusBox.innerHTML = html;
    statusBox.hidden = false;
  };

  const clearStatus = () => {
    statusBox.hidden = true;
    statusBox.innerHTML = '';
  };

  const setFieldError = (field, message) => {
    const input = form.elements[field];
    const slot = document.querySelector('[data-error-for="' + field + '"]');
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      slot.textContent = message;
    } else {
      input.removeAttribute('aria-invalid');
      slot.textContent = '';
    }
  };

  const lockForm = (kind, message) => {
    form.querySelectorAll('input, select, button').forEach(el => { el.disabled = true; });
    setStatus(kind, message);
  };

  // Already requested a call in this session — don't let the same tab spend again.
  if (sessionStorage.getItem(SESSION_KEY)) {
    lockForm(
      'info',
      'You\'ve already requested a demo call in this session. If it didn\'t arrive, ' +
      '<a class="inline-link" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener">message me on WhatsApp</a>.'
    );
  }

  const validate = (data) => {
    let ok = true;

    if (data.name.trim().length < 2) {
      setFieldError('name', 'Please enter your name.');
      ok = false;
    } else {
      setFieldError('name', '');
    }

    // Accept Indian mobiles and international numbers: 8–15 digits, optional +.
    const digits = data.phone.replace(/[^\d]/g, '');
    if (digits.length < 8 || digits.length > 15) {
      setFieldError('phone', 'Enter a phone number the agent can dial, with country code.');
      ok = false;
    } else {
      setFieldError('phone', '');
    }

    if (!data.businessType) {
      setFieldError('businessType', 'Pick the closest match so the agent knows what to talk about.');
      ok = false;
    } else {
      setFieldError('businessType', '');
    }

    return ok;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearStatus();

    const data = {
      name: form.elements.name.value,
      phone: form.elements.phone.value,
      businessType: form.elements.businessType.value,
    };

    // Honeypot: real people never see this field, so anything in it is a bot.
    // Show the success state so the bot doesn't learn it was caught, but send nothing.
    if (form.elements.website.value) {
      setStatus('success', 'Thanks — request received.');
      return;
    }

    if (!validate(data)) {
      setStatus('error', 'Please fix the fields marked above.');
      return;
    }

    if (!DEMO_CONFIG.webhookUrl) {
      setStatus(
        'info',
        'The demo line isn\'t connected yet. ' +
        '<a class="inline-link" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener">Message me on WhatsApp</a> ' +
        'and I\'ll call you back myself.'
      );
      return;
    }

    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Requesting…';

    try {
      const res = await fetch(DEMO_CONFIG.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(),
          phone: data.phone.trim(),
          businessType: data.businessType,
          source: 'sharanjeetdigital.in — demo callback form',
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error('Webhook responded ' + res.status);

      sessionStorage.setItem(SESSION_KEY, '1');
      form.reset();
      lockForm(
        'success',
        '<strong>Request received.</strong> The demo agent should call ' +
        data.phone.trim() + ' shortly. Answer it like you would any business call — ' +
        'and hang up whenever you\'ve heard enough.'
      );
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
      setStatus(
        'error',
        'That didn\'t go through — the demo line may be down. ' +
        '<a class="inline-link" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener">Message me on WhatsApp</a> ' +
        'and I\'ll sort it out.'
      );
    }
  });
}
