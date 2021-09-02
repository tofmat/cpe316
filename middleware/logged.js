export default function({$auth, redirect, store}) {
    if (localStorage.token) {
      
    } else {
      redirect('/')
    }
  } 