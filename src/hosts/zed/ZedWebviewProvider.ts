import { WebviewProvider } from "@/core/webview"
import { WebviewProviderType } from "@/shared/webview/types"

/**
 * Zed-specific webview provider implementation.
 * This class provides webview functionality for the Zed editor environment.
 */
export class ZedWebviewProvider implements WebviewProvider {
	private webviewPanel: any // Zed webview panel interface
	private disposables: Array<() => void> = []

	constructor(
		private context: any, // Zed extension context
		private type: WebviewProviderType,
	) {}

	/**
	 * Initialize the webview provider
	 */
	public async initialize(): Promise<void> {
		// Implementation for Zed webview initialization
		// This would use Zed's webview API once available
		console.log("Initializing Zed webview provider for type:", this.type)
	}

	/**
	 * Show the webview
	 */
	public show(): void {
		if (this.webviewPanel) {
			this.webviewPanel.reveal?.()
		}
	}

	/**
	 * Hide the webview
	 */
	public hide(): void {
		if (this.webviewPanel) {
			this.webviewPanel.dispose?.()
		}
	}

	/**
	 * Post a message to the webview
	 */
	public postMessage(message: any): void {
		if (this.webviewPanel) {
			this.webviewPanel.postMessage?.(message)
		} else {
			console.warn("Cannot post message: Zed webview panel not initialized")
		}
	}

	/**
	 * Set up message handlers from the webview
	 */
	public onDidReceiveMessage(handler: (message: any) => void): void {
		if (this.webviewPanel) {
			// Set up message listener for Zed webview
			this.webviewPanel.onDidReceiveMessage?.(handler)
		}
	}

	/**
	 * Get the HTML content for the webview
	 */
	public getHtmlForWebview(): string {
		// Return the built webview HTML for Zed platform
		// This should load the webview-ui build with PLATFORM=zed
		return `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Cline</title>
			</head>
			<body>
				<div id="root"></div>
				<script>
					// Zed webview bridge setup
					window.zedPostMessage = function(message) {
						// This would be implemented by Zed's webview system
						console.log('Zed postMessage:', message);
					};
				</script>
				<script src="./assets/index.js"></script>
			</body>
			</html>
		`
	}

	/**
	 * Update the webview content
	 */
	public updateContent(html: string): void {
		if (this.webviewPanel) {
			this.webviewPanel.webview.html = html
		}
	}

	/**
	 * Dispose of the webview provider and clean up resources
	 */
	public dispose(): void {
		this.disposables.forEach((dispose) => dispose())
		this.disposables = []

		if (this.webviewPanel) {
			this.webviewPanel.dispose?.()
			this.webviewPanel = null
		}
	}

	/**
	 * Get the webview view type
	 */
	public getViewType(): string {
		return `cline.${this.type}`
	}

	/**
	 * Check if the webview is visible
	 */
	public isVisible(): boolean {
		return this.webviewPanel?.visible ?? false
	}

	/**
	 * Set the webview title
	 */
	public setTitle(title: string): void {
		if (this.webviewPanel) {
			this.webviewPanel.title = title
		}
	}
}