const url = 'https://appblocks.dev.local';

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = ({ username, password }) => {
  if (username !== `` && password !== ``) {

    const authUrl = url + `/api/account/authenticate?username=${username}&password=${password}`
    console.log(`authUrl:${authUrl}`);

    try {
      const userInfo = fetch(authUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        //body:JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
      });
      console.log(`userInfo:${userInfo}`);
      //console.log(`completed:${fields.firstName}`);
      //this.setState({status: `Thanks ${state.firstName}. Sending your message... completed`});

      return setUser({
        username: `john`,
        name: `Johnny`,
        email: `johnny@example.org`,
      })

    } catch (error) {
      console.log(`error sending:${error}`);
      //this.setState({status: `Thanks ${state.firstName}. Sending your message... Error:${error}`});
    }
  }

  return false
}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}