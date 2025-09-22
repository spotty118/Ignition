# Zed Extension Port for Cline

This directory contains the necessary files and configurations to port Cline to work with Zed editor.

## Current Implementation Status

### ✅ Completed
- [x] Added Zed platform configuration to `webview-ui/src/config/platform-configs.json`
- [x] Updated webview platform configuration system to support Zed
- [x] Created Zed-specific message handling in platform.config.ts
- [x] Created ZedWebviewProvider stub implementation
- [x] Updated Vite config to build for Zed platform

### 🚧 In Progress
- [ ] Zed extension manifest (extension.json) - needs Zed-specific format
- [ ] Zed-specific host bridge implementation
- [ ] Build system integration for Zed
- [ ] Zed webview integration (depends on Zed's webview API)

### 📋 TODO
- [ ] Research Zed extension API and webview capabilities
- [ ] Implement Zed-specific file system access
- [ ] Implement Zed-specific terminal integration
- [ ] Create Zed extension packaging/build process
- [ ] Test integration with Zed editor

## Architecture

The port follows the existing multi-platform architecture:

1. **Platform Configuration**: `webview-ui/src/config/platform-configs.json` defines Zed-specific settings
2. **Message Handling**: `webview-ui/src/config/platform.config.ts` handles Zed-specific communication
3. **Host Implementation**: `src/hosts/zed/` contains Zed-specific providers
4. **Build System**: Vite configuration supports building for Zed platform

## Zed Platform Configuration

```json
{
  "zed": {
    "messageEncoding": "json",
    "showNavbar": false,
    "postMessageHandler": "zed",
    "togglePlanActKeys": "Meta+Shift+a",
    "supportsTerminalMentions": false
  }
}
```

## Building for Zed

To build the webview for Zed platform:

```bash
cd webview-ui
PLATFORM=zed npm run build
```

## Notes for Zed Integration

1. **Webview API**: Zed's webview API is still evolving. This implementation provides a foundation that can be adapted once Zed's webview capabilities are fully documented.

2. **Extension Format**: Zed uses a different extension format than VS Code. The current `extension.json` is a placeholder that needs to be updated to match Zed's actual requirements.

3. **Host Bridge**: The host bridge implementation will need to be adapted to use Zed's APIs for file system access, terminal integration, and other editor capabilities.

4. **Communication**: Uses JSON message encoding for communication between webview and extension host, similar to the standalone implementation.

## Dependencies on Zed Development

This port depends on several Zed features that may still be under development:
- Webview support for extensions
- Extension API for file system access
- Extension API for terminal integration
- Extension packaging and distribution system

## Testing

Once Zed's extension system is ready, the implementation can be tested by:
1. Building the webview for Zed platform
2. Creating a proper Zed extension package
3. Installing the extension in Zed
4. Testing webview integration and core functionality