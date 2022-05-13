// Render and control web pages.
//
// For more info, see:
// https://electronjs.org/docs/api/web-contents

const {session, app, BrowserWindow, webContents} = require('electron')
const nativeImage = require('electron')
                        .nativeImage

                    delete process.env.ELECTRON_ENABLE_SECURITY_WARNINGS
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true



app.whenReady().then(() => {
  
  const mainWindow = new BrowserWindow({ 
    height: 1400, 
    width: 1200,
    center: true,
    icon: '/Users/yvann/OneDrive/Images/logo.png',
    webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }})


  mainWindow.loadFile('views/index.html')
  mainWindow.webContents.openDevTools()
  // This setTimeout is to demonstrate the method firing
  // for the demo, and is not needed in production.
  /* COOKIES DEMO 
  session.defaultSession.cookies.set ({ 
  name :"hello",
  value : "bah",
  url : "http://localhost/"
})
*/
}
)
