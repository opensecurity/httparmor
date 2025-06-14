'use strict';

((window, document) => {
    class HttpArmorApp {
        constructor() {
            this.elements = {
                form: document.getElementById('main-form'),
                outputCode: document.getElementById('output-code'),
                copyButton: document.getElementById('copy-button'),
                presetsPanel: document.querySelector('.presets-panel'),
                tooltipContainer: document.getElementById('tooltip-container'),
                presetButtons: document.querySelectorAll('.preset-button'),
                allInputs: document.querySelectorAll('#main-form input, #main-form select'),
            };
            this.transitionSpeed = 300;
            this.tooltipTimeout = null;

            this.presets = {
                default: { 'csp-default-src': "'self'", 'csp-script-src': "'self'", 'csp-style-src': "'self'", 'csp-img-src': "'self' data:", 'csp-object-src': "'none'", 'csp-frame-ancestors': "'self'", 'csp-base-uri': "'self'", 'pp-accelerometer': '()', 'pp-ambient-light-sensor': '()', 'pp-attribution-reporting': '()', 'pp-autoplay': 'self', 'pp-bluetooth': '()', 'pp-Browse-topics': '()', 'pp-camera': '()', 'pp-compute-pressure': '()', 'pp-cross-origin-isolated': 'self', 'pp-display-capture': '()', 'pp-encrypted-media': 'self', 'pp-fullscreen': 'self', 'pp-gamepad': '()', 'pp-geolocation': '()', 'pp-gyroscope': '()', 'pp-hid': '()', 'pp-identity-credentials-get': '()', 'pp-idle-detection': '()', 'pp-local-fonts': '()', 'pp-magnetometer': '()', 'pp-microphone': '()', 'pp-midi': '()', 'pp-otp-credentials': '()', 'pp-payment': '()', 'pp-picture-in-picture': '*', 'pp-publickey-credentials-create': '()', 'pp-publickey-credentials-get': 'self', 'pp-screen-wake-lock': '()', 'pp-serial': '()', 'pp-speaker-selection': '()', 'pp-storage-access': '()', 'pp-usb': '()', 'pp-web-share': '()', 'pp-window-management': '()', 'pp-xr-spatial-tracking': '()', 'coop-value': 'same-origin', 'coep-value': 'require-corp', 'corp-value': 'same-origin', 'hsts-max-age': 63072000, 'hsts-include-subdomains': true, 'rp-value': 'strict-origin-when-cross-origin', 'xfo-value': 'SAMEORIGIN', 'cache-value': 'no-store, no-cache, must-revalidate', 'xcto-value': 'nosniff' },
                spa: { 'csp-default-src': "'none'", 'csp-script-src': "'self'", 'csp-style-src': "'self' https: 'unsafe-inline'", 'csp-img-src': "'self' data: https:", 'csp-object-src': "'none'", 'csp-frame-ancestors': "'none'", 'csp-base-uri': "'self'", 'pp-accelerometer': '()', 'pp-ambient-light-sensor': '()', 'pp-attribution-reporting': '()', 'pp-autoplay': 'self', 'pp-bluetooth': '()', 'pp-Browse-topics': '()', 'pp-camera': '()', 'pp-compute-pressure': '()', 'pp-cross-origin-isolated': 'self', 'pp-display-capture': '()', 'pp-encrypted-media': 'self', 'pp-fullscreen': 'self', 'pp-gamepad': '()', 'pp-geolocation': '()', 'pp-gyroscope': '()', 'pp-hid': '()', 'pp-identity-credentials-get': '()', 'pp-idle-detection': '()', 'pp-local-fonts': '()', 'pp-magnetometer': '()', 'pp-microphone': '()', 'pp-midi': '()', 'pp-otp-credentials': '()', 'pp-payment': '()', 'pp-picture-in-picture': '*', 'pp-publickey-credentials-create': '()', 'pp-publickey-credentials-get': 'self', 'pp-screen-wake-lock': '()', 'pp-serial': '()', 'pp-speaker-selection': '()', 'pp-storage-access': '()', 'pp-usb': '()', 'pp-web-share': '()', 'pp-window-management': '()', 'pp-xr-spatial-tracking': '()', 'coop-value': 'same-origin', 'coep-value': 'require-corp', 'corp-value': 'same-origin', 'hsts-max-age': 63072000, 'hsts-include-subdomains': true, 'rp-value': 'strict-origin-when-cross-origin', 'xfo-value': 'DENY', 'cache-value': 'no-store, no-cache, must-revalidate', 'xcto-value': 'nosniff' },
                static: { 'csp-default-src': "'none'", 'csp-script-src': "'self'", 'csp-style-src': "'self'", 'csp-img-src': "'self' data:", 'csp-object-src': "'none'", 'csp-frame-ancestors': "'self'", 'csp-base-uri': "'self'", 'pp-accelerometer': '()', 'pp-ambient-light-sensor': '()', 'pp-attribution-reporting': '()', 'pp-autoplay': '()', 'pp-bluetooth': '()', 'pp-Browse-topics': '()', 'pp-camera': '()', 'pp-compute-pressure': '()', 'pp-cross-origin-isolated': 'self', 'pp-display-capture': '()', 'pp-encrypted-media': '()', 'pp-fullscreen': '()', 'pp-gamepad': '()', 'pp-geolocation': '()', 'pp-gyroscope': '()', 'pp-hid': '()', 'pp-identity-credentials-get': '()', 'pp-idle-detection': '()', 'pp-local-fonts': '()', 'pp-magnetometer': '()', 'pp-microphone': '()', 'pp-midi': '()', 'pp-otp-credentials': '()', 'pp-payment': '()', 'pp-picture-in-picture': '()', 'pp-publickey-credentials-create': '()', 'pp-publickey-credentials-get': '()', 'pp-screen-wake-lock': '()', 'pp-serial': '()', 'pp-speaker-selection': '()', 'pp-storage-access': '()', 'pp-usb': '()', 'pp-web-share': '()', 'pp-window-management': '()', 'pp-xr-spatial-tracking': '()', 'coop-value': 'same-origin', 'coep-value': 'require-corp', 'corp-value': 'same-origin', 'hsts-max-age': 63072000, 'hsts-include-subdomains': true, 'rp-value': 'strict-origin-when-cross-origin', 'xfo-value': 'SAMEORIGIN', 'cache-value': 'private, max-age=3600', 'xcto-value': 'nosniff' },
                wordpress: { 'csp-default-src': "'self' https:", 'csp-script-src': "'self' 'unsafe-inline' https:", 'csp-style-src': "'self' 'unsafe-inline' https:", 'csp-img-src': "'self' data: https:", 'csp-object-src': "'none'", 'csp-frame-ancestors': "'self'", 'csp-base-uri': "'self'", 'pp-accelerometer': '()', 'pp-ambient-light-sensor': '()', 'pp-attribution-reporting': '()', 'pp-autoplay': 'self', 'pp-bluetooth': '()', 'pp-Browse-topics': '()', 'pp-camera': '()', 'pp-compute-pressure': '()', 'pp-cross-origin-isolated': 'self', 'pp-display-capture': '()', 'pp-encrypted-media': 'self', 'pp-fullscreen': 'self', 'pp-gamepad': '()', 'pp-geolocation': '()', 'pp-gyroscope': '()', 'pp-hid': '()', 'pp-identity-credentials-get': '()', 'pp-idle-detection': '()', 'pp-local-fonts': '()', 'pp-magnetometer': '()', 'pp-microphone': '()', 'pp-midi': '()', 'pp-otp-credentials': '()', 'pp-payment': '()', 'pp-picture-in-picture': '*', 'pp-publickey-credentials-create': '()', 'pp-publickey-credentials-get': 'self', 'pp-screen-wake-lock': '()', 'pp-serial': '()', 'pp-speaker-selection': '()', 'pp-storage-access': '()', 'pp-usb': '()', 'pp-web-share': '()', 'pp-window-management': '()', 'pp-xr-spatial-tracking': '()', 'coop-value': 'same-origin', 'coep-value': 'require-corp', 'corp-value': 'same-origin', 'hsts-max-age': 31536000, 'hsts-include-subdomains': true, 'rp-value': 'strict-origin-when-cross-origin', 'xfo-value': 'SAMEORIGIN', 'cache-value': 'private, max-age=3600', 'xcto-value': 'nosniff' },
            };

            this.guidanceRules = {
                csp: [
                    { check: () => this.elements.form['csp-enabled'].checked && this.elements.form['csp-script-src'].value.includes("'unsafe-inline'"), severity: 'error', title: "High Risk: 'unsafe-inline' in script-src", message: "Allows inline scripts (e.g., <code>&lt;script&gt;...&lt;/script&gt;</code>, <code>onclick</code>), a primary vector for Cross-Site Scripting (XSS). Use nonce- or hash-based CSP for a secure implementation." },
                    { check: () => this.elements.form['csp-enabled'].checked && this.elements.form['csp-script-src'].value.includes("'unsafe-eval'"), severity: 'error', title: "High Risk: 'unsafe-eval' in script-src", message: "Allows the use of <code>eval()</code> and similar methods, which can execute arbitrary strings as code. This is a significant security risk and should be avoided." },
                    { check: () => { const value = this.elements.form['csp-object-src'].value; return this.elements.form['csp-enabled'].checked && value.trim() && value !== "'none'"; }, severity: 'warning', title: "Recommendation: Set object-src to 'none'", message: "The <code>object-src</code> directive is for legacy plugins like Flash. To prevent potential vulnerabilities associated with these plugins, it's safest to disable it entirely with <code>'none'</code>." },
                    { check: () => this.elements.form['csp-enabled'].checked && !this.elements.form['csp-frame-ancestors'].value.trim(), severity: 'warning', title: 'Recommendation: Define frame-ancestors', message: "The <code>frame-ancestors</code> directive prevents your site from being embedded in <code>&lt;iframe&gt;</code>, <code>&lt;frame&gt;</code>, etc., by malicious pages (clickjacking). Set to <code>'self'</code> or <code>'none'</code> to mitigate." },
                    { check: () => { const value = this.elements.form['csp-base-uri'].value; return this.elements.form['csp-enabled'].checked && (!value.trim() || (value !== "'self'" && value !== "'none'")); }, severity: 'info', title: 'Guidance: Set base-uri', message: "The <code>base-uri</code> directive restricts URLs in the <code>&lt;base&gt;</code> tag, preventing attackers from changing the base URL for relative paths. Setting to <code>'self'</code> or <code>'none'</code> is recommended." },
                    { check: () => this.elements.form['csp-enabled'].checked && this.elements.form['csp-style-src'].value.includes("'unsafe-inline'"), severity: 'warning', title: "Security Warning: 'unsafe-inline' in style-src", message: "Allows inline styles (e.g., <code>style=&quot;...&quot;</code>), which can be used for data exfiltration in some attacks. Prefer external stylesheets or nonce/hash-based CSP." },
                ],
                hsts: [
                    { check: () => this.elements.form['hsts-enabled'].checked && parseInt(this.elements.form['hsts-max-age'].value, 10) < 31536000, severity: 'warning', title: 'Recommendation: Increase HSTS max-age', message: 'A short HSTS duration leaves users vulnerable to downgrade attacks between visits. A value of at least one year (31536000) is recommended; two years (63072000) is ideal.' },
                    { check: () => this.elements.form['hsts-enabled'].checked && !this.elements.form['hsts-include-subdomains'].checked, severity: 'info', title: 'Guidance: Consider includeSubDomains', message: 'Without <code>includeSubDomains</code>, subdomains of your site can still be accessed over insecure connections. Enable this if all subdomains support HTTPS.' },
                ],
                coi: [
                    { check: () => this.elements.form['coi-enabled'].checked && (this.elements.form['coep-value'].value === 'unsafe-none' || this.elements.form['coop-value'].value === 'unsafe-none'), severity: 'warning', title: 'Security Warning: Cross-Origin Isolation Disabled', message: "Using <code>unsafe-none</code> for COOP or COEP opts out of Cross-Origin Isolation. This makes your site vulnerable to side-channel attacks like Spectre. Use <code>same-origin</code> and <code>require-corp</code> for maximum protection." },
                ],
                misc: [
                    { check: () => this.elements.form['misc-enabled'].checked && this.elements.form['xfo-value'].value.trim() !== '', severity: 'info', title: 'Legacy Header: X-Frame-Options', message: "<code>X-Frame-Options</code> is obsolete and has been replaced by the CSP <code>frame-ancestors</code> directive, which offers more granular control. You can remove XFO if using a modern CSP." },
                    { check: () => this.elements.form['misc-enabled'].checked && this.elements.form['rp-value'].value === 'no-referrer-when-downgrade', severity: 'info', title: 'Guidance: Consider a Stricter Referrer-Policy', message: "While <code>no-referrer-when-downgrade</code> is a common default, <code>strict-origin-when-cross-origin</code> provides better user privacy by trimming the referrer to just the origin for cross-origin requests." },
                ],
            };
        }

        init() {
            this._bindEventListeners();
            this.applyPreset('default');
        }

        _bindEventListeners() {
            this.elements.form.addEventListener('input', event => {
                if (event.target.dataset?.validate) {
                    this._validateInput(event.target);
                }
                this._updateAll();
            });

            this.elements.form.addEventListener('submit', event => {
                event.preventDefault();
            });

            this.elements.copyButton.addEventListener('click', () => this._copyToClipboard());

            this.elements.presetsPanel.addEventListener('click', event => {
                const button = event.target.closest('.preset-button');
                if (button) {
                    this.elements.presetButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    this.applyPreset(button.dataset.preset);
                }
            });

            document.body.addEventListener('mouseover', event => this._handleTooltip(event));
            document.body.addEventListener('mouseout', event => this._handleTooltip(event));
            document.body.addEventListener('mousemove', event => this._handleTooltip(event));
        }

        applyPreset(presetName) {
            const preset = this.presets[presetName];
            if (!preset) return;

            this.elements.allInputs.forEach(input => {
                if (preset[input.id] !== undefined) {
                    if (input.type === 'checkbox') {
                        input.checked = preset[input.id];
                    } else {
                        input.value = preset[input.id];
                    }
                }
            });

            this._updateAll();
        }

        _validateInput(input) {
            const errorDiv = input.parentElement.querySelector('.validation-error');
            if (!errorDiv) return;

            let errorMessage = '';
            const validationType = input.dataset.validate;
            const value = input.value;

            if (validationType === 'csp-source-list' && value.trim()) {
                const sources = value.trim().split(/\s+/);
                const invalid = sources.filter(s => !/^(?:'self'|'unsafe-inline'|'unsafe-eval'|'none'|'strict-dynamic'|'report-sample'|'nonce-(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?'|'sha(256|384|512)-[a-zA-Z0-9+/=]+'|[a-z]+-src|blob:|data:|filesystem:|https?:|wss?:|\*|(?:\*.)?[a-zA-Z0-9.-]+(?::[0-9]+)?)$/.test(s));
                if (invalid.length > 0) {
                    errorMessage = `Invalid source(s): ${invalid.join(', ')}`;
                }
            } else if (validationType === 'pp-value' && value.trim()) {
                if (!/^\(.*\)$/.test(value) && !/^\*$/.test(value) && value !== 'self') {
                    errorMessage = "Must be 'self', '*', or enclosed in ()";
                }
            }

            errorDiv.textContent = errorMessage;
            input.classList.toggle('input-invalid', !!errorMessage);
        }

        _runGuidance() {
            for (const [module, rules] of Object.entries(this.guidanceRules)) {
                const guidancePanel = document.getElementById(`guidance-${module}`);
                if (!guidancePanel) continue;

                while (guidancePanel.firstChild) {
                    guidancePanel.removeChild(guidancePanel.firstChild);
                }

                const activeMessages = rules.filter(rule => rule.check());

                if (activeMessages.length > 0) {
                    activeMessages.forEach(rule => {
                        const messageDiv = document.createElement('div');
                        messageDiv.className = `guidance-message guidance-message--${rule.severity}`;

                        const titleDiv = document.createElement('div');
                        titleDiv.className = 'guidance-title';
                        titleDiv.textContent = rule.title;

                        const messageP = document.createElement('p');
                        messageP.innerHTML = rule.message;

                        messageDiv.appendChild(titleDiv);
                        messageDiv.appendChild(messageP);
                        guidancePanel.appendChild(messageDiv);
                    });
                    guidancePanel.hidden = false;
                } else {
                    guidancePanel.hidden = true;
                }
            }
        }

        _buildHeaders() {
            const headers = [];
            const f = this.elements.form;

            if (f['csp-enabled'].checked) {
                const directives = Array.from(f.querySelectorAll('#csp-module input[data-directive]'))
                    .filter(i => i.value.trim() && !i.classList.contains('input-invalid'))
                    .map(i => `${i.dataset.directive} ${i.value.trim()}`);
                if (directives.length) headers.push(`Content-Security-Policy: ${directives.join('; ')}`);
            }
            if (f['pp-enabled'].checked) {
                const directives = Array.from(f.querySelectorAll('#pp-module input[data-permission]'))
                    .filter(i => i.value.trim() && !i.classList.contains('input-invalid'))
                    .map(i => `${i.dataset.permission}=${i.value.trim()}`);
                if (directives.length) headers.push(`Permissions-Policy: ${directives.join(', ')}`);
            }
            if (f['coi-enabled'].checked) {
                headers.push(`Cross-Origin-Opener-Policy: ${f['coop-value'].value}`);
                headers.push(`Cross-Origin-Embedder-Policy: ${f['coep-value'].value}`);
                headers.push(`Cross-Origin-Resource-Policy: ${f['corp-value'].value}`);
            }
            if (f['hsts-enabled'].checked) {
                let hsts = `max-age=${f['hsts-max-age'].value}`;
                if (f['hsts-include-subdomains'].checked) hsts += '; includeSubDomains';
                headers.push(`Strict-Transport-Security: ${hsts}`);
            }
            if (f['misc-enabled'].checked) {
                headers.push(`X-Content-Type-Options: ${f['xcto-value'].value}`);
                headers.push(`X-Frame-Options: ${f['xfo-value'].value}`);
                headers.push(`Referrer-Policy: ${f['rp-value'].value}`);
                headers.push(`Cache-Control: ${f['cache-value'].value}`);
            }
            return headers;
        }

        _updateOutput() {
            this.elements.outputCode.textContent = this._buildHeaders().join('\n');
        }

        _updateAll() {
            this._updateOutput();
            this._runGuidance();
        }

        _copyToClipboard() {
            const text = this.elements.outputCode.textContent;
            if (!text || !navigator.clipboard) return;

            navigator.clipboard.writeText(text).then(() => {
                this.elements.copyButton.textContent = 'Copied!';
                setTimeout(() => { this.elements.copyButton.textContent = 'Copy'; }, 2000);
            }).catch(() => {
                this.elements.copyButton.textContent = 'Error!';
                setTimeout(() => { this.elements.copyButton.textContent = 'Copy'; }, 2000);
            });
        }

        _handleTooltip(event) {
            const target = event.target.closest('.info-icon');
            const tooltip = this.elements.tooltipContainer;

            clearTimeout(this.tooltipTimeout);

            switch (event.type) {
                case 'mouseover':
                    if (target) {
                        tooltip.textContent = target.dataset.tooltip;
                        tooltip.style.display = 'block';
                        tooltip.style.left = `${event.pageX + 15}px`;
                        tooltip.style.top = `${event.pageY + 15}px`;
                        requestAnimationFrame(() => {
                            tooltip.style.opacity = '1';
                        });
                    }
                    break;
                case 'mouseout':
                    if (target) {
                        tooltip.style.opacity = '0';
                        this.tooltipTimeout = setTimeout(() => {
                            tooltip.style.display = 'none';
                        }, this.transitionSpeed);
                    }
                    break;
                case 'mousemove':
                    if (tooltip.style.opacity === '1') {
                        tooltip.style.left = `${event.pageX + 15}px`;
                        tooltip.style.top = `${event.pageY + 15}px`;
                    }
                    break;
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const app = new HttpArmorApp();
        app.init();
    });

})(window, document);
