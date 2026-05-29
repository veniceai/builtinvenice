# Security Policy

## Reporting a vulnerability

If you've found a security issue in this repository or in the live site at https://builtinvenice.ai, please **do not open a public GitHub issue**.

Report it through the Venice AI bug bounty program: https://venice.ai/bug-bounty

## Scope

This repository is a static showcase site (React + Vite, deployed to Cloudflare Pages). It does not store user data or run a backend. Issues most relevant here include:

- XSS via project descriptions, tags, or other listing content rendered in the UI.
- Supply-chain or dependency vulnerabilities affecting the build.
- Leaked secrets in commit history.

Listings themselves (links to third-party projects) are not in scope — report problems with a listed project to its own maintainers.
