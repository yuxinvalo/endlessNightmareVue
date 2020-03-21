const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  email: state => state.user.email,
  age: state => state.user.age,
  sex: state => state.user.sex,
  dream: state => state.user.dream,
  person16: state => state.user.person16 
}
export default getters
