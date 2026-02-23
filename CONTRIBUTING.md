# Contributing to InvoiceGPT

Thank you for your interest in contributing! This guide walks you through everything you need to get started.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Style](#coding-style)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Issues](#reporting-issues)

---

## Prerequisites

Before contributing, make sure you have the following installed:

- **Python 3.9+**
- **Git**
- An OpenAI API key (required to run the app locally)

---

## Getting Started

### 1. Fork the Repository

Click the **Fork** button at the top right of the repository page to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/<your-username>/InvoiceGPT.git
cd InvoiceGPT
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Up Environment Variables

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 5. Run the Application Locally

```bash
python app.py
```

---

## Development Workflow

### Create a Branch

Always create a new branch for your changes. Use a descriptive name:

```bash
# For new features
git checkout -b feature/your-feature-name

# For bug fixes
git checkout -b fix/your-bug-description
```

### Make Your Changes

- Keep changes focused and atomic — one feature or fix per branch.
- Write clear, self-documenting code.
- Add comments where the logic is non-obvious.

### Test Your Changes

Before submitting, make sure your changes work as expected:

```bash
# Run existing tests (if available)
python -m pytest

# Test manually by running the app
python app.py
```

---

## Coding Style

- Use **descriptive variable and function names**.
- Follow **PEP 8** for Python formatting. Use a linter like `flake8` or `black`:
  ```bash
  black .
  flake8 .
  ```
- Write **descriptive commit messages** that explain *what* and *why*:
  ```
  # Good
  fix: handle empty invoice fields gracefully
  feat: add support for multi-page PDF parsing

  # Bad
  fix stuff
  update
  ```
- Keep functions small and single-purpose.

---

## Submitting a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** against the `main` branch of the original repository.

3. **Fill in the PR description** clearly:
   - What problem does this PR solve?
   - What changes did you make?
   - How can reviewers test your changes?
   - Screenshots or examples (if applicable)

4. **Be responsive to feedback** — maintainers may request changes. Update your branch and push again; the PR will update automatically.

> ⚠️ PRs without a clear explanation will not be accepted.

---

## Reporting Issues

Found a bug or have a feature request? Please [open an issue](../../issues/new) and include:

- A clear title and description
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Any relevant logs or screenshots

---

Thanks for contributing — every improvement counts. Keep Smiling ☺️!
