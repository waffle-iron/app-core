let breadcrumbName = (user) => {
  return user.profile ? user.profile.firstName : user.username || 'usuario'
}

export {
  breadcrumbName
}
