# Vscode Add Signature Extension

## Description

The Vscode Add Signature extension automatically adds a preloaded signature to the top of each file whenever it is created. Users can configure the signature text through the extension settings.

## Activation

The extension is activated when Visual Studio Code starts. It listens for the creation of new files and triggers the addition of the signature text.

## Configuration

-   Open vscode **Command Pallet** by pressing cmd + shift + p in mac or cntrl + shift + p in window.
-   Search `VscodeAddSignature: Configure` and open extension setting.

Configure the extension through the following settings:

-   **Enable Add Signature**: Toggle to enable/disable adding the signature text to new files.
-   **Signature Text**: Enter the signature text to be added at the top of each new file. For new line in comment use ```Enter```.

**Note:** To use new line without ```*``` press ```Enter``` and start typing. See **Example 2**

### Supported file types
```.js``` ```.ts``` ```.rb``` ```.rs``` ```.php``` ```.java``` ```.kt``` ```.kts``` ```.c``` ```.html``` ```.css```

### Signature Text Example

Here's an example of how to format the signature text:

#### Example with *

**Input**
```javaScript
 * author Saquib Shaikh
 * created on 02-05-2024-17h-48m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
```

**File output**

***javascript & typescript***
```javaScript
/**
* author Saquib Shaikh
* created on 16-03-2024-10-30
* github: https://github.com/saquibshaikh14
* copyright 2024
**/
```
***html***
```html
<!--
 * author Saquib Shaikh
 * created on 02-05-2024-17h-50m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
-->
```

#### Example without \*
**Input**
```javaScript
 author Saquib Shaikh
 created on 02-05-2024-17h-48m
 github: https://github.com/saquibshaikh14
 copyright 2024
```
***javascript & typescript***
```javaScript
/**
 author Saquib Shaikh
 created on 16-03-2024-10-30
 github: https://github.com/saquibshaikh14
 copyright 2024
**/
```
***html***
```html
<!--
 author Saquib Shaikh
 created on 02-05-2024-17h-50m
 github: https://github.com/saquibshaikh14
 copyright 2024
-->
```

## Contributing and Bug Reporting

To contribute to the development of this extension or report any issues, visit the [GitHub repository](https://github.com/saquibshaikh14/vscode-add-signature-extensoin.git). Feel free to raise issues, submit pull requests, or contribute in any way you see fit.


## File Handling

The extension handles the following file-related operations:

-   **onDidCreateFiles**: Listens for the creation of new files and adds the signature text to them.
-   **addSignatureToFile**: Adds the configured signature text to the top of each new file.

## Deactivation

The extension's deactivate function is called when the extension is deactivated. However, since the extension primarily operates based on events triggered by file creation, there is no specific deactivation logic implemented.

## Author

-   **Name**: Saquib Shaikh
-   **Email**: mdsqb0786@gmail.com

Feel free to modify or enhance this extension as needed. Your contributions are welcome!
