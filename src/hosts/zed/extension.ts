/**
 * Zed Extension Entry Point for Cline
 * 
 * This file serves as the main entry point for the Cline extension in Zed editor.
 * It initializes the extension and sets up the necessary providers and services.
 * 
 * Note: This is a conceptual implementation based on anticipated Zed extension API.
 * The actual implementation will need to be adapted to Zed's final extension system.
 */

import { HostProvider } from "@/hosts/host-provider"
import { WebviewProviderType } from "@/shared/webview/types"
import { ZedWebviewProvider } from "./ZedWebviewProvider"
import { ZedDiffViewProvider } from "./ZedDiffViewProvider"
import { zedHostBridgeClient } from "./hostbridge/client/host-grpc-client"

// Zed extension context type (placeholder)
interface ZedExtensionContext {
	subscriptions: Array<{ dispose(): void }>
	extensionPath: string
	globalStoragePath: string
}

/**
 * Main extension activation function for Zed
 */
export function activate(context: ZedExtensionContext) {
	console.log("Activating Cline extension for Zed")

	try {
		// Initialize host provider with Zed-specific implementations
		setupZedHostProvider(context)
		
		// Initialize core Cline functionality
		initializeCline(context)
		
		console.log("Cline extension activated successfully in Zed")
	} catch (error) {
		console.error("Failed to activate Cline extension in Zed:", error)
	}
}

/**
 * Extension deactivation function for Zed
 */
export function deactivate() {
	console.log("Deactivating Cline extension for Zed")
	
	// Clean up resources
	if (HostProvider.isInitialized()) {
		HostProvider.reset()
	}
}

/**
 * Set up Zed-specific host providers
 */
function setupZedHostProvider(context: ZedExtensionContext) {
	console.log("Setting up Zed host providers...")

	const createWebview = (type: WebviewProviderType) => new ZedWebviewProvider(context, type)
	const createDiffView = () => new ZedDiffViewProvider()
	
	// Placeholder for Zed output channel
	const logToChannel = (message: string) => {
		console.log("[Cline]", message)
	}
	
	// Placeholder for Zed callback URL
	const getCallbackUrl = async () => `zed://extension/cline`
	
	// Placeholder for binary location
	const getBinaryLocation = async (name: string) => {
		// In Zed, this might be handled differently
		return `/usr/local/bin/${name}`
	}

	HostProvider.initialize(
		createWebview,
		createDiffView,
		zedHostBridgeClient,
		logToChannel,
		getCallbackUrl,
		getBinaryLocation,
		context.extensionPath,
		context.globalStoragePath,
	)
}

/**
 * Initialize core Cline functionality
 */
function initializeCline(context: ZedExtensionContext) {
	console.log("Initializing Cline core functionality...")
	
	// TODO: Initialize Cline services once the core is refactored to support Zed
	// This would include:
	// - Setting up webview providers
	// - Initializing command handlers
	// - Setting up event listeners
	// - Registering Zed-specific commands
	
	// For now, just register a basic command
	registerZedCommands(context)
}

/**
 * Register Zed-specific commands
 */
function registerZedCommands(context: ZedExtensionContext) {
	// TODO: Register commands using Zed's command API
	// Examples:
	// - cline.new-task
	// - cline.open-settings
	// - cline.open-history
	// etc.
	
	console.log("Zed commands registered (placeholder)")
}