import * as path from 'path'
import * as vscode from 'vscode'

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient/node'

export default function createLanguageClient ({ context, outputChannel }) {
  // The server is implemented in node
  const serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'))
  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] }

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions
    }
  }

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for flix documents
    documentSelector: [{ scheme: 'file', language: 'flix' }],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
    },
    outputChannel
  }
  
  // Create the language client and start the client.
  return new LanguageClient(
    'flixLanguageServer',
    'Flix Language Server',
    serverOptions,
    clientOptions
  )
}
