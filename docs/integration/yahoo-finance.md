# Yahoo Finance Integration

## Data Acquisition Method
- Uses `yahoo-finance2` community package

## Rate Limiting
- 10 requests/second max
- Automatic request throttling

## Supported Data
```mermaid
graph LR
A[Yahoo Finance] --> B[Real-time Quotes]
A --> C[Historical Prices]
A --> D[Company Information]
A --> E[Earnings Calendar]