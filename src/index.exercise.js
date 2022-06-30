// 🐨 you'll need to import react and createRoot from react-dom up here
import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {Logo} from './components/logo'
import {Dialog} from '@reach/dialog'

import '@reach/dialog/styles.css'

const LoginForm = ({onSubmit, buttonText}) => {
  const [formData, setFormData] = React.useState({username: '', password: ''})

  const handleOnChange = event => {
    event.preventDefault()

    setFormData(formData => {
      return {...formData, [event.target.id]: event.target.value}
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={formData.username}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  )
}

const App = () => {
  const [openModal, setOpenModal] = React.useState('none')
  const close = () => setOpenModal('none')
  const handleLogin = formData => {
    console.log('login', formData)
  }
  const handleRegister = formData => {
    console.log('register', formData)
  }

  return (
    <div>
      <Logo width="100" height="100" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>

      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog
        aria-label="Login form"
        isOpen={openModal === 'login'}
        onDismiss={close}
      >
        <div>
          <button onClick={close}>Close</button>
        </div>
        <p>Login</p>

        <LoginForm onSubmit={handleLogin} buttonText="Login" />
      </Dialog>
      <Dialog
        aria-label="Registration form"
        isOpen={openModal === 'register'}
        onDismiss={close}
      >
        <button onClick={close}>Close</button>
        <p>Register</p>

        <LoginForm onSubmit={handleRegister} buttonText="Register" />
      </Dialog>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}
