# vscode-add-signature Extension

## Description
The vscode-add-signature extension automatically adds a preloaded signature to the top of each file whenever it is created. Users can configure the signature text through the extension settings.

## Activation
The extension is activated when Visual Studio Code starts. It listens for the creation of new files and triggers the addition of the signature text.

## Configuration
Users can configure the extension through the following settings:

- **Enable Add Signature**: Toggle to enable/disable adding the signature text to new files.
- **Signature Text**: The text to be added at the top of each new file.

To configure the extension, use the command `vscode-add-signature.configure`, which opens the settings UI.

## Known Issues
- Untitled notes saving causes issues. If a file is saved and then shown as unsaved without modification, closing the file may result in the loss of changes.

## File Handling
The extension handles the following file-related operations:

- **onDidCreateFiles**: Listens for the creation of new files and adds the signature text to them.
- **addSignatureToFile**: Adds the configured signature text to the top of each new file.

## Deactivation
The extension's `deactivate` function is called when the extension is deactivated. However, since the extension primarily operates based on events triggered by file creation, there is no specific deactivation logic implemented.

## Author
- **Name**: Saquib Shaikh
- **Email**: mdsqb0786@gmail.com
