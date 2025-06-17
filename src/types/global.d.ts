// Allow importing JSON files as modules in TypeScript
// This fixes: Cannot find module '*.json' or its corresponding type declarations.
declare module '*.json' {
	const value: any;
	export default value;
}
