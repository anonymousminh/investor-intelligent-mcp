import * as net from 'net';

export interface MCPServerConfig {
  port: number;
  host: string;
  // Add more config options as needed
}

class ConfigValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigValidationError';
  }
}

/**
 * Validates the MCP server configuration parameters.
 * Throws ConfigValidationError if validation fails.
 */
function validateMCPServerConfig(config: MCPServerConfig): void {
  if (typeof config.port !== 'number' || isNaN(config.port)) {
    throw new ConfigValidationError('Invalid or missing port number in MCPServerConfig.');
  }
  if (config.port < 1 || config.port > 65535) {
    throw new ConfigValidationError('Port number must be between 1 and 65535.');
  }
  if (typeof config.host !== 'string' || config.host.trim() === '') {
    throw new ConfigValidationError('Invalid or missing host in MCPServerConfig.');
  }
}

/**
 * Loads MCP server configuration from environment variables with sensible defaults.
 * Validates the configuration before returning.
 */
function loadMCPServerConfig(): MCPServerConfig {
  const config: MCPServerConfig = {
    port: process.env.MCP_SERVER_PORT ? parseInt(process.env.MCP_SERVER_PORT, 10) : 9000,
    host: process.env.MCP_SERVER_HOST || '127.0.0.1',
    // Add more config options and defaults here
  };
  validateMCPServerConfig(config);
  return config;
}

export class MCPServer {
  private config: MCPServerConfig;
  private server: net.Server | null = null;

  constructor(config?: MCPServerConfig) {
    this.config = config ?? loadMCPServerConfig();
  }

  /**
   * Initializes the MCP server with the provided configuration.
   */
  public async initialize(): Promise<void> {
    try {
      this.server = net.createServer((socket) => {
        console.log('New MCP connection established:', socket.remoteAddress, socket.remotePort);

        socket.on('data', (data) => {
          // Handle incoming MCP protocol data here
          console.log('[MCP INCOMING]', data.toString());
          try {
            const message = JSON.parse(data.toString());

            // Basic validation of message type
            if (!message.type) {
              const errorMsg = JSON.stringify({ error: 'Missing message type' });
              console.error('Error: Missing message type in received data:', data.toString());
              socket.write(errorMsg);
              return;
            }

            // Route to appropriate handler based on message type
            switch (message.type) {
              case 'initialize':
                this.handleInitialize(data, socket);
                break;
              case 'listTools':
                this.handleListTools(data, socket);
                break;
              case 'callTool':
                this.handleCallTool(data, socket);
                break;
              case 'listResources':
                this.handleListResources(data, socket);
                break;
              default:
                const unknownMsg = JSON.stringify({
                  error: `Unknown message type: ${message.type}`,
                });
                console.log('[MCP OUTGOING]', unknownMsg);
                socket.write(unknownMsg);
            }
          } catch (err) {
            const errorMsg = JSON.stringify({ error: 'Invalid message format' });
            console.error('[MCP OUTGOING]', errorMsg);
            socket.write(errorMsg);
            console.error('Malformed message received:', data.toString(), err);
          }
        });

        socket.on('end', () => {
          console.log('MCP connection ended:', socket.remoteAddress, socket.remotePort);
        });

        socket.on('error', (err) => {
          console.error('Socket error:', err);
        });
      });

      const port = this.config.port || 9000;
      this.server.listen(port, () => {
        console.log(`MCP Server listening on port ${port}`);
      });
    } catch (error) {
      console.error('Error initializing MCP Server:', error);
      throw error;
    }
  }

  /**
   * Starts the MCP server.
   */
  public async start(): Promise<void> {
    if (!this.server) {
      await this.initialize();
    } else {
      const port = this.config.port || 9000;
      this.server.listen(port, () => {
        console.log(`MCP Server started on port ${port}`);
      });
    }
  }

  /**
   * Stops the MCP server.
   */
  public async stop(): Promise<void> {
    if (this.server) {
      this.server.close(() => {
        console.log('MCP Server stopped.');
      });
      this.server = null;
    }
  }

  /**
   * Restarts the MCP server.
   */
  public async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }

  /**
   * Placeholder for handling client initialization.
   */
  private handleInitialize(data: Buffer, socket: net.Socket): void {
    // TODO: Implement client initialization logic
  }

  /**
   * Placeholder for handling tool discovery.
   */
  private handleListTools(data: Buffer, socket: net.Socket): void {
    // TODO: Implement tool discovery logic
  }

  /**
   * Placeholder for handling tool execution.
   */
  private handleCallTool(data: Buffer, socket: net.Socket): void {
    // TODO: Implement tool execution logic
  }

  /**
   * Placeholder for handling resource discovery.
   */
  private handleListResources(data: Buffer, socket: net.Socket): void {
    // TODO: Implement resource discovery logic
  }
}
