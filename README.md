# DevLab

A sophisticated, TypeScript-powered tool designed to parse JSON data and visualise **JSONPath** queries with precision. This tool allows developers to navigate complex data structures, highlight specific fields, and extract data efficiently.

## Access the App

You can use the live version of the application directly in your browser:
👉 **[https://dev-hub.onixbyte.dev](https://dev-hub.onixbyte.dev)**

## New Features

* **Interactive Tree Navigation**: Nodes can now be expanded or collapsed, making it easier to manage and analyse large, deeply nested JSON objects.
* **One-Click Extraction**: Seamlessly copy the data selected by your JSONPath expression to your clipboard with a single click.
* **Precise Highlighting**: Visual cues (using Tailwind CSS rings and background colours) indicate exactly which fields match your query.

## Overview

Working with large data responses can be cumbersome. This visualiser provides a structured "Live Preview" that mirrors the hierarchy of your data while allowing you to isolate and extract the information that matters most.

## Technical Details

### Collapsibility Logic
The tree component uses a recursive structure where each object or array node maintains its own local `isOpen` state. This ensures that toggling one section of the data does not interfere with the rest of the tree.

### Data Extraction
By utilising `jp.query(parsedJson, expression)`, the application gathers all matching values into a result array, which is then formatted and copied to the system clipboard using the modern `navigator.clipboard` API.

## Usage

1.  **Paste** your JSON into the source editor.
2.  **Enter** your JSONPath (e.g., `$..staff_members[?(@.active)]`).
3.  **Navigate** the tree by clicking the expansion icons next to objects and arrays.
4.  **Copy** the matching results using the "Copy Matches" button to use the filtered data elsewhere.

## Privacy & Security

We take data privacy seriously. **Your data never leaves your machine.**
* **Local Processing**: All JSON parsing and JSONPath queries are performed locally within your browser.
* **No Server Uploads**: The source code contains no functionality to upload your JSON data to any external servers, including our hosting provider (Vercel).
* **Secure Environment**: You can safely use this tool with sensitive configuration files or API responses without risk of data exposure.

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/onixbyte/dev-hub.git
    cd dev-hub
    ```

2. Install dependencies

    ```bash
    pnpm install
    ```

3. Run the development server

    ```bash
    pnpm dev
    ```
---
*Developed with a focus on type safety and user experience.*
