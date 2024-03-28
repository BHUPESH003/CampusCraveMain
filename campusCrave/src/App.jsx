// import 'bootstrap/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import { StrictMode } from 'react'
import { Provider as JotaiProvider } from 'jotai';
import RenderSplash from './pages/SplashPage/RenderSplash';
import AppLayout from './pages/shared/AppLayout'
const App=()=> {
  return (
    <>
      <StrictMode>
        <JotaiProvider>
        {/* <RenderSplash/> */}
          <AppLayout />
        </JotaiProvider>
      </StrictMode>
    </>
  )
}

export default App