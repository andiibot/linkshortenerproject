---
description: Read this file to understand how to fetch data from an API in this project.
---

# Data Fetching Guidelines

When fetching data from an API in this project, please follow these guidelines:

## 1. Use server components for data fetching

In Next.js, ALWAYS use server components to fetch data. NEVER use client components for data fetching.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the /data directory to fetch darta. NEVER fetch data directly in the component.

ALL helper functions in the /data diorectory should use Drizzle ORM for database interactions.
