const remote = require('@electron/remote')
const {getCurrentWindow, globalShortcut} = remote
// Function to reload
const reload = () => {
    getCurrentWindow().reload()
}

// Function to minimize window
const minimize = () => {
    const electronWindow = remote.BrowserWindow.getFocusedWindow()
    electronWindow.minimize()
}

// Function to maximize window
const maximize = () => {
    const electronWindow = remote.BrowserWindow.getFocusedWindow()
    !electronWindow.isMaximized() ? electronWindow.maximize() : electronWindow.unmaximize()
}

const windowManager = () => {
    // Minimize the screen
    document.querySelector("#minimize").addEventListener("click", minimize)
    // Maximize the screen
    document.querySelector("#maximize").addEventListener("click", maximize)
    // Exit window
    document.querySelector("#exit").addEventListener("click", () => {
        const electronWindow = remote.BrowserWindow.getFocusedWindow()
        electronWindow.close()
    })

    // Refresh the page
    document.querySelector("#refresh").addEventListener("click",reload)
    // Window shortcut
    const Shortcut = e => {
        e.preventDefault()
        // Refresh page shortcut
        if((e.ctrlKey && e.key === "r") || e.key === "F5") reload()
        // Minimze window shortcut
        else if((e.altKey && e.key === "ArrowDown") || e.key === "F10") minimize()
        // Maximize window shortcut
        else if((e.altKey && e.key === "ArrowUp") || e.key === "F11") maximize()
    }

    document.addEventListener("keyup", Shortcut, false)
    // Remove shortcut from the current window to avoid multiple reload on the new window
    window.addEventListener("beforeunload", () => {
        document.removeEventListener("keyup", Shortcut, false)
    })
}

module.exports = windowManager