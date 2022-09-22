import {  ThemeProvider } from '@mui/system'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import '../styles/globals.css'

import { store } from '../REDUX/store'
import { createTheme } from '@mui/material'

function MyApp({ Component, pageProps }) {


const theme = createTheme({
  palette:{
    primary:{
      dark:'#349797',
      main:'#4ba598',
      light:'#b8c5c7',
      contrastText:'#fff'
    }
  }
})

  return (

    <>
      <ThemeProvider theme={theme} >

        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>

      </ThemeProvider>
    </>
  )
}

export default MyApp
