#!/usr/bin/env node

/**
 * Build script for creating Zed extension package
 * 
 * This script builds the Cline extension for Zed editor by:
 * 1. Building the webview UI for Zed platform
 * 2. Building the extension code for Zed
 * 3. Creating the proper Zed extension package structure
 */

import fs from "fs/promises"
import path from "path"
import { execSync } from "child_process"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")

console.log("🔨 Building Cline extension for Zed...")

async function buildZedExtension() {
	try {
		// Step 1: Build webview UI for Zed platform
		console.log("📦 Building webview UI for Zed platform...")
		process.chdir(path.join(rootDir, "webview-ui"))
		execSync("PLATFORM=zed npm run build", { stdio: "inherit" })
		
		// Step 2: Create Zed extension output directory
		const zedBuildDir = path.join(rootDir, "dist-zed")
		await fs.mkdir(zedBuildDir, { recursive: true })
		
		// Step 3: Copy webview build to Zed extension directory
		console.log("📋 Copying webview build...")
		const webviewBuildDir = path.join(rootDir, "webview-ui", "build")
		const zedWebviewDir = path.join(zedBuildDir, "webview")
		await copyDirectory(webviewBuildDir, zedWebviewDir)
		
		// Step 4: Copy Zed-specific files
		console.log("📋 Copying Zed extension files...")
		
		// Copy extension manifest
		const extensionJson = path.join(rootDir, "extension.json")
		const targetExtensionJson = path.join(zedBuildDir, "extension.json")
		await fs.copyFile(extensionJson, targetExtensionJson)
		
		// Copy documentation
		const zedPortDoc = path.join(rootDir, "docs", "ZED_PORT.md")
		const targetDoc = path.join(zedBuildDir, "README.md")
		await fs.copyFile(zedPortDoc, targetDoc)
		
		// Step 5: Create package info
		console.log("📝 Creating package info...")
		const packageInfo = {
			name: "cline-zed",
			version: "3.29.0",
			description: "Cline AI coding assistant for Zed editor",
			platform: "zed",
			built: new Date().toISOString(),
			note: "This is an experimental port of Cline to Zed editor. Actual functionality depends on Zed's extension API availability."
		}
		
		await fs.writeFile(
			path.join(zedBuildDir, "package-info.json"),
			JSON.stringify(packageInfo, null, 2)
		)
		
		console.log("✅ Zed extension build completed!")
		console.log(`📁 Output directory: ${zedBuildDir}`)
		console.log("")
		console.log("Next steps:")
		console.log("1. Review the generated extension files in dist-zed/")
		console.log("2. Adapt the implementation to Zed's actual extension API when available")
		console.log("3. Test the extension with Zed once webview support is ready")
		
	} catch (error) {
		console.error("❌ Failed to build Zed extension:", error.message)
		process.exit(1)
	}
}

/**
 * Recursively copy a directory
 */
async function copyDirectory(src, dest) {
	await fs.mkdir(dest, { recursive: true })
	const entries = await fs.readdir(src, { withFileTypes: true })
	
	for (const entry of entries) {
		const srcPath = path.join(src, entry.name)
		const destPath = path.join(dest, entry.name)
		
		if (entry.isDirectory()) {
			await copyDirectory(srcPath, destPath)
		} else {
			await fs.copyFile(srcPath, destPath)
		}
	}
}

// Run the build
if (import.meta.url === `file://${process.argv[1]}`) {
	buildZedExtension()
}