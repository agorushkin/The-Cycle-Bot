export const AuthPage = (success: boolean) => {
  return (
    <>
      <head>
        <title>Authentication</title>

        <link rel='stylesheet' href='/public/auth.css' />
      </head>
      <body>
        <div id='container'>
          <h1>{ success ? 'Authentication successful!' : 'Authentication failed.' }</h1>
          <h2>{ success ? 'You may now close this window.' : 'Try again in a few minutes.' }</h2>
        </div>
      </body>
    </>
  )
}