# Model Context Protocol (MCP) - API Reference

This document describes the Model Context Protocol (MCP) as implemented by the Investor Intelligence MCP Server. MCP is a protocol for structured, tool-based communication between clients (such as AI assistants) and the server, enabling intelligent portfolio management, risk analysis, and alerting.

---

## 1. Protocol Overview

- **Transport:** TCP (default port: 9000)
- **Format:** JSON messages over a persistent socket connection
- **Pattern:** Request/Response (bi-directional)
- **Authentication:** (TBD, see future security docs)

---

## 2. Message Structure

All MCP messages are JSON objects with at least a `type` field. Example:

```json
{
  "type": "callTool",
  "tool": "getQuote",
  "params": { "symbol": "AAPL" },
  "requestId": "abc123"
}
```

### Common Fields

- `type` (string): The message type (see below)
- `requestId` (string, optional): Unique ID for correlating requests and responses
- `tool` (string, for tool calls): Name of the tool to invoke
- `params` (object, for tool calls): Parameters for the tool

---

## 3. Supported Message Types

### 3.1. `initialize`

Establishes a new session or handshake.

```json
{
  "type": "initialize",
  "client": "my-client",
  "version": "1.0.0"
}
```

**Response:**

```json
{
  "type": "initialized",
  "server": "investor-intelligence-mcp",
  "version": "1.0.0"
}
```

### 3.2. `listTools`

Lists all available tools (APIs) exposed by the server.

```json
{
  "type": "listTools"
}
```

**Response:**

```json
{
  "type": "toolsList",
  "tools": [
    { "name": "getQuote", "description": "Get real-time stock quote" },
    { "name": "getHistoricalData", "description": "Fetch historical price data" },
    { "name": "setAlert", "description": "Configure price alerts" },
    ...
  ]
}
```

### 3.3. `callTool`

Invokes a specific tool with parameters.

```json
{
  "type": "callTool",
  "tool": "getQuote",
  "params": { "symbol": "AAPL" },
  "requestId": "abc123"
}
```

**Response:**

```json
{
  "type": "toolResult",
  "tool": "getQuote",
  "result": {
    "symbol": "AAPL",
    "price": 172.34,
    "currency": "USD"
  },
  "requestId": "abc123"
}
```

### 3.4. `listResources`

Lists available resources (e.g., portfolios, watchlists).

```json
{
  "type": "listResources"
}
```

**Response:**

```json
{
  "type": "resourcesList",
  "resources": [
    { "type": "portfolio", "id": "main", "name": "Main Portfolio" },
    ...
  ]
}
```

---

## 4. Tool Invocation

Each tool is a callable function exposed by the server. Example tools:

- `getQuote`: Get real-time stock quote
- `getHistoricalData`: Fetch historical price data
- `setAlert`: Configure price or event alerts
- `exportToSheets`: Export data to Google Sheets

**Example:**

```json
{
  "type": "callTool",
  "tool": "getHistoricalData",
  "params": { "symbol": "AAPL", "period1": "2023-01-01", "interval": "1d" },
  "requestId": "req-456"
}
```

---

## 5. Error Handling

If a request is malformed or fails, the server responds with an error message:

```json
{
  "type": "error",
  "error": "Invalid message format",
  "requestId": "abc123"
}
```

- All errors include a human-readable `error` field and the original `requestId` if provided.

---

## 6. Extensibility

- New tools can be added by implementing them in `src/tools/` and registering with the MCP server.
- Message types can be extended for new features (e.g., authentication, streaming updates).
- The protocol is designed to be forward-compatible.

---

## 7. Example Session

1. **Client connects to server (TCP, port 9000)**
2. **Client sends `initialize` message**
3. **Server responds with `initialized`**
4. **Client sends `listTools`**
5. **Server responds with available tools**
6. **Client sends `callTool` for `getQuote`**
7. **Server responds with `toolResult`**

---

## 8. References

- [Model Context Protocol (MCP) Specification](https://modelcontextprotocol.io/)
- [Investor Intelligence MCP GitHub](https://github.com/anonymousminh/investor-intelligence-mcp)

For implementation details, see the server code in `src/core/mcp-server.ts`.
