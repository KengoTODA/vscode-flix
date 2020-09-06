import { start } from '../engine'

interface ReadyParams {
	extensionPath: string
}

/**
 * Runs when both client and server are ready.
 * 
 * TODO: init the flix engine
 * 
 * @param {String} obj.extensionPath - Install path of this extension.
 */
export function handleReady ({ extensionPath }: ReadyParams) {
	console.log('[handleReady]', extensionPath)
	start()
	console.log('[handleReady] Engine Started?')
}

export function handleExit () {
	console.log('[handleExit]')
}
