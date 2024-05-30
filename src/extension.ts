// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import constans from "./constans";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let onCreateFilesDisposable = vscode.workspace.onDidCreateFiles(
		(event: vscode.FileCreateEvent) => {
			event.files.forEach((uri) => {
				console.log(uri);
				// eslint-disable-next-line eqeqeq
				if (uri.scheme == "file") {
					//do stuff
					// addSignatureToFile(uri);
					vscode.workspace.fs.stat(uri).then((stats) => {
						if (stats.type === vscode.FileType.File) {
							addSignatureToFile(uri);
							//add signature if it is file.
						}
						/*else if (stats.type === vscode.FileType.Directory) {
							// It's a directory, you might want to handle this case differently
							console.log("A directory was created:", uri);
						}*/
					});
				}
			});
		}
	);

	let commandConfigurationDisposable = vscode.commands.registerCommand(
		"vscode-add-signature.configure",
		() => {
			vscode.commands.executeCommand(
				"workbench.action.openSettings",
				"vscode-add-signature"
			);
		}
	);

	context.subscriptions.push(
		onCreateFilesDisposable,
		commandConfigurationDisposable
	);

	// addSignatureToFile(null);

	// context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

async function addSignatureToFile(uri: vscode.Uri) {
	const config = vscode.workspace.getConfiguration("vscode-add-signature");
	let enableAddSignature = config.get(constans.ENABLE_ADD_SIGNATURE) || false;
	let signatureText = config.get<string>(constans.SIGNATURE_TEXT) || "";

	const fileExtension = uri.fsPath
		.toLowerCase()
		.slice(uri.fsPath.lastIndexOf("."));
	let parsedSignatureText = replacePattern(signatureText);
	// console.log(parsedSignatureText);
	const comment = generateComment(fileExtension, parsedSignatureText);
	if (!comment) {
		//if file extension is not supported dont add anything
		return;
	}
	if (!enableAddSignature) {
		return;
	}
	//adding delay. having issue with new untitle file created and saved
	await delay(constans.DELAY_500);

	try {
		const document = await vscode.workspace.openTextDocument(uri);
		const edit = new vscode.WorkspaceEdit();
		edit.insert(uri, new vscode.Position(0, 0), comment);

		await vscode.workspace.applyEdit(edit);
		await document.save();
	} catch (error) {
		if (error instanceof Error) {
			vscode.window.showErrorMessage(
				"Error adding signature to file: " + error!.message
			);
		} else {
			vscode.window.showErrorMessage(
				"Unknown error occured adding signature to file"
			);
			console.error(error);
		}
	}
}

async function delay(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

function replacePattern(text: string): string {
	const now = new Date();
	const year = now.getFullYear().toString();
	const month = (now.getMonth() + 1).toString().padStart(2, "0");
	const day = now.getDate().toString().padStart(2, "0");
	const hours = now.getHours().toString().padStart(2, "0");
	const minutes = now.getMinutes().toString().padStart(2, "0");

	// Preserve new line
	// text = text.replace(/\\n/g, "\n");

	// Replace each component of the date pattern with the corresponding value
	// Use a regular expression with capturing groups to match any order of date components
	return text.replace(
		/\${(DD|MM|YYYY|hh|mm|YEAR)-?(DD|MM|YYYY|hh|mm|YEAR)?-?(DD|MM|YYYY|hh|mm|YEAR)?-?(DD|MM|YYYY|hh|mm|YEAR)?-?(DD|MM|YYYY|hh|mm|YEAR)?}/g,
		(match, p1, p2, p3, p4, p5) => {
			const components = [p1, p2, p3, p4, p5].filter(Boolean); // Remove undefined components
			const orderedValues = components.map((component) => {
				switch (component) {
					case "DD":
						return day;
					case "MM":
						return month;
					case "YYYY":
						return year;
					case "hh":
						return hours + "h";
					case "mm":
						return minutes + "m";
					case "YEAR":
						return year;
					default:
						return component; // Leave unknown components unchanged
				}
			});
			return orderedValues.join("-"); // Join the ordered values with '-'
		}
	);
}

function generateComment(fileExtension: string, parsedSignatureText: string) {
	console.log({ fileExtension, parsedSignatureText });

	// Define a mapping of file extensions to their respective comment block formats
	//supported files.
	const commentFormats: { [key: string]: string } = {
		".js": "/**\n",
		".ts": "/**\n",
		".html": "<!--\n",
		".css": "/*\n",
		".rb": "=begin\n",
		".rs": "/*\n",
		".java": "/*\n",
		".kt": "/*\n",
		".kts": "/*\n",
		".php": "/*\n",
		".c": "/*\n",
		".py": '"""\n',
		// Add more file extensions and their corresponding comment block formats as needed
	};

	// Get the comment block format for the given file extension
	const commentFormat = commentFormats[fileExtension.toLowerCase()];

	if (!commentFormat) {
		return;
	}

	// Split the parsed signature text into an array of lines
	let commentLines = parsedSignatureText.split("\n");

	// Remove the first empty string if present
	if (commentLines[0] === "") {
		commentLines.shift();
	}

	let commentBlock = "";

	// Generate the comment block using the comment format and parsed signature text
	commentBlock = `${commentFormat}`;
	commentLines.forEach((line) => {
		commentBlock += ` ${line}\n`;
	});

	commentBlock += `${
		commentFormat.startsWith("<!--")
			? "-->"
			: commentFormat.startsWith("=begin")
			? "=end"
			: "*/"
	}\n\n`;

	console.log(commentBlock);
	return commentBlock;
}
