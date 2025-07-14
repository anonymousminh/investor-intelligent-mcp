# Investor Intelligence Agent - MCP Server

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![MCP](https://img.shields.io/badge/MCP-Protocol-orange.svg)](https://modelcontextprotocol.io/)

A production-ready **Model Context Protocol (MCP)** server that automates intelligent stock portfolio monitoring, risk analysis, and alert generation. Built with TypeScript and designed for seamless integration with AI assistants and trading platforms.

## 🚀 Features

### 📊 **Portfolio Monitoring**

- Real-time stock price tracking via Yahoo Finance API
- Historical data analysis and trend detection
- Multi-portfolio support with customizable watchlists
- Automated portfolio performance calculations

### 🧠 **Intelligent Analysis**

- **Risk Assessment**: Volatility analysis, VaR calculations, and risk scoring
- **Sentiment Analysis**: Market sentiment tracking and news impact analysis
- **Trend Detection**: Technical indicators and pattern recognition
- **Predictive Analytics**: ML-powered price movement predictions

### 🔔 **Smart Alerting**

- Customizable alert thresholds and conditions
- Multi-channel notifications (Email, SMS, Webhook)
- Intelligent alert prioritization and deduplication
- Real-time market event detection

### 🔧 **Integration Capabilities**

- **Google Sheets**: Portfolio data synchronization and reporting
- **Gmail**: Automated email notifications and reports
- **Yahoo Finance**: Real-time market data and news
- **MCP Protocol**: Seamless AI assistant integration

## 🏗️ Architecture

```mermaid
graph TD
    A[MCP Client] --> B[MCP Server]
    B --> C[Portfolio Manager]
    B --> D[Risk Analyzer]
    B --> E[Alert Engine]

    C --> F[Yahoo Finance API]
    C --> G[Google Sheets API]
    E --> H[Gmail API]

    D --> I[Risk Models]
    D --> J[Sentiment Analysis]
    D --> K[Trend Detection]

    L[Redis Cache] --> B
    M[PostgreSQL] --> B
```

## 📦 Installation

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **PostgreSQL** 15+ (for production)
- **Redis** (optional, for caching)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/anonymousminh/investor-intelligence-mcp.git
cd investor-intelligence-mcp

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys and configuration

# Start development server
npm run dev
```

### Environment Configuration

Create a `.env` file with the following variables:

```env
# MCP Server Configuration
MCP_SERVER_PORT=9000
MCP_SERVER_HOST=127.0.0.1

# API Keys
YAHOO_FINANCE_API_KEY=your_yahoo_api_key
GOOGLE_SHEETS_API_KEY=your_google_api_key
GMAIL_API_KEY=your_gmail_api_key

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/investor_intelligence

# Redis Configuration (optional)
REDIS_URL=redis://localhost:6379
```

## 🛠️ Usage

### Starting the Server

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm run build
npm start

# Docker deployment
npm run docker:build
npm run docker:run
```

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Testing
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking

# Evaluation
npm run eval             # Run evaluation scenarios

# Docker
npm run docker:build     # Build Docker image
npm run docker:run       # Run Docker container
```

### MCP Protocol Integration

The server implements the Model Context Protocol, providing tools for:

- **Portfolio Management**: Add, remove, and monitor stocks
- **Risk Analysis**: Calculate risk metrics and generate reports
- **Alert Configuration**: Set up custom alerts and notifications
- **Data Export**: Export portfolio data to Google Sheets

Example MCP client usage:

```typescript
// Connect to the MCP server
const client = new MCPClient('localhost:9000');

// Get portfolio overview
const portfolio = await client.callTool('getPortfolio', {
  portfolioId: 'main',
});

// Set up price alert
await client.callTool('setAlert', {
  symbol: 'AAPL',
  condition: 'price > 150',
  notification: 'email',
});
```

## 📚 Documentation

### 📖 **Getting Started**

- [Installation Guide](docs/installation.md)
- [Configuration](docs/configuration.md)
- [Quick Start Tutorial](docs/getting-started.md)

### 🏗️ **Architecture**

- [System Design](docs/architecture/system-design.md)
- [Data Flow](docs/architecture/data-flow.md)
- [Security Architecture](docs/architecture/security.md)

### 🔌 **API Reference**

- [MCP Protocol](docs/api/mcp-protocol.md)
- [Tools Reference](docs/api/tools-reference.md)
- [Data Models](docs/api/data-models.md)

### 🚀 **Deployment**

- [Production Setup](docs/deployment/production.md)
- [Docker Deployment](docs/deployment/docker.md)
- [AWS Configuration](docs/deployment/aws-setup.md)

### 🧪 **Development**

- [Contributing Guidelines](docs/development/contributing.md)
- [Testing Strategy](docs/development/testing.md)
- [Code Standards](docs/development/coding-standards.md)

### 📊 **Evaluation**

- [Performance Benchmarks](docs/evaluation/benchmarks.md)
- [Test Scenarios](docs/evaluation/test-scenarios.md)
- [Metrics Framework](docs/evaluation/metrics.md)

## 🔧 Development

### Project Structure

```
src/
├── core/                 # MCP server core
│   ├── mcp-server.ts    # Main MCP server implementation
│   ├── auth/            # Authentication and authorization
│   ├── config/          # Configuration management
│   └── utils/           # Utility functions
├── tools/               # MCP tools implementation
│   ├── yahoo-finance/   # Yahoo Finance integration
│   ├── google-sheets/   # Google Sheets integration
│   └── gmail/           # Gmail integration
├── intelligence/        # AI/ML intelligence modules
│   ├── risk/            # Risk analysis algorithms
│   ├── sentiment/       # Sentiment analysis
│   └── trend/           # Trend detection
├── workflows/           # Automated workflows
├── evaluation/          # Testing and evaluation
└── types/              # TypeScript type definitions
```

### Adding New Tools

1. Create a new tool in `src/tools/`
2. Implement the tool interface
3. Register the tool in the MCP server
4. Add tests in `tests/`
5. Update documentation

### Testing

```bash
# Run all tests
npm test

# Run specific test suites
npm test -- --testNamePattern="Yahoo Finance"

# Run with coverage
npm run test:coverage

# Run integration tests
npm test -- --testPathPattern="integration"
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](docs/development/contributing.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run the test suite: `npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io/) for the MCP specification
- [Yahoo Finance API](https://finance.yahoo.com/) for market data
- [Google APIs](https://developers.google.com/) for integration capabilities

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/anonymousminh/investor-intelligence-mcp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/anonymousminh/investor-intelligence-mcp/discussions)
- **Email**: anhminh7802@gmail.com

---

**Built with ❤️ for intelligent portfolio management**
