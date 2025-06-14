# HttpArmor

A zero-dependency, client-side application for generating robust and secure HTTP headers based on current web security best practices.

**Live Application: [https://opensecurity.github.io/httparmor/](https://opensecurity.github.io/httparmor/)**

---

## Core Features

-   **Comprehensive Header Generation**: Configure Content-Security-Policy, Permissions-Policy, Strict-Transport-Security, Cross-Origin Policies, and other security-hardening headers.
-   **Real-Time Validation & Guidance**: The interface provides immediate feedback on invalid directive values and offers security recommendations to prevent misconfigurations.
-   **Application Presets**: Start with secure-by-default configurations for common application archetypes like Single Page Applications (SPAs), static websites, or WordPress.
-   **Purely Client-Side**: No data is sent to any server. All generation and validation happens in the browser, ensuring privacy and instantaneous results.
-   **Configuration Export**: Copy the complete header set with one click for direct use in your web server configuration.

## Usage

1.  **Navigate** to the [HttpArmor application](https://opensecurity.github.io/httparmor/).
2.  **Select a Preset**: Choose a starting template (e.g., "Modern SPA") that most closely matches your application.
3.  **Customize Directives**: Manually enable, disable, or modify header values in the configuration panels. Invalid inputs will be flagged immediately.
4.  **Review Guidance**: Observe the guidance panels for real-time recommendations and warnings about potentially insecure configurations (e.g., use of `'unsafe-inline'`).
5.  **Copy & Deploy**: Click the "Copy" button to copy all active headers to your clipboard. Paste them into your web server's configuration file.

---

## Server Configuration Examples

The generated output is a list of HTTP headers. Below are examples of how to implement them in common web servers.

### NGINX

Add the generated headers inside a `server` or `location` block in your `nginx.conf` or site-specific configuration file.

```nginx
# /etc/nginx/sites-available/your-site.conf

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com;

    # ... other configurations (ssl_certificate, etc.)

    # Add Generated Headers Here
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; ...";
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    # ... etc.

    location / {
        # ... proxy_pass or root directives
    }
}
````

### Apache

Add the generated headers to your `.htaccess` file or virtual host configuration (`<VirtualHost>`) using the `Header` directive. Ensure `mod_headers` is enabled.

```apache
# /var/www/html/.htaccess
# Requires mod_headers to be enabled: a2enmod headers

Header set Content-Security-Policy "default-src 'self'; script-src 'self'; ..."
Header set Strict-Transport-Security "max-age=63072000; includeSubDomains"
Header set X-Content-Type-Options "nosniff"
Header set Referrer-Policy "strict-origin-when-cross-origin"
# ... etc.
```

-----

## Available Presets

  - **Secure Default**: A strict, general-purpose configuration suitable for most modern web applications that do not use inline scripts or styles.
  - **Modern SPA**: A preset tailored for Single Page Applications (e.g., React, Vue, Angular) which may require specific style or image source allowances.
  - **Static Site**: A highly restrictive policy suitable for simple HTML/CSS/JS websites with no complex scripts or external dependencies.
  - **WordPress**: A more permissive configuration to accommodate the common use of inline scripts and styles found in the WordPress ecosystem and its plugins.

## Local Development

No build process is required. To run this application locally, clone the repository and serve the files with any simple web server.

```sh
# Clone the repository
git clone https://github.com/opensecurity/httparmor
cd httparmor
```

Open index.html with your browser.

-----

## Author

**Lucian BLETAN**
