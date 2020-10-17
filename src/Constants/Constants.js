import User from '../assets/user.svg'

export const Nav = [
  

  
  
  {
    label: "CHATS",
    icon: "chat",
    hidden: true,
    class: "nav-item",
    ref: "/chat",
  },
  {
    label: "LOGOUT",
    icon: "logout",
    hidden: true,
    class: "nav-item",
    ref: "/logout",
  },
  {
    label: "user",
    user : User,
    width: '11px',
    height: '11px',

  }
];
