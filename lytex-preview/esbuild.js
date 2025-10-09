const esbuild = require("esbuild");

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
	name: 'esbuild-problem-matcher',

	setup(build) {
		build.onStart(() => {
			console.log('[watch] build started');
		});
		build.onEnd((result) => {
			result.errors.forEach(({ text, location }) => {
				console.error(`✘ [ERROR] ${text}`);
				console.error(`    ${location.file}:${location.line}:${location.column}:`);
			});
			console.log('[watch] build finished');
		});
	},
};

async function main() {
	const ctx = await esbuild.context({
		entryPoints: [
			'src/extension.ts'
		],
		bundle: true,
		format: 'cjs',
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		platform: 'node',
		outfile: 'dist/extension.js',
		external: ['vscode'],
		logLevel: 'silent',
		plugins: [
			/* add to the end of plugins array */
			esbuildProblemMatcherPlugin,
		],
	});
	if (watch) {
		await ctx.watch();
	} else {
		await ctx.rebuild();
		// Ensure static webview assets are copied to dist so the packaged extension can load them
	const fs = require('fs');
		const srcWebview = require('path').join(process.cwd(), 'src', 'preview', 'webview');
		const distWebview = require('path').join(process.cwd(), 'dist', 'preview', 'webview');

		function copyRecursive(src, dest) {
			if (!fs.existsSync(src)) {
				return;
			}
			if (!fs.existsSync(dest)) { fs.mkdirSync(dest, { recursive: true }); }
			const entries = fs.readdirSync(src, { withFileTypes: true });
			for (const entry of entries) {
				const srcPath = require('path').join(src, entry.name);
				const destPath = require('path').join(dest, entry.name);
				if (entry.isDirectory()) {
					copyRecursive(srcPath, destPath);
				} else if (entry.isFile()) {
					// Skip TypeScript source files; we only want runtime assets in dist
					if (srcPath.endsWith('.ts')) {
						continue;
					}
					fs.copyFileSync(srcPath, destPath);
				}
			}
		}

		copyRecursive(srcWebview, distWebview);

		// Also copy compile scripts folder so shell scripts are available in the packaged extension
		// Copy both preview/compile (if present) and top-level src/compile into dist
		const srcCompilePreview = require('path').join(process.cwd(), 'src', 'preview', 'compile');
		const distCompilePreview = require('path').join(process.cwd(), 'dist', 'preview', 'compile');
		copyRecursive(srcCompilePreview, distCompilePreview);

		const srcCompile = require('path').join(process.cwd(), 'src', 'compile');
		const distCompile = require('path').join(process.cwd(), 'dist', 'compile');
		copyRecursive(srcCompile, distCompile);

		// Copy top-level install.sh if present
		const rootInstall = require('path').join(process.cwd(), 'install.sh');
		if (fs.existsSync(rootInstall)) {
			const destInstall = require('path').join(process.cwd(), 'dist', 'install.sh');
			fs.copyFileSync(rootInstall, destInstall);
		}

		// Ensure any .sh files in dist are executable (set 755)
		function makeShellScriptsExecutable(dir) {
			if (!fs.existsSync(dir)) {
				return;
			}
			const entries = fs.readdirSync(dir, { withFileTypes: true });
			for (const entry of entries) {
				const p = require('path').join(dir, entry.name);
				if (entry.isDirectory()) {
					makeShellScriptsExecutable(p);
				} else if (entry.isFile() && p.endsWith('.sh')) {
					try {
						fs.chmodSync(p, 0o755);
					} catch (e) {
						console.warn('Failed to chmod shell script', p, e);
					}
				}
			}
		}

		makeShellScriptsExecutable(distCompile);
		if (fs.existsSync(require('path').join(process.cwd(), 'dist', 'install.sh'))) {
			makeShellScriptsExecutable(require('path').join(process.cwd(), 'dist'));
		}

		await ctx.dispose();
	}
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});
