export default (mainActionGenerator, args) => {
  // prevents the action from blocking the main thread
  return (dispatch) => {
    setTimeout(() => {
      dispatch(mainActionGenerator(args))
    }, 0)
  }
}
