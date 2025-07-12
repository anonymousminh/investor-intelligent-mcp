# Technical Architecture Overview

## System Components
```mermaid
graph TD
    A[MCP Server] --> B[Google Sheets API]
    A --> C[Yahoo Finance API]
    A --> D[Gmail API]
    A --> E[OpenAI API]
    A --> F[Redis Cache]
    A --> G[PostgreSQL DB]