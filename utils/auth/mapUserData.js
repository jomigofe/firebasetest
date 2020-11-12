export const mapUserData = async (user) => {
  const { uid, email, displayName } = user
  const token = await user.getIdToken(true)
  return {
    id: uid,
    email,
    token,
    displayName,
  }
}
